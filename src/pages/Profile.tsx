import { useRef, useState } from "react";
import { trainingLevels } from "@/data/trainingData";
import {
  User,
  Award,
  Calendar,
  RotateCcw,
  LogOut,
  Camera,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCompletedDrills } from "@/hooks/useCompletedDrills";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ResetDialog from "@/components/ResetDialog";

const Profile = () => {
  const { completed: completedDrills, reset } = useCompletedDrills();
  const { user, signOut } = useAuth();
  const { profile, update } = useProfile();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  const totalDrills = trainingLevels.reduce(
    (sum, lvl) => sum + lvl.drills.length,
    0,
  );
  const totalCompleted = trainingLevels.reduce(
    (sum, lvl) =>
      sum + lvl.drills.filter((d) => completedDrills.has(d.id)).length,
    0,
  );

  const currentLevelIndex = trainingLevels.findIndex(
    (lvl) => !lvl.drills.every((d) => completedDrills.has(d.id)),
  );
  const currentLevel =
    currentLevelIndex >= 0
      ? trainingLevels[currentLevelIndex]
      : trainingLevels[trainingLevels.length - 1];

  const rank =
    totalCompleted === totalDrills
      ? "🏆 Pro Elite"
      : totalCompleted >= 30
        ? "⭐ Advanced"
        : totalCompleted >= 20
          ? "⚡ Intermediate"
          : totalCompleted >= 10
            ? "🎯 Beginner+"
            : "🏀 Rookie";

  const displayName =
    profile?.display_name?.trim() || "Trainee";

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  const handleAvatarPick = () => fileRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Max 5MB",
        variant: "destructive",
      });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);
      const err = await update({ avatar_url: publicUrl });
      if (err) throw err;
      toast({ title: "Avatar updated" });
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message ?? "Try again",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const startEditName = () => {
    setNameDraft(profile?.display_name ?? "");
    setEditingName(true);
  };

  const saveName = async () => {
    const trimmed = nameDraft.trim();
    if (trimmed.length < 2 || trimmed.length > 40) {
      toast({
        title: "Invalid pseudo",
        description: "2 to 40 characters",
        variant: "destructive",
      });
      return;
    }
    const err = await update({ display_name: trimmed });
    if (err) {
      toast({
        title: "Update failed",
        description: err.message,
        variant: "destructive",
      });
      return;
    }
    setEditingName(false);
    toast({ title: "Pseudo updated" });
  };

  return (
    <div className="w-full h-full px-4 py-6 pt-28">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3">
          <Avatar className="h-20 w-20 shadow-glow">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={displayName} />
            ) : null}
            <AvatarFallback className="bg-gradient-fire">
              <User className="h-10 w-10 text-primary-foreground" />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={handleAvatarPick}
            disabled={uploading}
            className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            aria-label="Change avatar"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {editingName ? (
          <div className="flex items-center gap-2 w-full max-w-xs">
            <Input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              maxLength={40}
              autoFocus
            />
            <Button size="icon" onClick={saveName}>
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setEditingName(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <button
            onClick={startEditName}
            className="text-xl font-bold hover:text-primary transition-colors capitalize"
          >
            {displayName}
          </button>
        )}
        <div className="text-xs text-muted-foreground mt-1">{user?.email}</div>
        <div className="text-sm text-muted-foreground mt-1">{rank}</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <Award className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold">{totalCompleted}</div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Drills Done
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold">{trainingLevels.length}</div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Levels
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <div className="text-primary text-lg mb-1">🔥</div>
          <div className="text-lg font-bold">
            {Math.round((totalCompleted / totalDrills) * 100)}%
          </div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Complete
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 shadow-card mb-6">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Current Level
        </div>
        <div className="text-lg font-bold text-gradient-fire">
          {currentLevel.title}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {currentLevel.description}
        </p>
      </div>

      <div className="space-y-3">
        <ResetDialog onReset={reset} />
        <Button variant="secondary" className="w-full" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
