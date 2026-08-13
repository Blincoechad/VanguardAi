import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldHalf, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "../Login/Login.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords don't match.");
      return;
    }

    try {
      // Prototype accepts any details and drops the person straight into
      // the dashboard — see authService for where a real signup call goes.
      await signUp({ name, email, password });
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

        <h1 className={styles.heading}>Create your workspace</h1>
        <p className={styles.subheading}>Set up access to the monitoring platform.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {formError && <div className={styles.errorBanner}>{formError}</div>}

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="name">
              Full name
            </label>
            <div className={styles.inputWrap}>
              <User size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                className={styles.input}
                placeholder="Jordan Reyes"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="signup-email">
              Email
            </label>
            <div className={styles.inputWrap}>
              <Mail size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="signup-email"
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
            <label className={styles.fieldLabel} htmlFor="signup-password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <Lock size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
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

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="confirm-password">
              Confirm password
            </label>
            <div className={styles.inputWrap}>
              <Lock size={15} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                className={styles.input}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={15} className={styles.spin} aria-hidden="true" />
                Creating workspace…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className={styles.footerNote}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
