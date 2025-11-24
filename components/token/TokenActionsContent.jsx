"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  Lock,
  Unlock,
  ArrowLeftRight,
  Copy,
  Filter,
  Pause,
  Trash2,
  ArrowRight,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const mockInvestors = [
  { id: "1", name: "Alex", email: "alex@tokeny.com", wallet: "0x0c52279466...2bf", type: "Individual", country: "GBR", balance: 125124.99, status: "Tokenholder" },
  { id: "2", name: "Thomas", email: "thomas@fund.com", wallet: "0xE8Ab71D2E0C...9bb", type: "Individual", country: "LUX", balance: 4001.93, status: "Tokenholder" },
  { id: "3", name: "Pierre", email: "pierre@corp.com", wallet: "0x7474F272697S...826", type: "Institution", country: "LUX", balance: 545.66, status: "Tokenholder" },
  { id: "4", name: "Paul", email: "paul@investor.com", wallet: "0x76267E2e80f0...935", type: "Institution", country: "LUX", balance: 466.16, status: "Tokenholder" },
  { id: "5", name: "John", email: "john@tokeny.com", wallet: "0x7cAeFa2418E...A88", type: "Individual", country: "LUX", balance: 199.59, status: "Tokenholder" },
  { id: "6", name: "Bob", email: "bob@tokeny.com", wallet: "0x21F733e19Bc...f98", type: "Individual", country: "ITA", balance: 125, status: "Tokenholder" },
  { id: "7", name: "Laura", email: "laura@fund.com", wallet: "0xFdE2201318e...31A", type: "Individual", country: "AUT", balance: 0, status: "Qualified" },
];

const actionTabs = [
  { id: "mint", label: "Mint", icon: Plus, color: "text-emerald-600" },
  { id: "burn", label: "Burn", icon: Minus, color: "text-red-600" },
  { id: "block", label: "Block", icon: Lock, color: "text-orange-600" },
  { id: "unblock", label: "Unblock", icon: Unlock, color: "text-green-600" },
  { id: "transfer", label: "Force Transfer", icon: ArrowLeftRight, color: "text-blue-600" },
];

export default function TokenActionsContent() {
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [activeAction, setActiveAction] = useState("mint");
  const [amounts, setAmounts] = useState({});
  const [inputMode, setInputMode] = useState("quantity");
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = mockInvestors.length;
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));

  const selectedData = mockInvestors.filter(i => selectedInvestors.includes(i.id));
  const totalAmount = selectedData.reduce((sum, inv) => sum + (amounts[inv.id] || 0), 0);

  const handleSelectAll = (checked) => {
    setSelectedInvestors(checked ? mockInvestors.map(i => i.id) : []);
  };

  const handleSelectInvestor = (id, checked) => {
    setSelectedInvestors(prev =>
      checked ? [...prev, id] : prev.filter(x => x !== id)
    );
  };

  const handleAmountChange = (id, value) => {
    const num = parseFloat(value) || 0;
    setAmounts(prev => ({ ...prev, [id]: num }));
  };

  const calculateNewBalance = (investor) => {
    const amount = amounts[investor.id] || 0;
    if (activeAction === "mint") return investor.balance + amount;
    if (activeAction === "burn") return Math.max(0, investor.balance - amount);
    return investor.balance;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(String(text));
    toast.success("Copied to clipboard");
  };

  const discard = () => {
    setSelectedInvestors([]);
    setAmounts({});
  };

  const getInitials = (name) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const getAvatarColor = (name) => {
    const colors = ["bg-sky-600", "bg-rose-600", "bg-emerald-600", "bg-violet-600", "bg-orange-600"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-screen-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="outline" className="font-mono text-xs">
              <Copy className="w-3 h-3 mr-1" />
              0x58C...0c0
            </Badge>
            <Badge className="bg-purple-100 text-purple-700">
              Agent
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Token Actions</h1>
          <p className="text-muted-foreground mt-2">
            Select investors to mint, burn, block, unblock or force transfer tokens
          </p>
        </div>
      </div>

      {/* Selected Investors Panel */}
      {selectedInvestors.length > 0 && (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 border-b">
            <p className="font-medium">
              {selectedInvestors.length} investor{selectedInvestors.length > 1 ? "s" : ""} selected
            </p>
          </div>

          {/* Action Tabs */}
          <div className="border-b bg-muted/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {actionTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAction(tab.id)}
                    className={`
                      flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all
                      ${activeAction === tab.id
                        ? "border-b-2 border-primary text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mint / Burn Form */}
          {(activeAction === "mint" || activeAction === "burn") && (
            <div className="p-6 space-y-6">
              {/* Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="md:col-span-4">Investor</div>
                <div className="md:col-span-2 text-center">Current Balance</div>
                <div className="md:col-span-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="uppercase">{activeAction === "mint" ? "Mint" : "Burn"}</span>
                    <Select value={inputMode} onValueChange={setInputMode}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quantity">By quantity</SelectItem>
                        <SelectItem value="percentage">By percentage %</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="md:col-span-2 text-center">New Balance</div>
                <div className="md:col-span-1" />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedData.map((investor) => {
                  const newBalance = calculateNewBalance(investor);
                  return (
                    <div key={investor.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors">
                      {/* Investor */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <Avatar className={`h-9 w-9 ${getAvatarColor(investor.name)}`}>
                          <AvatarFallback className="text-white text-xs font-bold">
                            {getInitials(investor.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-xs text-muted-foreground">{investor.email}</p>
                        </div>
                      </div>

                      {/* Current Balance */}
                      <div className="md:col-span-2 text-center">
                        <p className="font-semibold">{investor.balance.toLocaleString()}</p>
                      </div>

                      {/* Amount Input */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="0"
                            value={amounts[investor.id] || ""}
                            onChange={(e) => handleAmountChange(investor.id, e.target.value)}
                            className="h-9"
                          />
                          <span className="text-sm text-muted-foreground">USP</span>
                        </div>
                      </div>

                      {/* New Balance */}
                      <div className="md:col-span-2 text-center">
                        <p className={`font-bold ${newBalance > investor.balance ? "text-emerald-600" : "text-red-600"}`}>
                          {newBalance.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <div className="md:col-span-1 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedInvestors(prev => prev.filter(id => id !== investor.id));
                            setAmounts(prev => {
                              const copy = { ...prev };
                              delete copy[investor.id];
                              return copy;
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total to {activeAction}</p>
                  <p className="text-2xl font-bold">{totalAmount.toLocaleString()} USP</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" onClick={discard}>
                    Discard
                  </Button>
                  <Button onClick={discard}>
                    {activeAction === "mint" ? "Mint Tokens" : "Burn Tokens"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Block / Unblock / Transfer */}
          {["block", "unblock", "transfer"].includes(activeAction) && (
            <div className="p-6">
              <p className="text-lg mb-6">
                {activeAction === "block" && `Permanently block ${selectedInvestors.length} investor(s) from trading?`}
                {activeAction === "unblock" && `Unblock ${selectedInvestors.length} investor(s)?`}
                {activeAction === "transfer" && `Force transfer tokens for ${selectedInvestors.length} investor(s)?`}
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={discard}>Cancel</Button>
                <Button variant={activeAction === "block" ? "destructive" : "default"} onClick={discard}>
                  Confirm {activeAction === "transfer" ? "Transfer" : activeAction.charAt(0).toUpperCase() + activeAction.slice(1)}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto justify-center sm:justify-start">
              Token Actions ({selectedInvestors.length})
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto justify-center">
              <Pause className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Pause token</span>
              <span className="sm:hidden">Pause</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedInvestors.length === mockInvestors.length && mockInvestors.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Investor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockInvestors.map((investor) => (
                <TableRow key={investor.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedInvestors.includes(investor.id)}
                      onCheckedChange={(v) => handleSelectInvestor(investor.id, v)}
                    />
                  </TableCell>

                  <TableCell>
                    <Badge variant={investor.status === "Tokenholder" ? "default" : "secondary"}>
                      <FileText className="w-3 h-3 mr-1" />
                      {investor.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className={`h-9 w-9 ${getAvatarColor(investor.name)}`}>
                        <AvatarFallback className="text-white font-bold text-xs">
                          {getInitials(investor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{investor.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {investor.email}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 font-mono text-sm">
                      {investor.wallet}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(investor.wallet)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{investor.type}</TableCell>
                  <TableCell className="text-sm">{investor.country}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 font-semibold">
                      {investor.balance.toLocaleString()}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(investor.balance)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {totalItems} investor{totalItems !== 1 && "s"}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Items per page</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-primary" disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                Prev
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  className={page === currentPage ? "bg-primary/10 text-primary font-medium" : "text-primary"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button variant="ghost" size="sm" className="text-primary" disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}