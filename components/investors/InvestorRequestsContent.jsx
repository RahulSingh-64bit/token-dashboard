import { Inbox } from "lucide-react";

export default function InvestorRequestsContent() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Requests</h1>
        <p className="text-muted-foreground max-w-md">
          This page will display incoming requests and pending actions requiring attention.
        </p>
      </div>
    </div>
  );
}
