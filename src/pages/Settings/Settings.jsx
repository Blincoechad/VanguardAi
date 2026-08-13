import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import {
  getUserSettings,
  updateUserSettings,
} from "../../services/apiService.js";
import styles from "./Settings.module.css";

function Toggle({ checked, onChange, label }) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span className={styles.toggleTrack} aria-hidden="true" />
    </label>
  );
}

export default function Settings() {
  const { theme, setTheme } = useOutletContext();
  const [settings, setSettings] = useState(null);
  const [savedNote, setSavedNote] = useState(false);

  useEffect(() => {
    getUserSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (!settings) return;

    setSettings((current) => {
      if (!current || current.appearance.theme === theme) {
        return current;
      }

      return {
        ...current,
        appearance: { ...current.appearance, theme },
      };
    });
  }, [theme, settings]);

  if (!settings) return <LoadingState label="Loading settings…" />;

  function update(section, key, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));

    if (section === "appearance" && key === "theme") {
      setTheme(value);
    }

    setSavedNote(false);
  }

  async function handleSave() {
    await updateUserSettings(settings);
    setSavedNote(true);
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Preferences for your account, alerts, and monitoring behavior."
      />

      <div className={styles.sections}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>Profile</div>
          <div className={styles.sectionDescription}>
            Your identity within the workspace.
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            <input
              className={styles.textInput}
              value={settings.profile.name}
              onChange={(e) => update("profile", "name", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input
              className={styles.textInput}
              type="email"
              value={settings.profile.email}
              onChange={(e) => update("profile", "email", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Role</span>
            <input
              className={styles.textInput}
              value={settings.profile.role}
              onChange={(e) => update("profile", "role", e.target.value)}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Notifications</div>
          <div className={styles.sectionDescription}>
            How you're notified about new activity.
          </div>

          <div className={styles.field}>
            <div>
              <div className={styles.fieldLabel}>Email alerts</div>
              <div className={styles.fieldHint}>
                Send an email when a new alert is generated.
              </div>
            </div>
            <Toggle
              checked={settings.notifications.emailAlerts}
              onChange={(v) => update("notifications", "emailAlerts", v)}
              label="Email alerts"
            />
          </div>
          <div className={styles.field}>
            <div>
              <div className={styles.fieldLabel}>Critical alerts only</div>
              <div className={styles.fieldHint}>
                Limit notifications to critical severity.
              </div>
            </div>
            <Toggle
              checked={settings.notifications.criticalAlertsOnly}
              onChange={(v) => update("notifications", "criticalAlertsOnly", v)}
              label="Critical alerts only"
            />
          </div>
          <div className={styles.field}>
            <div>
              <div className={styles.fieldLabel}>Daily summary</div>
              <div className={styles.fieldHint}>
                Receive a daily digest of intelligence activity.
              </div>
            </div>
            <Toggle
              checked={settings.notifications.dailySummary}
              onChange={(v) => update("notifications", "dailySummary", v)}
              label="Daily summary"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Monitoring</div>
          <div className={styles.sectionDescription}>
            Controls for how aggressively the system watches and flags.
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Polling frequency</span>
            <select
              className={styles.selectInput}
              value={settings.monitoring.pollingFrequencyMinutes}
              onChange={(e) =>
                update(
                  "monitoring",
                  "pollingFrequencyMinutes",
                  Number(e.target.value),
                )
              }
            >
              <option value={1}>Every 1 minute</option>
              <option value={5}>Every 5 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={60}>Every hour</option>
            </select>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Minimum confidence threshold
            </span>
            <select
              className={styles.selectInput}
              value={settings.monitoring.minConfidenceThreshold}
              onChange={(e) =>
                update(
                  "monitoring",
                  "minConfidenceThreshold",
                  Number(e.target.value),
                )
              }
            >
              <option value={0.4}>40%</option>
              <option value={0.6}>60%</option>
              <option value={0.75}>75%</option>
              <option value={0.9}>90%</option>
            </select>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Alert sensitivity</span>
            <select
              className={styles.selectInput}
              value={settings.monitoring.alertSensitivity}
              onChange={(e) =>
                update("monitoring", "alertSensitivity", e.target.value)
              }
            >
              <option value="low">Low</option>
              <option value="balanced">Balanced</option>
              <option value="high">High</option>
            </select>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Appearance</div>
          <div className={styles.sectionDescription}>
            Interface preferences for this workspace.
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Theme</span>
            <select
              className={styles.selectInput}
              value={settings.appearance.theme}
              onChange={(e) => update("appearance", "theme", e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Density</span>
            <select
              className={styles.selectInput}
              value={settings.appearance.density}
              onChange={(e) => update("appearance", "density", e.target.value)}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </section>

        <div className={styles.saveRow}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save changes
          </button>
          {savedNote && <span className={styles.savedNote}>Saved</span>}
        </div>
      </div>
    </div>
  );
}
