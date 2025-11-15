import { Coins, Settings as SettingsIcon, CheckCircle, Globe, Scale, ArrowLeftRight, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SettingsMainView = ({
  onViewChange,
  currentView,
  identityEnabled,
  setIdentityEnabled,
  jurisdictionsEnabled,
  setJurisdictionsEnabled,
  supplyRulesEnabled,
  setSupplyRulesEnabled,
  transferRulesEnabled,
  setTransferRulesEnabled,
  customRulesEnabled,
  setCustomRulesEnabled,
}) => {
  const settingsOptions = [
    {
      id: "token-info",
      title: "Token info",
      description: "Manage token name, symbol, decimals, network, logo, base currency and instrument type.",
      icon: Coins,
      view: "token-info",
    },
    {
      id: "token-ownership",
      title: "Token Ownership",
      description: "Set the token owner wallet address that can manage token settings and token agents.",
      icon: SettingsIcon,
      view: "token-ownership",
    },
    {
      id: "identity-eligibility",
      title: "Identity eligibility",
      description: "Set required claims for the investors to be eligible to hold tokens.",
      icon: CheckCircle,
      view: "identity-eligibility",
      toggle: identityEnabled,
      onToggle: setIdentityEnabled,
    },
    {
      id: "jurisdictions",
      title: "Jurisdictions",
      description: "Restrict the circulation of tokens in certain countries. Transfers to restricted countries will be rejected.",
      icon: Globe,
      view: "jurisdictions",
      toggle: jurisdictionsEnabled,
      onToggle: setJurisdictionsEnabled,
    },
    {
      id: "supply-rules",
      title: "Supply rules",
      description: "Set total supply limit and balance limit per investor.",
      icon: Scale,
      view: "supply-rules",
      toggle: supplyRulesEnabled,
      onToggle: setSupplyRulesEnabled,
    },
    {
      id: "transfer-rules",
      title: "Transfer rules",
      description: "Set transfer limits per time interval and manage transfer expenses.",
      icon: ArrowLeftRight,
      view: "transfer-rules",
      toggle: transferRulesEnabled,
      onToggle: setTransferRulesEnabled,
    },
    {
      id: "custom-rules",
      title: "Custom Rules",
      description: "Add one or more custom compliance smart Contracts.",
      icon: FileCode,
      view: "custom-rules",
      toggle: customRulesEnabled,
      onToggle: setCustomRulesEnabled,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Settings</h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {settingsOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-colors ${
              currentView === option.view ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
            // Always open view when card is clicked
            onClick={() => onViewChange(option.view)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>

                {/* Toggle Badge */}
                {option.toggle !== undefined && (
                  <div
                    className="cursor-pointer select-none"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      option.onToggle(!option.toggle);
                    }}
                  >
                    <Badge
  variant={option.toggle ? "default" : "secondary"}
  className={option.toggle ? "bg-green-600 hover:bg-green-700 text-white" : ""}
>
  {option.toggle ? "On" : "Off"}
</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};