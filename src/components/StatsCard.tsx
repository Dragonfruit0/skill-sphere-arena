import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
}

export const StatsCard = ({ icon: Icon, label, value, trend, variant = "default" }: StatsCardProps) => {
  const variantStyles = {
    default: "bg-gradient-to-br from-card to-muted/30 border-border",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
    success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20",
  };

  const iconStyles = {
    default: "text-primary",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
  };

  return (
    <Card className={`p-6 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-up ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? "text-success" : "text-destructive"}`}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-background/50 ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
