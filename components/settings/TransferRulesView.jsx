// components/settings/TransferRulesView.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

export const TransferRulesView = ({ onBack }) => {
  return (
    <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-foreground">Transfer rules</h1>

      {/* Transfer Limits */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer limits
              <Switch defaultChecked={false} />
            </CardTitle>
            <CardDescription>
              It ensures a limit on the amount allowed for each investor to transfer within a certain period of time.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Conditional Transfers */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Conditional transfers
              <Switch defaultChecked={false} />
            </CardTitle>
            <CardDescription>
              It ensures that all transfers between investors are executed only after the approval of different counterparts defined in an approval flow.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>Transfer whitelisting must be disabled to enable this rule.</span>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Whitelisting */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer whitelisting
              <Switch defaultChecked={false} />
            </CardTitle>
            <CardDescription>
              If enabled, only listed investors are able to perform transfers. Note: any investor can receive tokens if compliance rules are fulfilled.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>Conditional transfers must be disabled to enable this rule.</span>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Fees */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer fees
              <Switch defaultChecked={false} />
            </CardTitle>
            <CardDescription>
              If enabled, a % fee will be taken from the transfer and sent to a collector’s wallet. This collector’s wallet needs to belong to a qualified investor. For qualifying an investor you can do it in the Investor list section once the token is deployed.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};