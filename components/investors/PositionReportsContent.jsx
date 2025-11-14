import { BarChart3 } from "lucide-react";

export default function PositionReportsContent() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Position Reports</h1>
        <p className="text-muted-foreground max-w-md">
          This page will display detailed position reports and analytics for all investors.
        </p>
      </div>
    </div>
  );
}
