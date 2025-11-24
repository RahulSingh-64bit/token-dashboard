"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, Copy, User, Building, Eye } from "lucide-react";
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

const mockInvestors = [
  {
    id: "1",
    status: "tokenholder",
    investor: "Alex",
    email: "@tokeny.com",
    wallet: "0x0c52279466...2bf",
    walletShort: "2bf",
    type: "individual",
    country: "GBR",
    balance: 125124.99,
    avatar: "A",
  },
  {
    id: "2",
    status: "tokenholder",
    investor: "Thomas",
    email: "l.com",
    wallet: "0xE8Ab71D2E0C...9bb",
    walletShort: "9bb",
    type: "individual",
    country: "LUX",
    balance: 4001.93,
    avatar: "T",
  },
  {
    id: "3",
    status: "tokenholder",
    investor: "Pierre",
    email: "email.com",
    wallet: "0x7474F2726975...826",
    walletShort: "826",
    type: "institution",
    country: "LUX",
    balance: 545.66,
    avatar: "P",
  },
  {
    id: "4",
    status: "tokenholder",
    investor: "Paul",
    email: "mail.com",
    wallet: "0x76267E2e80f0...935",
    walletShort: "935",
    type: "institution",
    country: "LUX",
    balance: 466.16,
    avatar: "P",
  },
  {
    id: "5",
    status: "tokenholder",
    investor: "John",
    email: "mail.com",
    wallet: "0x7cAeFa2418E...A88",
    walletShort: "A88",
    type: "individual",
    country: "LUX",
    balance: 199.59,
    avatar: "J",
  },
  {
    id: "6",
    status: "tokenholder",
    investor: "Bob",
    email: "@tokeny.com",
    wallet: "0x21F733e19Bc...f98",
    walletShort: "f98",
    type: "individual",
    country: "ITA",
    balance: 125,
    avatar: "B",
  },
  {
    id: "7",
    status: "qualified",
    investor: "Laura",
    email: "y.com",
    wallet: "0xFdE2201318e...31A",
    walletShort: "31A",
    type: "individual",
    country: "AUT",
    balance: 0,
    avatar: "L",
  },
];

export default function InvestorList() {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState("50");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status) => {
    if (status === "tokenholder") {
      return (
        <Badge variant="outline" className="text-primary border-primary">
          Tokenholder
        </Badge>
      );
    }
    if (status === "qualified") {
      return (
        <Badge className="bg-success text-success-foreground">
          Qualified
        </Badge>
      );
    }
    return <Badge variant="secondary">Candidate</Badge>;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Select investors to mint, burn, block, unblock or transfer their
            tokens
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="font-mono">
            0x58C...0c0
          </Badge>
          <Badge variant="secondary">Agent</Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Actions</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Investor</TableHead>
                <TableHead className="min-w-[150px]">E-Mail</TableHead>
                <TableHead className="min-w-[200px]">Wallet</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[120px]">
                  Country Of Residence
                </TableHead>
                <TableHead className="min-w-[120px] text-right">
                  Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvestors.map((investor) => (
                <TableRow key={investor.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/investors/${investor.id}`)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>

                  <TableCell>{getStatusBadge(investor.status)}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {investor.avatar}
                      </div>
                      <span className="text-sm font-medium">
                        {investor.investor}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{investor.email}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-sm font-mono">
                        {investor.wallet}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {investor.walletShort}
                      </Badge>
                      <button
                        onClick={() => copyToClipboard(investor.wallet)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      {investor.type === "individual" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}
                      <span className="capitalize">{investor.type}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{investor.country}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm">
                        {investor.balance.toLocaleString()}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(investor.balance.toString())
                        }
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">44 items</div>

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
            <Button variant="ghost" size="sm" className="text-primary">
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-primary/10 text-primary"
            >
              1
            </Button>
            <Button variant="ghost" size="sm" className="text-primary">
              Next
            </Button>
            <Button variant="ghost" size="sm">
              »
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}