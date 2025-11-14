"use client";

import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Filter,
  FileText,
  Pause,
  Trash2,
  Plus,
  Minus,
  Lock,
  Unlock,
  ArrowLeftRight,
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

/* ------------ Mock data ------------ */
const mockInvestors = [
  { id: "1", name: "Alex", email: "@tokeny.com", wallet: "0x0c52279466...2bf", type: "Individual", country: "GBR", balance: 125124.99, status: "Tokenholder" },
  { id: "2", name: "Thomas", email: "t.com", wallet: "0xE8Ab71D2E0C...9bb", type: "Individual", country: "LUX", balance: 4001.93, status: "Tokenholder" },
  { id: "3", name: "Pierre", email: "email.com", wallet: "0x7474F272697S...826", type: "Institution", country: "LUX", balance: 545.66, status: "Tokenholder" },
  { id: "4", name: "Paul", email: "mail.com", wallet: "0x76267E2e80f0...935", type: "Institution", country: "LUX", balance: 466.16, status: "Tokenholder" },
  { id: "5", name: "John", email: "mail.com", wallet: "0x7cAeFa2418E...A88", type: "Individual", country: "LUX", balance: 199.59, status: "Tokenholder" },
  { id: "6", name: "Bob", email: "@tokeny.com", wallet: "0x21F733e19Bc...f98", type: "Individual", country: "ITA", balance: 125, status: "Tokenholder" },
  { id: "7", name: "Laura", email: "y.com", wallet: "0xFdE2201318e...31A", type: "Individual", country: "AUT", balance: 0, status: "Qualified" },
];

const actionTabs = [
  { id: "mint", label: "Mint", icon: Plus },
  { id: "burn", label: "Burn", icon: Minus },
  { id: "block", label: "Block", icon: Lock },
  { id: "unblock", label: "Unblock", icon: Unlock },
  { id: "transfer", label: "Force transfer", icon: ArrowLeftRight },
];

export default function TokenActionsContent() {
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [activeAction, setActiveAction] = useState("mint"); // mint | burn | block | unblock | transfer
  const [mintValues, setMintValues] = useState({}); // { investorId: number }
  const [inputMode, setInputMode] = useState("quantity"); // quantity | percentage
  const [copiedText, setCopiedText] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState("50");

  /* ----------------- Helpers ----------------- */
  const handleSelectAll = (checked) => {
    if (checked) setSelectedInvestors(mockInvestors.map((i) => i.id));
    else setSelectedInvestors([]);
  };

  const handleSelectInvestor = (id, checked) => {
    if (checked) setSelectedInvestors((s) => Array.from(new Set([...s, id])));
    else setSelectedInvestors((s) => s.filter((x) => x !== id));
  };

  const handleMintValueChange = (investorId, value) => {
    const num = parseFloat(value);
    setMintValues((prev) => ({ ...prev, [investorId]: Number.isFinite(num) ? num : 0 }));
  };

  const getSelectedInvestorsData = () => {
    return mockInvestors.filter((i) => selectedInvestors.includes(i.id));
  };

  const calculateNewBalance = (investor) => {
    const val = mintValues[investor.id] || 0;
    if (activeAction === "mint") return investor.balance + val;
    if (activeAction === "burn") return Math.max(0, investor.balance - val);
    return investor.balance;
  };

  const calculateTotal = () => {
    return getSelectedInvestorsData().reduce((sum, inv) => sum + (mintValues[inv.id] || 0), 0);
  };

  const handleCopy = (text) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(String(text));
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const discardSelection = () => {
    setSelectedInvestors([]);
    setMintValues({});
    setActiveAction("mint");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) return name.slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ["bg-sky-600", "bg-rose-600", "bg-emerald-600", "bg-violet-600", "bg-orange-500"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  /* ----------------- Render ----------------- */
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              0x58C...0c0
            </Badge>
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-100">
              Agent
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Token actions</h1>
          <p className="text-sm text-muted-foreground mt-1 ">
            Select investors to mint, burn, block, unblock or transfer their tokens
          </p>
        </div>
      </div>

      {/* Selected Banner */}
      {selectedInvestors.length > 0 && (
        <div className="rounded-lg overflow-hidden border bg-blue-600 ">
          <div className="p-4">
            <p className="text-sm font-medium">
              {selectedInvestors.length} investor{selectedInvestors.length > 1 ? "s" : ""} selected
            </p>
          </div>

          {/* Action Tabs */}
          <div className="bg-background/10 border-t border-primary-foreground/10">
            <div className="flex overflow-x-auto">
              {actionTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAction(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeAction === tab.id
                        ? "bg-background text-foreground border-b-2 border-primary"
                        : "text-primary-foreground/70 hover:text-primary-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Content */}
          {(activeAction === "mint" || activeAction === "burn") && (
            <div className="p-4 bg-gray-100 text-foreground">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">INVESTOR ({selectedInvestors.length})</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">BALANCE</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase">{activeAction}</p>
                    <Select value={inputMode} onValueChange={(v) => setInputMode(v)}>
                      <SelectTrigger className="w-40 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quantity">By quantity</SelectItem>
                        <SelectItem value="percentage">By percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">NEW BALANCE</p>
                </div>
                <div className="w-10" />
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {getSelectedInvestorsData().map((investor) => {
                  const newBalance = calculateNewBalance(investor);
                  return (
                    <div key={investor.id} className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                      <div className="flex-1 flex items-center gap-3">
                        <div className={`${getAvatarColor(investor.name)} h-8 w-8 rounded-full flex items-center justify-center text-white font-medium`}>
                          {getInitials(investor.name)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{investor.name}</div>
                          <div className="text-xs text-muted-foreground">{investor.email}</div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm">{investor.balance.toLocaleString()} <span className="text-muted-foreground">USP</span></p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-red-500">⊖ 0</span>
                          <span className="text-success">⊕ {investor.balance.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex-1 flex gap-2 items-center">
                        <Input
                          type="number"
                          placeholder="0"
                          value={mintValues[investor.id] ?? ""}
                          onChange={(e) => handleMintValueChange(investor.id, e.target.value)}
                          className="h-9 text-sm"
                        />
                        <div className="text-xs text-muted-foreground px-2">USP</div>
                        {/* Additional field kept for parity with earlier snippet */}
                        <Input
                          type="number"
                          placeholder="0"
                          value={mintValues[investor.id] ?? ""}
                          onChange={(e) => handleMintValueChange(investor.id, e.target.value)}
                          className="h-9 text-sm"
                        />
                        <div className="text-xs text-muted-foreground px-2">USP</div>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm">{newBalance.toLocaleString()} <span className="text-muted-foreground">USP</span></p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-red-500">⊖ 0</span>
                          <span className="text-success">⊕ {newBalance.toLocaleString()}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                        // remove this investor from the selection (trash)
                        setSelectedInvestors((s) => s.filter(id => id !== investor.id));
                        setMintValues((prev) => {
                          const copy = { ...prev };
                          delete copy[investor.id];
                          return copy;
                        });
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total tokens to {activeAction}</p>
                  <p className="text-lg font-semibold">{calculateTotal().toLocaleString()} USP</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="ghost" onClick={discardSelection}>Discard</Button>
                  <Button className="flex-1 sm:flex-none" onClick={() => {
                    // Placeholder for mint/burn action: integrate actual API or logic here
                    // For now we just clear selection to simulate completion
                    discardSelection();
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    {activeAction === "mint" ? "Mint" : "Burn"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Block */}
          {activeAction === "block" && (
            <div className="p-4 bg-background text-foreground">
              <p className="text-sm mb-4">Block {selectedInvestors.length} investor(s) from trading?</p>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setSelectedInvestors([])}>Cancel</Button>
                <Button variant="destructive" onClick={() => setSelectedInvestors([])}>Block</Button>
              </div>
            </div>
          )}

          {/* Unblock */}
          {activeAction === "unblock" && (
            <div className="p-4 bg-background text-foreground">
              <p className="text-sm mb-4">Unblock {selectedInvestors.length} investor(s)?</p>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setSelectedInvestors([])}>Cancel</Button>
                <Button onClick={() => setSelectedInvestors([])}>Unblock</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button size="sm" className="flex-1 sm:flex-none">
              Token Actions ({selectedInvestors.length})
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              Pause token
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedInvestors.length === mockInvestors.length}
                    onCheckedChange={(val) => handleSelectAll(Boolean(val))}
                  />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Investor</TableHead>
                <TableHead>E-Mail</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country Of Residence</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInvestors.includes(investor.id)}
                      onCheckedChange={(val) => handleSelectInvestor(investor.id, Boolean(val))}
                    />
                  </TableCell>

                  <TableCell>
                    <Badge variant={investor.status === "Qualified" ? "default" : "outline"} className={investor.status === "Qualified" ? "bg-success text-white" : ""}>
                      <FileText className="w-3 h-3 mr-1 inline-block" /> {investor.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className={`h-8 w-8 ${getAvatarColor(investor.name)}`}>
                        <AvatarFallback className="text-white text-xs">{getInitials(investor.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{investor.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">{investor.email}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-sm whitespace-nowrap">{investor.wallet}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(investor.wallet)}>
                        <Copy className={`h-3 w-3 ${copiedText === investor.wallet ? "text-green-500" : "text-gray-400"}`} />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{investor.type}</span>
                  </TableCell>

                  <TableCell>{investor.country}</TableCell>

                  <TableCell className="text-right font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <span>{investor.balance.toLocaleString()}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(investor.balance)}>
                        <Copy className={`h-3 w-3 ${copiedText === investor.balance ? "text-green-500" : "text-gray-400"}`} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">44 items</p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page</span>
            <Select value={itemsPerPage} onValueChange={(v) => setItemsPerPage(v)}>
              <SelectTrigger className="w-20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 ml-4">
              <Button variant="outline" size="sm" disabled>Prev</Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
