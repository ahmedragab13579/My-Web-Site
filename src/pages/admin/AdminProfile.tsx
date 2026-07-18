import { useState, type JSX } from "react";
import { useAdminProfile } from "../../BackEndIntegration/Hooks/Queries/useAuthQueries";
import { useChangePassword } from "../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { User, Mail, ShieldAlert, KeyRound, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminProfile(): JSX.Element {
  const { data: profile, isLoading, error } = useAdminProfile();


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordMutation = useChangePassword();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    changePasswordMutation.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success("Password changed successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (err: any) => {
          const errMsg = err?.response?.data?.error || "Failed to change password. Please verify current password.";
          toast.error(errMsg);
        },
      }
    );
  };


if (isLoading) {
  return (
    <div className="flex h-40 items-center justify-center text-brand-teal">
      <Loader2 className="animate-spin mr-2" size={24} />
      <span>Loading profile info...</span>
    </div>
  );
}

// تعديل الشرط: اعرض الخطأ فقط لو مفيش بيانات أصلاً
if (error && !profile) {
  return (
    <div className="text-center py-10 bg-red-950/15 border border-red-900/30 rounded-xl">
      <p className="text-red-400 font-semibold">Failed to load administrator profile.</p>
    </div>
  );
}

  return (
    <div className="max-w-3xl space-y-12 ">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-brand-cream mb-2">Profile Settings</h1>
        <p className="text-brand-cream/60">Manage account information and security credentials.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Card */}
        <div className="border border-brand-teal/20 bg-brand-blue/10 rounded-2xl p-8 space-y-6">
          <h3 className="text-lg font-bold text-brand-teal border-b border-brand-teal/15 pb-2">
            Administrator Details
          </h3>
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--bg-main)]/50 rounded-lg border border-brand-teal/10 text-brand-teal">
                <User size={18} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/50">Full Name</p>
                <p className="text-sm font-semibold text-brand-cream">{profile?.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--bg-main)]/50 rounded-lg border border-brand-teal/10 text-brand-teal">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/50">Email Address</p>
                <p className="text-sm font-semibold text-brand-cream">{profile?.email}</p>
              </div>
            </div>

            {/* Last Login */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--bg-main)]/50 rounded-lg border border-brand-teal/10 text-brand-teal">
                <ShieldAlert size={18} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/50">Last Login Timestamp</p>
                <p className="text-sm font-semibold text-brand-cream">
                  {profile?.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString() : "Never"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="border border-brand-teal/20 bg-brand-blue/10 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-brand-teal border-b border-brand-teal/15 pb-2 mb-6">
            Rotate Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-brand-cream/70 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream text-sm focus:border-brand-teal focus:outline-none"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-brand-cream/70 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream text-sm focus:border-brand-teal focus:outline-none"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-brand-cream/70 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream text-sm focus:border-brand-teal focus:outline-none"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-brand-teal/10 flex justify-end">
              <button
                type="submit"
                disabled={changePasswordMutation.isPending}
                className="btn-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <KeyRound size={14} />
                {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
