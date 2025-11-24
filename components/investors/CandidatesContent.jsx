"use client";

import { useState, useEffect, useRef } from "react";
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
import { Eye, Filter, Download, User, CheckCircle, Clock } from "lucide-react";

// Fixed indeterminate checkbox
const IndeterminateCheckbox = ({ indeterminate, className, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  return <Checkbox ref={ref} className={className} {...props} />;
};

const mockCandidates = [
  { id: "1", status: "Pending", name: "Alex Johnson", email: "alex@example.com", kyc: "Approved", type: "Individual", residence: "FRA", currentSection: "-" },
  { id: "2", status: "Registered", name: "Tom Miller", email: "tom@example.com", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Upload documents" },
  { id: "3", status: "Registered", name: "Anna Smith", email: "anna@example.com", kyc: "Not checked", type: "Individual", residence: "FRA", currentSection: "Wallet address" },
  { id: "4", status: "Registered", name: "Ahmed Khan", email: "ahmed@example.com", kyc: "Not checked", type: "Individual", residence: "GBR", currentSection: "Identity verification (Onfido)" },
  { id: "5", status: "Registered", name: "David Brown", email: "david@example.com", kyc: "Not checked", type: "Individual", residence: "CZE", currentSection: "Wallet address" },
  { id: "6", status: "Registered", name: "Gina Rossi", email: "gina@tokeny.com", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Main information" },
  { id: "7", status: "Qualified", name: "Hans Müller", email: "hans@example.com", kyc: "Approved", type: "Individual", residence: "FRA", currentSection: "-" },
  { id: "8", status: "Registered", name: "Grace Lee", email: "grace@example.com", kyc: "Not checked", type: "Individual", residence: "LUX", currentSection: "Wallet address" },
  { id: "9", status: "Qualified", name: "Dmitry Ivanov", email: "dmitry@example.com", kyc: "Approved", type: "Individual", residence: "CZE", currentSection: "-" },
];

export default function Candidates() {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = Number(itemsPerPage);
  const totalPages = Math.ceil(mockCandidates.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, mockCandidates.length);
  const currentCandidates = mockCandidates.slice(startIndex, endIndex);
  const currentIds = currentCandidates.map(c => c.id);

  const allSelected = currentIds.length > 0 && currentIds.every(id => selectedCandidates.includes(id));
  const someSelected = currentIds.some(id => selectedCandidates.includes(id)) && !allSelected;

  const toggleCandidate = (id) => {
    setSelectedCandidates(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedCandidates(prev => {
      const pageSelected = prev.filter(id => currentIds.includes(id));
      if (pageSelected.length === currentIds.length) {
        return prev.filter(id => !currentIds.includes(id));
      } else {
        return [...prev.filter(id => !currentIds.includes(id)), ...currentIds];
      }
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-orange-500/10 text-orange-700",
      Registered: "bg-blue-500/10 text-blue-700",
      Qualified: "bg-green-500/10 text-green-700",
    }[status] || "bg-muted text-muted-foreground";
    const Icon = status === "Qualified" ? CheckCircle : Clock;
    return <Badge variant="secondary" className={`gap-1.5 ${styles}`}><Icon className="w-3.5 h-3.5" />{status}</Badge>;
  };

  const getKYCBadge = (kyc) => {
    if (kyc === "Approved") {
      return <Badge className="gap-1.5 bg-green-500/10 text-green-700 border border-green-500/20"><CheckCircle className="w-3.5 h-3.5" />Approved</Badge>;
    }
    return <Badge variant="outline" className="gap-1.5 text-muted-foreground"><Clock className="w-3.5 h-3.5" />Not checked</Badge>;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Candidates</h1>
            <p className="text-sm text-muted-foreground">Manage investor onboarding</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filters</Button>
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export</Button>
          </div>
        </div>

        {/* Selection Info */}
        {selectedCandidates.length > 0 && (
          <div className="flex items-center justify-between bg-primary/5 rounded-lg p-4">
            <span className="font-medium">{selectedCandidates.length} selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCandidates([])}>
              Clear selection
            </Button>
          </div>
        )}

        {/* Full Table with Horizontal Scroll on Mobile */}
        <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <IndeterminateCheckbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onCheckedChange={toggleAll}
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
                  <TableRow key={candidate.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => toggleCandidate(candidate.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">{candidate.email}</TableCell>
                    <TableCell>{getKYCBadge(candidate.kyc)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {candidate.type}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-medium">{candidate.residence}</TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                      {candidate.currentSection === "-" ? "—" : candidate.currentSection}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {mockCandidates.length} items
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Items per page</span>
              <Select value={itemsPerPage} onValueChange={(v) => { setItemsPerPage(v); setCurrentPage(1); }}>
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