import { useState } from "react";
import { SettingsMainView } from "@/components/settings/SettingsMainView";
import { TokenInfoView } from "@/components/settings/TokenInfoView";
import { TokenOwnershipView } from "@/components/settings/TokenOwnershipView";
import { IdentityEligibilityView } from "@/components/settings/IdentityEligibilityView";
import { JurisdictionsView } from "@/components/settings/JurisdictionsView";
import { SupplyRulesView } from "@/components/settings/SupplyRulesView";
import { TransferRulesView } from "@/components/settings/TransferRulesView";
import { CustomRulesView } from "@/components/settings/CustomRulesView";

const Settings = () => {
  const [currentView, setCurrentView] = useState("main");
  const [identityEnabled, setIdentityEnabled] = useState(true);
  const [jurisdictionsEnabled, setJurisdictionsEnabled] = useState(true);
  const [supplyRulesEnabled, setSupplyRulesEnabled] = useState(false);
  const [transferRulesEnabled, setTransferRulesEnabled] = useState(false);
  const [customRulesEnabled, setCustomRulesEnabled] = useState(false);

  return (
    <div className="p-4 md:p-6 lg:p-8 mx-auto">
      <div className="mb-6">
        <h2 className="text-lg text-primary font-medium">
          Token configuration & Back/fee presentation
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Settings Menu */}
        <div className="lg:w-1/2">
          <SettingsMainView
            onViewChange={setCurrentView}
            currentView={currentView}
            identityEnabled={identityEnabled}
            setIdentityEnabled={setIdentityEnabled}
            jurisdictionsEnabled={jurisdictionsEnabled}
            setJurisdictionsEnabled={setJurisdictionsEnabled}
            supplyRulesEnabled={supplyRulesEnabled}
            setSupplyRulesEnabled={setSupplyRulesEnabled}
            transferRulesEnabled={transferRulesEnabled}
            setTransferRulesEnabled={setTransferRulesEnabled}
            customRulesEnabled={customRulesEnabled}
            setCustomRulesEnabled={setCustomRulesEnabled}
          />
        </div>

        {/* Right Panel - Detail Views */}
        {currentView !== "main" && (
          <div className="lg:w-1/2">
            {currentView === "token-info" && <TokenInfoView />}
            {currentView === "token-ownership" && <TokenOwnershipView />}
            {currentView === "identity-eligibility" && <IdentityEligibilityView />}
            {currentView === "jurisdictions" && <JurisdictionsView />}
            {currentView === "supply-rules" && <SupplyRulesView />}
            {currentView === "transfer-rules" && <TransferRulesView />}
            {currentView === "custom-rules" && <CustomRulesView />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;