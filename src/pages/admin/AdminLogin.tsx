import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { useAuth } from "../../context/AuthContext";
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminLogin(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data?.accessToken) {
            login(data.accessToken);
          }
          toast.success("Welcome back! Redirecting to dashboard...");
          navigate("/admin/dashboard", { replace: true });
        },
        onError: (err: any) => {
          const errMsg = err?.response?.data?.error || "Invalid credentials. Please try again.";
          toast.error(errMsg);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center px-4 transition-colors duration-300">
      {/* Absolute floating background accents */}
      <div className="bg-brand-teal/5 absolute top-10 left-10 h-72 w-72 rounded-full blur-3xl"></div>
      <div className="bg-brand-purple/5 absolute bottom-10 right-10 h-72 w-72 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to Home anchor */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-cream/60 hover:text-brand-teal mb-8 font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio Site
        </a>

        {/* Login Card */}
        <div className="border border-brand-teal/20 bg-brand-blue/20 backdrop-blur-md rounded-2xl p-8 shadow-brand">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">CMS Administrator</h1>
            <p className="text-brand-cream/60 text-sm">Enter credentials to access the console</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="text-brand-cream/80 block text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-brand-cream/40" size={18} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@portfolio.com"
                  className="w-full border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream placeholder-brand-cream/30 rounded-lg border pl-10 pr-4 py-3 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="text-brand-cream/80 block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-brand-cream/40" size={18} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream placeholder-brand-cream/30 rounded-lg border pl-10 pr-4 py-3 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {loginMutation.isError && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg p-3 text-sm">
                <AlertCircle size={16} />
                <span>Invalid username or password.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="bg-brand-teal text-brand-dark hover:bg-brand-cream disabled:opacity-50 disabled:cursor-not-allowed flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-bold transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,173,181,0.2)]"
            >
              {loginMutation.isPending ? "Authenticating..." : "Login to Control Panel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
