"use client";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardContent from "../components/dashboard/DashboardContent";
import AgentsContent from "../components/token/AgentsContent";
import TokenActionsContent from "../components/token/TokenActionsContent";
import InvestorListContent from "../components/investors/InvestorListContent";
import CandidatesContent from "../components/investors/CandidatesContent";

import Transactions from "@/components/token/Transactions";
import InvestorRequestsContent from "@/components/investors/InvestorRequestsContent";
import PositionReportsContent from "@/components/investors/PositionReportsContent";
import Settings from "@/components/settings/Settings";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      
      // Token
      case "token-actions":
        return <TokenActionsContent />;
      case "agents":
        return <AgentsContent />;
      case "transactions":
        return <div><Transactions/></div>;
      case "requests": 
        return <div>Token Requests </div>;
      case "documents":
        return <div>Documents </div>;

      // Investors
      case "investor-list":
        return <InvestorListContent />;
      case "candidates":
        return <CandidatesContent />;
      case "position-reports":
        return <PositionReportsContent />;
      case "investor-requests": 
        return <InvestorRequestsContent />;

      // Markets
      case "primary-market":
        return <div>Primary Market</div>;
      case "secondary-market":
        return <div>Secondary Market</div>;

      // Setting
      case "settings":
        return <Settings/>

      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}