import { useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DeleteDialog({ onReset }: { onReset: () => void }) {
const { t } = useLanguage();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onReset();
    setKey("");
    setError("");
    setOpen(false); // close dialog only when correct
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {t("profile.reset")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel  onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleReset}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
