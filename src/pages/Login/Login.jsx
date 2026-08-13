import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldHalf, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    try {
      // Prototype accepts any email/password combination — see authService.
      await login({ email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setFormError(err.message);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <ShieldHalf size={22} className={styles.brandIcon} aria-hidden="true" />
          <span className={styles.brandName}>VANGUARD INTELLIGENCE</span>
        </div>

        <h1 className={styles.heading}>Sign in</h1>
        <p className={styles.subheading}>Access your monitoring workspace.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {formError && <div className={styles.errorBanner}>{formError}</div>}

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="email">
              Email
            </label>
            <div className={styles.inputWrap}>
              <Mail size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className={styles.input}
                placeholder="you@agency.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <Lock size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.visibilityToggle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={15} className={styles.spin} aria-hidden="true" />
                Authenticating…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className={styles.footerNote}>
          Don't have a workspace? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
