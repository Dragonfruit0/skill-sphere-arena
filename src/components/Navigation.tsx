import { NavLink } from "@/components/NavLink";
import { Home, Trophy, User, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/faculty", icon: Users, label: "Faculty" },
    { to: "/admin", icon: Shield, label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Skill Sphere
            </h1>
            <p className="text-xs text-muted-foreground">Level Up Your Skills</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted"
              activeClassName="text-primary bg-primary/10 hover:bg-primary/15"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
          Sign Out
        </Button>
      </div>
    </header>
  );
};
