"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Filter, Download, Check, X } from "lucide-react";

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
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = mockOrders.length;
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));

  const getStatusConfig = (status) => {
    switch (status) {
      case "Canceled by investor":
        return { variant: "destructive", icon: "⊗", text: "text-red-700" };
      case "Pending":
        return { variant: "secondary", icon: "○", text: "text-amber-700" };
      case "Minted":
        return { variant: "default", icon: "✓", text: "text-green-700" };
      default:
        return { variant: "secondary", icon: "○", text: "" };
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-screen-2xl mx-auto">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Orders</h1>
          <p className="text-muted-foreground mt-2">Manage incoming primary market subscription requests</p>
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

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Investor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Amount to Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => {
                  const status = getStatusConfig(order.status);
                  return (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                          <span className="sr-only">View order</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        {order.hasActions ? (
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                              <Check className="w-4 h-4 mr-1" />
                              Confirm
                            </Button>
                            <Button size="sm" variant="destructive" className="h-8">
                              <X className="w-4 h-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className={`gap-1.5 ${status.text}`}>
                          <span className="text-lg leading-none">{status.icon}</span>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.date}
                      </TableCell>
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
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {order.email}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {order.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Your Exact Pagination Style */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Items per page */}
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

            {/* Pagination Buttons */}
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

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  className={page === currentPage ? "bg-primary/10 text-primary" : "text-primary"}
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