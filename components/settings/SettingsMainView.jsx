import {
  Coins,
  Settings as SettingsIcon,
  CheckCircle,
  Globe,
  Scale,
  ArrowLeftRight,
  FileCode,
  Zap,
} from "lucide-react";
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
  const basicSettings = [
    {
      id: "token-info",
      title: "Token info",
      description:
        "Manage token name, symbol, decimals, network, logo, base currency and instrument type.",
      icon: Coins,
      view: "token-info",
    },
    {
      id: "token-ownership",
      title: "Token Ownership",
      description:
        "Set the token owner wallet address that can manage token settings and token agents.",
      icon: SettingsIcon,
      view: "token-ownership",
    },
  ];

  const advancedSettings = [
    {
      id: "identity-eligibility",
      title: "Identity eligibility",
      description:
        "Set required claims for the investors to be eligible to hold tokens.",
      icon: CheckCircle,
      view: "identity-eligibility",
      toggle: identityEnabled,
      onToggle: setIdentityEnabled,
    },
    {
      id: "jurisdictions",
      title: "Jurisdictions",
      description:
        "Restrict the circulation of tokens in certain countries. Transfers to restricted countries will be rejected.",
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
      description:
        "Set transfer limits per time interval and manage transfer expenses.",
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

    const renderSettingCard = (option) => {
    const isSelected = currentView === option.view;

    return (
      <Card
        key={option.id}
        className={`cursor-pointer transition-all duration-300 relative overflow-hidden ${
          isSelected
            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
            : "hover:border-primary/50 hover:bg-accent/30"
        }`}
        onClick={() => onViewChange(option.view)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              
              <div
                className={`
                  relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0
                  transition-all duration-300
                  ${isSelected 
                    ? "bg-purple-500/20 shadow-lg shadow-purple-500/30" 
                    : "bg-muted/80"
                  }
                `}
              >
                
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-purple-500/30 blur-xl animate-pulse" />
                )}
                
                <option.icon 
                  className={`
                    relative z-10 w-5 h-5 transition-colors duration-300
                    ${isSelected ? "text-purple-600" : "text-muted-foreground"}
                  `}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1.5">
                  {option.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Toggle Badge */}
            {option.toggle !== undefined && (
              <div
                className="cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
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
    );
  };

  return (
    <div className="space-y-8">
      
      <div className="space-y-4">
        {basicSettings.map(renderSettingCard)}
      </div>

      {/* Advanced Settings Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Advanced Settings (Optional)
            </h2>
            
          </div>
        </div>

        <div className="grid gap-4">
          {advancedSettings.map(renderSettingCard)}
        </div>
      </div>
    </div>
  );
};