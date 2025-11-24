"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Eye,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data (unchanged)
const mockOrders = [
  { id: 1, investor: "R", email: "r@investor.com", status: "Canceled by investor", date: "24 Jun 2025", amount: "€137,373.74", hasActions: false },
  { id: 2, investor: "J", email: "j@fund.com", status: "Pending", date: "14 Jun 2025", amount: "USDC 1,084,681.00", hasActions: true },
  { id: 3, investor: "D", email: "d@tokeny.com", status: "Pending", date: "10 May 2025", amount: "€303,030.31", hasActions: true },
  { id: 4, investor: "A", email: "a@tokeny.com", status: "Minted", date: "9 May 2025", amount: "US$135,645.96", hasActions: false },
  { id: 5, investor: "A", email: "a@tokeny.com", status: "Minted", date: "9 May 2025", amount: "USDC 135,640.20", hasActions: false },
  { id: 6, investor: "B", email: "b@tokeny.com", status: "Minted", date: "9 May 2025", amount: "€125,262.63", hasActions: false },
  { id: 7, investor: "B", email: "b@tokeny.com", status: "Pending", date: "9 May 2025", amount: "USDC 1,262,615.00", hasActions: true },
  { id: 8, investor: "P", email: "p@investor.com", status: "Minted", date: "9 May 2025", amount: "US$1,262,625.16", hasActions: false },
];

export default function SubscriptionOrders() {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const itemsPerPageNum = Number(itemsPerPage);
  const totalItems = mockOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPageNum);

  const paginatedData = mockOrders.slice(
    (currentPage - 1) * itemsPerPageNum,
    currentPage * itemsPerPageNum
  );

  // Checkbox logic
  const allRowsOnPageSelected = paginatedData.length > 0 && paginatedData.every(order => selectedRows.has(order.id));
  const someRowsSelected = paginatedData.some(order => selectedRows.has(order.id)) && !allRowsOnPageSelected;

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRows(newSelected);
  };

  const toggleAllRowsOnPage = () => {
    const newSelected = new Set(selectedRows);
    if (allRowsOnPageSelected) {
      paginatedData.forEach(order => newSelected.delete(order.id));
    } else {
      paginatedData.forEach(order => newSelected.add(order.id));
    }
    setSelectedRows(newSelected);
  };

  // Status config – now perfectly visible
  const getStatusConfig = (status) => {
    switch (status) {
      case "Canceled by investor":
        return { border: "border-red-500", bg: "bg-red-50", text: "text-red-700", icon: XCircle };
      case "Pending":
        return { border: "border-amber-500", bg: "bg-amber-50", text: "text-amber-700", icon: Clock };
      case "Minted":
        return { border: "border-green-500", bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2 };
      default:
        return { border: "", bg: "", text: "", icon: Clock };
    }
  };

  // Pagination numbers
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-screen-2xl mx-auto">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Orders</h1>
          <p className="text-muted-foreground mt-2">
            Manage incoming primary market subscription requests
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Table – 100% visible */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
  ref={(el) => {
    if (el) el.indeterminate = someRowsSelected;
  }}
  checked={allRowsOnPageSelected}
  onCheckedChange={toggleAllRowsOnPage}
/>

                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Investor</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="text-right">Amount to Pay</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((order) => {
                    const status = getStatusConfig(order.status);
                    const StatusIcon = status.icon;
                    const isSelected = selectedRows.has(order.id);

                    return (
                      <TableRow
                        key={order.id}
                        className={`hover:bg-muted/50 transition-colors ${isSelected ? "bg-primary/5" : ""}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleRow(order.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          {order.hasActions ? (
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Confirm
                              </Button>
                              <Button size="sm" variant="destructive" className="h-8">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`gap-1.5 font-medium border-2 ${status.border} ${status.bg} ${status.text}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">
                                {order.investor}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{order.investor}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-sm">
                          {order.email}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-foreground">
                          {order.amount}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPageNum + 1} to{" "}
            {Math.min(currentPage * itemsPerPageNum, totalItems)} of {totalItems} items
            {selectedRows.size > 0 && ` • ${selectedRows.size} selected`}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Rows per page</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-20 h-9">
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

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {getPageNumbers().map((page, i) => (
                <Button
                  key={i}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  disabled={page === "..."}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}