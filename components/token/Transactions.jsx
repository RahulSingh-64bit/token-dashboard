"use client";

import { useState } from "react";
import {
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  ArrowRightLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockTransactions = [
  { id: "1", status: "confirmed", type: "mint", dateTime: "9 May 2024, 14:32:18", sender: "-", recipient: "0x58c...0c0", amount: 5.07, senderBalance: null, senderBlockStatus: null },
  { id: "2", status: "confirmed", type: "mint", dateTime: "9 May 2024, 14:32:18", sender: "-", recipient: "0x38...1b", amount: 4000, senderBalance: null, senderBlockStatus: null },
  { id: "3", status: "confirmed", type: "block", dateTime: "22 Apr 2024, 14:48:27", sender: "-", recipient: "0x5c...15", amount: 223.08, senderBalance: null, senderBlockStatus: null },
  { id: "4", status: "confirmed", type: "unblock", dateTime: "22 Apr 2024, 14:48:21", sender: "0x5c...12", recipient: "-", amount: 223.08, senderBalance: null, senderBlockStatus: null },
  { id: "5", status: "confirmed", type: "transfer", dateTime: "22 Apr 2024, 14:48:21", sender: "0x9187C59438A...792", recipient: "0x5c...15", amount: 466.16, senderBalance: 0, senderBlockStatus: 0 },
  { id: "6", status: "confirmed", type: "block", dateTime: "18 Apr 2024, 09:56:56", sender: "0x5c...12", recipient: "-", amount: 223.08, senderBalance: null, senderBlockStatus: null },
];

export default function Transactions() {
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusIcon = (status) => {
    if (status === "confirmed")
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "pending")
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getTypeIcon = (type) => {
    const iconClass = "w-5 h-5";
    if (type === "mint")
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    if (type === "burn")
      return <XCircle className={`${iconClass} text-red-500`} />;
    if (type === "block")
      return <XCircle className={`${iconClass} text-red-500`} />;
    if (type === "unblock")
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    return <ArrowRightLeft className={`${iconClass} text-blue-500`} />;
  };

  const getTypeColor = (type) => {
    if (type === "mint" || type === "unblock") return "text-green-500 font-medium";
    if (type === "burn" || type === "block") return "text-red-500 font-medium";
    return "text-blue-500 font-medium";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Transactions</h1>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <Copy className="w-3 h-3" /> 0x58C...0c0
          </Badge>

          <Badge
            variant="secondary"
            className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-100"
          >
            Agent
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" className="h-9 px-4">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="h-9 px-4">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[120px] px-6 py-4 text-left font-semibold">Status</TableHead>
                <TableHead className="min-w-[120px] px-6 py-4 text-left font-semibold">Type</TableHead>
                <TableHead className="min-w-[180px] px-6 py-4 text-left font-semibold">Date & Time</TableHead>
                <TableHead className="min-w-[180px] px-6 py-4 text-left font-semibold">Sender</TableHead>
                <TableHead className="min-w-[180px] px-6 py-4 text-left font-semibold">Recipient</TableHead>
                <TableHead className="min-w-[130px] px-6 py-4 text-right font-semibold">Amount</TableHead>
                <TableHead className="min-w-[150px] px-6 py-4 text-right font-semibold">Sender Balance</TableHead>
                <TableHead className="min-w-[170px] px-6 py-4 text-right font-semibold">Block / Unblock</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockTransactions.map((t) => (
                <TableRow key={t.id} className="hover:bg-muted/30 transition-colors h-16">
                  {/* STATUS */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(t.status)}
                      <span className="capitalize text-base font-medium">{t.status}</span>
                    </div>
                  </TableCell>

                  {/* TYPE */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(t.type)}
                      <span className={`capitalize text-base ${getTypeColor(t.type)}`}>
                        {t.type}
                      </span>
                    </div>
                  </TableCell>

                  {/* DATE & TIME */}
                  <TableCell className="px-6 py-4 text-base font-medium text-muted-foreground">
                    {t.dateTime}
                  </TableCell>

                  {/* SENDER */}
                  <TableCell className="px-6 py-4">
                    {t.sender !== "-" ? (
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-base font-mono tracking-tight">{t.sender}</span>
                        <button
                          onClick={() => copyToClipboard(t.sender)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-base text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* RECIPIENT */}
                  <TableCell className="px-6 py-4">
                    {t.recipient !== "-" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                          {t.recipient.charAt(2).toUpperCase()}
                        </div>
                        <span className="text-primary text-base font-mono tracking-tight">{t.recipient}</span>
                        <button
                          onClick={() => copyToClipboard(t.recipient)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-base text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* AMOUNT */}
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="text-base font-semibold">{t.amount.toLocaleString()}</span>
                      <button
                        onClick={() => copyToClipboard(t.amount.toString())}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>

                  {/* SENDER BALANCE */}
                  <TableCell className="px-6 py-4 text-right text-base">
                    {t.senderBalance !== null ? (
                      <div className="flex items-center justify-end gap-3">
                        <span className="font-medium">{t.senderBalance}</span>
                        <button
                          onClick={() => copyToClipboard(String(t.senderBalance))}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* BLOCK / UNBLOCK */}
                  <TableCell className="px-6 py-4 text-right">
                    {t.senderBlockStatus !== null ? (
                      <div className="flex items-center justify-end gap-3">
                        <span className={`text-base font-medium ${t.senderBlockStatus === 0 ? "text-red-500" : "text-muted-foreground"}`}>
                          {t.senderBlockStatus}
                        </span>
                        <button
                          onClick={() => copyToClipboard(String(t.senderBlockStatus))}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-base text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
        <div className="text-base text-muted-foreground">22 items</div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-base">
            <span className="text-muted-foreground">Items per page:</span>

            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-20 h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10" disabled>«</Button>
            <Button variant="outline" size="icon" className="h-10 w-10" disabled>‹</Button>
            <Button variant="default" size="sm" className="h-10 min-w-10">1</Button>
            <Button variant="outline" size="icon" className="h-10 w-10">›</Button>
            <Button variant="outline" size="icon" className="h-10 w-10">»</Button>
          </div>
        </div>
      </div>

    </div>
  );
}