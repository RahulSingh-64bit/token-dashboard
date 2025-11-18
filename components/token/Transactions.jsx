"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRightLeft,
  Copy,
  Download,
  Filter,
  Shield,
} from "lucide-react";

const mockTransactions = [
  { id: "1", status: "confirmed", type: "mint", dateTime: "9 May 2024, 14:32:18", sender: "-", recipient: "0x58c203FDA5B277ed...0c0", amount: 5.07 },
  { id: "2", status: "confirmed", type: "mint", dateTime: "9 May 2024, 14:32:18", sender: "-", recipient: "0x38a1F2b9c4d5e6f7...1b", amount: 4000 },
  { id: "3", status: "confirmed", type: "block", dateTime: "22 Apr 2024, 14:48:27", sender: "-", recipient: "0x5c8d9e0f1a2b3c4d...15", amount: 223.08 },
  { id: "4", status: "confirmed", type: "unblock", dateTime: "22 Apr 2024, 14:48:21", sender: "0x5c8d9e0f1a2b3c4d...12", recipient: "-", amount: 223.08 },
  { id: "5", status: "confirmed", type: "transfer", dateTime: "22 Apr 2024, 14:48:21", sender: "0x9187C59438A...792", recipient: "0x5c8d9e0f1a2b3c4d...15", amount: 466.16, senderBalance: 0 },
  { id: "6", status: "confirmed", type: "block", dateTime: "18 Apr 2024, 09:56:56", sender: "0x5c8d9e0f1a2b3c4d...12", recipient: "-", amount: 223.08 },
];

export default function Transactions() {
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = mockTransactions.length;
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      description: text,
      duration: 2000,
    });
  };

  const getStatusBadge = (status) => {
    if (status === "confirmed")
      return <Badge className="gap-1.5 bg-green-500/10 text-green-700"><CheckCircle2 className="w-3.5 h-3.5" />Confirmed</Badge>;
    if (status === "pending")
      return <Badge className="gap-1.5 bg-yellow-500/10 text-yellow-700"><AlertCircle className="w-3.5 h-3.5" />Pending</Badge>;
    return <Badge variant="destructive" className="gap-1.5"><XCircle className="w-3.5 h-3.5" />Failed</Badge>;
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "mint":
        return <Badge className="gap-1.5 bg-emerald-500/10 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" />Mint</Badge>;
      case "burn":
        return <Badge variant="destructive" className="gap-1.5"><XCircle className="w-3.5 h-3.5" />Burn</Badge>;
      case "block":
        return <Badge variant="destructive" className="gap-1.5"><XCircle className="w-3.5 h-3.5" />Block</Badge>;
      case "unblock":
        return <Badge className="gap-1.5 bg-emerald-500/10 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" />Unblock</Badge>;
      case "transfer":
        return <Badge className="gap-1.5 bg-blue-500/10 text-blue-700"><ArrowRightLeft className="w-3.5 h-3.5" />Transfer</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-screen-2xl mx-auto">
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="font-mono text-xs">
                <Copy className="w-3 h-3 mr-1" />
                0x58C...0c0
              </Badge>
              <Badge className="bg-purple-100 text-purple-700">
                <Shield className="w-3 h-3 mr-1" />
                Agent
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-2">
              View all on-chain token movements and actions
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Sender Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>{getStatusBadge(t.status)}</TableCell>
                    <TableCell>{getTypeBadge(t.type)}</TableCell>
                    <TableCell className="text-muted-foreground font-medium">
                      {t.dateTime}
                    </TableCell>

                    {/* Sender */}
                    <TableCell>
                      {t.sender !== "-" ? (
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <span>{t.sender}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(t.sender)}>
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* Recipient */}
                    <TableCell>
                      {t.recipient !== "-" ? (
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <span>{t.recipient}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(t.recipient)}>
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="text-right font-semibold">
                      <div className="flex items-center justify-end gap-2">
                        <span>{t.amount.toLocaleString()}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(t.amount.toString())}>
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Sender Balance */}
                    <TableCell className="text-right">
                      {t.senderBalance !== undefined ? (
                        <span className={t.senderBalance === 0 ? "text-red-600 font-medium" : "font-medium"}>
                          {t.senderBalance}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Your Exact Pagination Style */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {totalItems} transaction{totalItems !== 1 && "s"}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Items per page</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-[70px] h-8">
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

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
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

              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}