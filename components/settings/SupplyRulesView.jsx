import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle } from "lucide-react";

export const SupplyRulesView = () => {
  const [totalSupplyEnabled, setTotalSupplyEnabled] = useState(true);
  const [totalSupplyLimit, setTotalSupplyLimit] = useState("100000");
  const [balanceLimitEnabled, setBalanceLimitEnabled] = useState(true);
  const [balanceLimit, setBalanceLimit] = useState("5.99000000");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Supply rules</h1>
      </div>
      
      {/* Total Supply Limit */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Total supply limit</CardTitle>
            <Switch checked={totalSupplyEnabled} onCheckedChange={setTotalSupplyEnabled} />
          </div>
          <CardDescription>
            It ensures that the total supply of tokens does not exceed the amount set in this limit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input 
              type="number" 
              value={totalSupplyLimit}
              onChange={(e) => setTotalSupplyLimit(e.target.value)}
              disabled={!totalSupplyEnabled}
              className="pr-16 bg-muted/50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">SMP</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">Discard</Button>
            <Button className="flex-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investor Balance Limit */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Investor balance limit</CardTitle>
            <Switch checked={balanceLimitEnabled} onCheckedChange={setBalanceLimitEnabled} />
          </div>
          <CardDescription>
            It ensures that balance of tokens for each investor does not exceed the amount set in this limit. Balance limit will be inforced from the moment this compliance rule is enabled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Balance limit per investor <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Input 
                type="number" 
                value={balanceLimit}
                onChange={(e) => setBalanceLimit(e.target.value)}
                disabled={!balanceLimitEnabled}
                className="pr-16 bg-muted/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">SMP</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">Discard</Button>
            <Button className="flex-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
