"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Filter, Download, User, CheckCircle, XCircle, Clock } from "lucide-react";

const mockCandidates = [
  { id: "1", status: "Pending", name: "a", email: "a...il.com", kyc: "Approved", type: "Individual", residence: "FRA", currentSection: "-" },
  { id: "2", status: "Registered", name: "T", email: "to...om", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Upload documents" },
  { id: "3", status: "Registered", name: "A", email: "o...ail.com", kyc: "Not checked", type: "Individual", residence: "FRA", currentSection: "Wallet address" },
  { id: "4", status: "Registered", name: "A", email: "a...email.com", kyc: "Not checked", type: "Individual", residence: "GBR", currentSection: "Identity verification (Onfi..." },
  { id: "5", status: "Registered", name: "D", email: "d...keny.com", kyc: "Not checked", type: "Individual", residence: "CZE", currentSection: "Wallet address" },
  { id: "6", status: "Registered", name: "-", email: "g...n@tokeny.com", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Main information" },
  { id: "7", status: "Qualified", name: "H", email: "h", kyc: "Approved", type: "Individual", residence: "FRA", currentSection: "-" },
  { id: "8", status: "Registered", name: "G", email: "g...om", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Wallet address" },
  { id: "9", status: "Qualified", name: "D", email: "d...keny.com", kyc: "Approved", type: "Individual", residence: "CZE", currentSection: "-" },
];

export default function Candidates() {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = mockCandidates.slice(startIndex, endIndex);

  const toggleCandidate = (id) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map((c) => c.id));
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      Pending: { variant: "outline", icon: Clock, color: "text-orange-600" },
      Registered: { variant: "secondary", icon: Clock, color: "text-blue-600" },
      Qualified: { variant: "default", icon: CheckCircle, color: "text-green-600" },
    }[status] || { variant: "secondary", icon: Clock };

    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {status}
      </Badge>
    );
  };

  const getKYCBadge = (kyc) => {
    if (kyc === "Approved") {
      return (
        <Badge variant="default" className="gap-1.5 bg-green-500/10 text-green-700 border-green-500/20">
          <CheckCircle className="w-3.5 h-3.5" />
          Approved
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1.5 text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        Not checked
      </Badge>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Candidates</h1>
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
        <div className="border rounded-lg overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0}
                      indeterminate={selectedCandidates.length > 0 && selectedCandidates.length < currentCandidates.length}
                      onCheckedChange={toggleAll}
                      aria-label="Select all candidates"
                    />
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Investor Type</TableHead>
                  <TableHead>Residence</TableHead>
                  <TableHead>Current Section</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => toggleCandidate(candidate.id)}
                        aria-label={`Select candidate ${candidate.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {candidate.email}
                    </TableCell>
                    <TableCell>{getKYCBadge(candidate.kyc)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{candidate.residence}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                      {candidate.currentSection}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination & Items per page */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}–{Math.min(endIndex, mockCandidates.length)} of {mockCandidates.length} candidates
          </div>

          <div className="flex items-center gap-6">
            {/* Items per page */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
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

            {/* Pagination */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </Button>
              <span className="text-sm font-medium min-w-12 text-center">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}