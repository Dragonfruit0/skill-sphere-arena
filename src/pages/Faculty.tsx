import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const Faculty = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        </div>
        
        <Card className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
            <p>Faculty dashboard coming soon...</p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Faculty;
