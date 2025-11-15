import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export const TokenOwnershipView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Token ownership</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Token ownership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 ">
            <Label >Owner wallet address</Label>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <code className="text-sm font-mono flex-1 truncate ">0x4b211c9f037fff3bae8fb49fc853...</code>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">This is the only wallet authorized to edit agents in the token and manage token settings</p>
          </div>
          <div className="space-y-2">
            <Label>Transfer ownership</Label>
            <Button variant="outline" className="w-full">Transfer ownership</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
