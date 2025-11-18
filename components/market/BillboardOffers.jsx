"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, ArrowRight, Copy, Clock, AlertCircle } from "lucide-react";

const mockOffers = [
  {
    id: 1,
    status: "Active",
    quantityToSell: "1,250,000",
    tokenToSell: "USDC",
    quantityToBuy: "125,000",
    tokenToBuy: "USP",
    price: "1 USP = 10 USDC",
    expiration: "30 Nov 2024, 09:24:18",
    typeOfInvestor: "All investors",
  },
  {
    id: 2,
    status: "Active",
    quantityToSell: "800,000",
    tokenToSell: "EURC",
    quantityToBuy: "80,000",
    tokenToBuy: "USP",
    price: "1 USP = 10 EURC",
    expiration: "15 Dec 2024, 18:00:00",
    typeOfInvestor: "Qualified only",
  },
  {
    id: 3,
    status: "Expiring Soon",
    quantityToSell: "500,000",
    tokenToSell: "USDC",
    quantityToBuy: "50,000",
    tokenToBuy: "USP",
    price: "1 USP = 10 USDC",
    expiration: "19 Nov 2025, 14:30:00",
    typeOfInvestor: "All investors",
  },
];

export default function BillboardOffers() {
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = mockOffers.length;
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));

  const getStatusBadge = (status) => {
    if (status === "Active")
      return (
        <Badge variant="secondary" className="gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Active
        </Badge>
      );
    if (status === "Expiring Soon")
      return (
        <Badge variant="outline" className="gap-1.5 border-orange-500 text-orange-700">
          <Clock className="w-3.5 h-3.5" />
          Expiring Soon
        </Badge>
      );
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-screen-2xl mx-auto">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers</h1>
          <p className="text-muted-foreground mt-2">
            Active buy and sell orders on the billboard
          </p>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-36">Actions</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="text-center">Quantity to Sell</TableHead>
                  <TableHead className="text-center">Token to Sell</TableHead>
                  <TableHead className="text-center">Quantity to Buy</TableHead>
                  <TableHead className="text-center">Token to Buy</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Type of Investor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOffers.map((offer) => (
                  <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Eye className="w-4 h-4" />
                          <span className="sr-only">View offer</span>
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 text-xs px-3">
                          Deactivate
                        </Button>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(offer.status)}</TableCell>

                    {/* Quantity to Sell */}
                    <TableCell className="text-center">
                      <div className="font-semibold text-foreground">
                        {offer.quantityToSell}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 mt-1 opacity-60 hover:opacity-100"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>

                    {/* Token to Sell */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs font-bold bg-blue-600 text-white">
                            {offer.tokenToSell[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{offer.tokenToSell}</span>
                      </div>
                    </TableCell>

                    {/* Quantity to Buy */}
                    <TableCell className="text-center">
                      <div className="font-semibold text-foreground">
                        {offer.quantityToBuy}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 mt-1 opacity-60 hover:opacity-100"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>

                    {/* Token to Buy */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs font-bold bg-orange-600 text-white">
                            {offer.tokenToBuy[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{offer.tokenToBuy}</span>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <div className="font-semibold text-foreground text-center">
                        {offer.price}
                      </div>
                    </TableCell>

                    {/* Expiration */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        {offer.status === "Expiring Soon" && (
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                        )}
                        <span className={offer.status === "Expiring Soon" ? "text-orange-700 font-medium" : "text-muted-foreground"}>
                          {offer.expiration}
                        </span>
                      </div>
                    </TableCell>

                    {/* Type of Investor */}
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {offer.typeOfInvestor}
                      </Badge>
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
            {totalItems} {totalItems === 1 ? "item" : "items"}
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