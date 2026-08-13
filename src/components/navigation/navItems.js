import {
  LayoutDashboard,
  Radar,
  Database,
  GitBranch,
  Bell,
  Activity,
  Settings,
  MoreHorizontal,
} from "lucide-react";

// Both the desktop sidebar and the mobile bottom nav read from this list so
// the two never drift out of sync with each other.
export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/intelligence", label: "Intelligence", icon: Radar },
  { to: "/sources", label: "Sources", icon: Database },
  { to: "/correlations", label: "Correlations", icon: GitBranch },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/system", label: "System", icon: Activity },
  { to: "/settings", label: "Settings", icon: Settings },
];

// Mobile only has room for five icons, so the bottom nav uses a trimmed
// subset — the same pattern shown in the reference screenshots.
export const mobileNavItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/correlations", label: "Correl.", icon: GitBranch },
  { to: "/intelligence", label: "Articles", icon: Radar },
  { to: "/sources", label: "Sources", icon: Database },
  { to: "/more", label: "More", icon: MoreHorizontal },
];

export const mobileMoreItems = [
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/system", label: "System Status", icon: Activity },
  { to: "/settings", label: "Settings", icon: Settings },
];
