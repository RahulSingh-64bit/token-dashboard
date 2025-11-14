"use client";
import { useState } from "react";
import { Copy, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AgentsContent = () => {
  const agents = [
    {
      email: "t@tokeny.com",
      wallet: "0x80f6D78D532755d53...e0C",
      permission: "Agent",
    },
    {
      email: "tokeny.com",
      wallet: "0x4dffE6afBDd58E3CB...2E0",
      permission: "Agent",
    },
    {
      email: "okeny.com",
      wallet: "0x0bf10Cf31cb1022689...594",
      permission: "Agent",
    },
    {
      email: "@tokeny.com",
      wallet: "0x7bEC02105D08E6ee3...c7b",
      permission: "Agent",
    },
    {
      email: "okeny.com",
      wallet: "0x36B764ED2d3d8c39A...2b2",
      permission: "Agent",
    },
    {
      email: "tokeny.com",
      permission: "Agent",
      wallet: "0x95d98e0067BDf31C...453",
    },
    {
      email: "nt@tokeny.com",
      permission: "Agent",
      wallet: "0x8eCd2d2a85E7a88d0...e90",
    },
    {
      email: "@tokeny.com",
      permission: "Agent",
      wallet: "0x19a6de871851B0836...3a6",
    },
    {
      email: "nt@tokeny.com",
      permission: "Agent",
      wallet: "0x58C203FDA5B277ed...0c0",
    },
    {
      email: "tokeny.com",
      permission: "Agent",
      wallet: "0xd1e1e9d793C78ba89...d1E",
    },
    {
      email: "otokeny.com",
      permission: "Owner",
      wallet: "0x0CC5c52AF4b2D16A...f14",
    },
  ];

  const [copiedWallet, setCopiedWallet] = useState(null);

  const handleCopy = (wallet) => {
    navigator.clipboard.writeText(wallet);
    setCopiedWallet(wallet);
    setTimeout(() => setCopiedWallet(null), 1500);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> 0x58C...0c0
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-100"
              >
                Agent
              </Badge>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">Agents</h2>
          </div>

          {/* RIGHT SIDE BUTTON */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Agent
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Wallet
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agents.map((agent, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                      Remove
                    </button>
                  </td>

                  {/* Permission */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {agent.permission}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {agent.email}
                  </td>

                  {/* Wallet */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-blue-600 font-mono">
                        {agent.wallet}
                      </code>
                      <button
                        onClick={() => handleCopy(agent.wallet)}
                        className="p-1 hover:bg-gray-100 rounded transition"
                        title="Copy wallet"
                      >
                        <Copy
                          className={`w-4 h-4 ${
                            copiedWallet === agent.wallet
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      {copiedWallet === agent.wallet && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentsContent;
