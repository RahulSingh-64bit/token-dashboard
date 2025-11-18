"use client";
import { useState } from "react";
import { SettingsMainView } from "@/components/settings/SettingsMainView";
import { TokenInfoView } from "@/components/settings/TokenInfoView";
import { TokenOwnershipView } from "@/components/settings/TokenOwnershipView";
import { IdentityEligibilityView } from "@/components/settings/IdentityEligibilityView";
import { JurisdictionsView } from "@/components/settings/JurisdictionsView";
import { SupplyRulesView } from "@/components/settings/SupplyRulesView";
import { TransferRulesView } from "@/components/settings/TransferRulesView";
import { CustomRulesView } from "@/components/settings/CustomRulesView";

const SettingsPage = () => {
  const [currentView, setCurrentView] = useState("main");
  const [identityEnabled, setIdentityEnabled] = useState(true);
  const [jurisdictionsEnabled, setJurisdictionsEnabled] = useState(true);
  const [supplyRulesEnabled, setSupplyRulesEnabled] = useState(false);
  const [transferRulesEnabled, setTransferRulesEnabled] = useState(false);
  const [customRulesEnabled, setCustomRulesEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className=" mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Token Configuration & Rules
          </h2>
          <p className="text-muted-foreground mt-1">
            Configure your token behavior, compliance rules, and restrictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Menu (Independent Scroll) */}
          <div className="h-full">
            <div className="h-full max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-140px)] overflow-hidden border rounded-xl bg-card shadow-sm">
              <div className="p-6 border-b bg-muted/40 sticky top-0 z-10">
                <h3 className="font-semibold text-foreground">Settings</h3>
              </div>
              <div className="overflow-y-auto h-full pb-6" style={{ maxHeight: "calc(100% - 85px)" }}>
                <div className="p-6 pt-4">
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
              </div>
            </div>
          </div>

          {/* Right Panel - Detail View (Independent Scroll) */}
          <div className="h-full">
            {currentView === "main" ? (
              // Show a nice placeholder when nothing is selected
              <div className="h-full flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-xl bg-card/50">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-foreground">Select a setting to configure</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose an option from the left panel to get started
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-140px)] overflow-hidden border rounded-xl bg-card shadow-sm">
                <div className="p-6 border-b bg-muted/40 sticky top-0 z-10 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground capitalize">
                    {currentView.replace(/-/g, " ")}
                  </h3>
                  <button
                    onClick={() => setCurrentView("main")}
                    className="text-muted-foreground hover:text-foreground text-sm font-medium"
                  >
                    ← Back
                  </button>
                </div>
                <div className="overflow-y-auto h-full" style={{ maxHeight: "calc(100% - 85px)" }}>
                  <div className="p-6">
                    {currentView === "token-info" && <TokenInfoView />}
                    {currentView === "token-ownership" && <TokenOwnershipView />}
                    {currentView === "identity-eligibility" && <IdentityEligibilityView />}
                    {currentView === "jurisdictions" && <JurisdictionsView />}
                    {currentView === "supply-rules" && <SupplyRulesView />}
                    {currentView === "transfer-rules" && <TransferRulesView />}
                    {currentView === "custom-rules" && <CustomRulesView />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;