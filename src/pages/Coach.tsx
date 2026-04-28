import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, BotMessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useCompletedDrills } from "@/hooks/useCompletedDrills";
import { trainingLevels } from "@/data/trainingData";
import { useProfile } from "@/hooks/useProfile";
import { useLanguage } from "@/contexts/LanguageContext";

type Msg = { role: "user" | "assistant"; content: string };

const Coach = () => {
  const { t, lang } = useLanguage();
  const { completed } = useCompletedDrills();
  const { profile } = useProfile();

  const SUGGESTIONS = [
    t("coach.suggestion.workout"),
    t("coach.suggestion.arc"),
    t("coach.suggestion.next"),
    t("coach.suggestion.pressure"),
  ];

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const buildContext = () => {
    const totalDone = completed.size;
    const levelIdx = trainingLevels.findIndex(
      (lvl) => !lvl.drills.every((d) => completed.has(d.id)),
    );
    const currentLevel =
      levelIdx >= 0
        ? trainingLevels[levelIdx]
        : trainingLevels[trainingLevels.length - 1];
    const name = profile?.display_name || "the player";
    const langLine = lang === "fr" ? "Reply in French." : "Reply in English.";
    return `${langLine}\nPlayer name: ${name}\nDrills completed: ${totalDone}\nCurrent level: ${currentLevel.title} — ${currentLevel.description}`;
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-coach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: next, context: buildContext() }),
        },
      );

      if (!resp.ok || !resp.body) {
        if (resp.status === 429)
          toast({
            title: "Slow down",
            description: "Rate limit reached, try again shortly.",
            variant: "destructive",
          });
        else if (resp.status === 402)
          toast({
            title: "Out of AI credits",
            description: "Add credits to keep coaching.",
            variant: "destructive",
          });
        else
          toast({
            title: "Coach unavailable",
            description: "Try again in a moment.",
            variant: "destructive",
          });
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistantText = "";
      let started = false;
      let done = false;

      const append = (chunk: string) => {
        assistantText += chunk;
        setMessages((prev) => {
          if (!started) {
            started = true;
            return [...prev, { role: "assistant", content: assistantText }];
          }
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantText } : m,
          );
        });
      };

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buf += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) append(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Network error",
        description: "Check connection and retry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <header className="px-4 pt-6 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-fire flex items-center justify-center shadow-glow">
            <BotMessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight">
              {t("coach.title")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("coach.subtitle")}
            </p>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.length <= 4 && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-4 shadow-card">
              <p className="text-sm">{t("coach.greeting")}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-card-foreground shadow-card rounded-bl-md"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-headings:my-2">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border p-3 flex gap-2 bg-background"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask coach anything..."
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Coach;
