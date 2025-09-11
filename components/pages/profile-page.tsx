"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useAuth from "@/lib/auth";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type ProfileData = {
  name: string;
  email: string;
  avatar_url: string | null;
  bio: string;
};

type Passwords = {
  current: string;
  new: string;
  confirm: string;
};

export default function ProfilePage() {
  const supabase = createClientComponentClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    avatar_url: null,
    bio: "",
  });

  const [passwords, setPasswords] = useState<Passwords>({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!res.ok) throw new Error("Gagal mengambil profil");
        const data = await res.json();

        console.log(data)
        if (data.data) {
          setProfile({
            name: data.data.name || "",
            email: data.data.email || "",
            avatar_url: data.data.avatar_url || null,
            bio: data.data.bio || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSaveProfile = async () => {
    if (!userId) return;
    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({ name: profile.name })
        .eq("id", userId);

      if (error) throw error;
      toast.success("Profil berhasil diperbarui");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan profil");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Semua kolom password harus diisi");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("Password baru dan konfirmasi tidak sama");
      return;
    }

    setChangingPassword(true);
    try {
      // Validasi current password
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: passwords.current,
      });

      if (loginError) {
        toast.error("Password saat ini salah");
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: passwords.new });
      if (error) throw error;

      toast.success("Password berhasil diperbarui");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err: any) {
      toast.error("Gagal mengubah password: " + err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatar/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatar").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatar").getPublicUrl(filePath);

      setProfile((prev) => ({ ...prev, avatar_url: data.publicUrl }));

      await supabase.from("users").update({ avatar_url: data.publicUrl }).eq("id", userId);

      toast.success("Foto profil berhasil diunggah");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Gagal mengunggah avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!profile.avatar_url || !userId) return;
    setUploading(true);
    try {
      const path = profile.avatar_url.split("/storage/v1/object/public/avatar/")[1];
      if (path) await supabase.storage.from("avatar").remove([path]);
      await supabase.from("users").update({ avatar_url: null }).eq("id", userId);
      setProfile((prev) => ({ ...prev, avatar_url: null }));
      toast.success("Foto profil berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus foto profil");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-background min-h-screen">
      {/* Avatar & Info */}
      <div className="w-full md:w-1/3">
        <Card className="p-6 border border-gray-200 shadow-md">
          <CardHeader className="flex flex-col items-center text-center space-y-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-lg">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.name || "User Avatar"} />
                ) : (
                  <AvatarImage src="https://www.svgrepo.com/show/512317/avatar-profile.svg" alt="Placeholder Avatar" className="bg-gray-200" />
                )}
              </Avatar>
              <div className="absolute inset-0 bg-black/40 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
                Ubah Foto
              </div>
              {profile.avatar_url && (
                <span
                  className="absolute top-0 right-0 m-1 cursor-pointer opacity-0 group-hover:opacity-100 transition bg-white/80 border border-red-300 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAvatar();
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </span>
              )}
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            <CardTitle className="text-lg sm:text-xl font-semibold break-words">{profile.name}</CardTitle>
            <CardDescription className="text-gray-500 break-all text-sm sm:text-base">{profile.email}</CardDescription>
            {uploading && <p className="text-xs text-gray-500 animate-pulse">Mengunggah...</p>}
          </CardHeader>
        </Card>
      </div>

      {/* Edit Profile & Password */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Edit Profile */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Perbarui informasi pribadi Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} disabled />
            </div>
            <Button
              onClick={handleSaveProfile}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white transition-colors"
              disabled={savingProfile}
            >
              {savingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Amankan akun Anda dengan mengganti password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
            </div>
            <Button
              onClick={handleChangePassword}
              className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors"
              disabled={changingPassword}
            >
              {changingPassword ? "Updating..." : "Update Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
