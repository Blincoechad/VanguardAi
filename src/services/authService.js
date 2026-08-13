// Auth service — this is the one file that should need to change when we
// wire up a real backend (REST/JWT/OAuth/Supabase/whatever we land on).
// Every component talks to this module, never to a specific auth provider,
// so swapping the implementation later shouldn't touch any page or component.

const SESSION_KEY = "vanguard_session";

// Fake network delay so loading states in the UI actually get exercised.
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulated login — for the prototype we accept any email/password
 * combination. Swap the body of this function for a real API call when
 * there's a backend to hit; the return shape is what the rest of the app
 * should keep expecting.
 */
export async function login({ email, password }) {
  await delay();

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = {
    id: "usr-001",
    name: email.split("@")[0].replace(/[._]/g, " "),
    email,
    role: "Analyst",
  };

  const session = { user, token: "mock-token", issuedAt: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Simulated sign up — also accepts anything, then drops the person
 * straight into the dashboard like login does.
 */
export async function signUp({ name, email, password }) {
  await delay();

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  const user = { id: "usr-001", name, email, role: "Analyst" };
  const session = { user, token: "mock-token", issuedAt: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function logout() {
  await delay(150);
  sessionStorage.removeItem(SESSION_KEY);
}

/** Reads whatever session is currently stored, if any. */
export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getSession());
}
