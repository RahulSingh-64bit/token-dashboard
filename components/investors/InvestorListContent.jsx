"use client";
import React, { useState } from "react";
import { Copy, Filter, ArrowRight, Pause, User, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const generateMockInvestors = (count) => {
  const names = [
    "Alex", "Thomas", "Pierre", "Paul", "John", "Bob", "Laura",
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia",
    "Mason", "Isabella", "Lucas", "Mia", "Jackson", "Amelia",
    "Logan", "Harper", "Oliver", "Evelyn", "Aiden", "Abigail",
    "Caleb", "Ella", "Carter", "Grace", "Owen", "Chloe",
    "Wyatt", "Lily", "Luke", "Zoey", "Henry", "Nora",
    "Jayden", "Ellie", "Dylan", "Hannah", "Gabriel", "Lillian",
    "Isaac", "Addison", "Levi", "Aubrey", "Nathan", "Brooklyn"
  ];
  const domains = ["tokeny.com", "example.com", "mail.com", "invest.io", "fund.co"];
  const countries = ["GBR", "LUX", "FRA", "DEU", "ITA", "AUT", "ESP", "NLD", "BEL", "CHE"];
  const types = ["individual", "institution"];
  const statuses = ["tokenholder", "qualified", "candidate"];

  const investors = [];
  for (let i = 0; i < count; i++) {
    const first = names[i % names.length];
    const last = names[(i + 7) % names.length];
    const name = i % 3 === 0 ? first : `${first} ${last}`;
    const email = `${first.toLowerCase()}@${domains[i % domains.length]}`;
    const walletHash = Math.random().toString(16).slice(2, 14);
    const short = walletHash.slice(-3);
    const wallet = `0x${"0".repeat(10)}${walletHash}...${short}`;
    const type = types[i % 2];
    const status = statuses[i % 3];
    const balance = status === "tokenholder"
      ? Math.floor(Math.random() * 200000) + 100
      : status === "qualified" ? 0 : Math.floor(Math.random() * 500);

    investors.push({
      id: String(i + 1),
      investor: name,
      email,
      wallet,
      walletShort: short,
      type,
      country: countries[i % countries.length],
      balance,
      avatar: name.charAt(0).toUpperCase(),
      status,
    });
  }
  return investors;
};

const ALL_INVESTORS = generateMockInvestors(50);

export default function InvestorListContent() {
  const [copiedWallet, setCopiedWallet] = useState(null);
  const [copiedBalance, setCopiedBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const items = Number(itemsPerPage);
  const start = (currentPage - 1) * items;
  const paginated = ALL_INVESTORS.slice(start, start + items);
  const totalPages = Math.ceil(ALL_INVESTORS.length / items);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "wallet") {
      setCopiedWallet(text);
      setTimeout(() => setCopiedWallet(null), 1500);
    } else {
      setCopiedBalance(text);
      setTimeout(() => setCopiedBalance(null), 1500);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "tokenholder")
      return (
        <Badge variant="outline" className="text-xs flex items-center gap-1">
          <Copy className="w-3 h-3" /> Tokenholder
        </Badge>
      );
    if (status === "qualified")
      return (
        <Badge className="text-xs bg-green-100 text-green-700 hover:bg-green-100">
          Qualified
        </Badge>
      );
    return <Badge variant="secondary" className="text-xs">Candidate</Badge>;
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Copy className="w-3 h-3" /> 0x58C...0c0
              </Badge>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-100">
                Agent
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Investors</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              Token Actions <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center gap-1">
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Investor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.map((investor) => (
                <tr key={investor.id} className="hover:bg-gray-50 transition-colors">
                  {/* Status */}
                  <td className="px-6 py-4">{getStatusBadge(investor.status)}</td>

                  {/* Investor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-xs font-semibold text-white">
                        {investor.avatar}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {investor.investor}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-700">{investor.email}</td>

                  {/* Wallet */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-blue-600 font-mono">
                        {investor.wallet}
                      </code>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-mono">
                        {investor.walletShort}
                      </span>
                      <button
                        onClick={() => handleCopy(investor.wallet, "wallet")}
                        className="p-1 hover:bg-gray-100 rounded transition"
                        title="Copy wallet"
                      >
                        <Copy
                          className={`w-4 h-4 ${
                            copiedWallet === investor.wallet ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                      </button>
                      {copiedWallet === investor.wallet && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-700">
                      {investor.type === "individual" ? (
                        <User className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Building className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="capitalize">{investor.type}</span>
                    </div>
                  </td>

                  {/* Country */}
                  <td className="px-6 py-4 text-sm text-gray-700">{investor.country}</td>

                  {/* Balance */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {investor.balance.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleCopy(investor.balance.toString(), "balance")}
                        className="p-1 hover:bg-gray-100 rounded transition"
                        title="Copy balance"
                      >
                        <Copy
                          className={`w-4 h-4 ${
                            copiedBalance === investor.balance.toString()
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      {copiedBalance === investor.balance.toString() && (
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

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div>
          Showing {start + 1} to{" "}
          {Math.min(start + items, ALL_INVESTORS.length)} of {ALL_INVESTORS.length}{" "}
          investors
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-500">Items per page</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="px-1">…</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-2 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}