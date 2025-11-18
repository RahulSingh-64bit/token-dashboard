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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, UserPlus, Shield, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

7

const agents = [
  { email: "t@tokeny.com", wallet: "0x80f6D78D532755d53...e0C", permission: "Agent" },
  { email: "admin@tokeny.com", wallet: "0x4dffE6afBDd58E3CB...2E0", permission: "Agent" },
  { email: "agent@tokeny.com", wallet: "0x0bf10Cf31cb1022689...594", permission: "Agent" },
  { email: "user@tokeny.com", wallet: "0x7bEC02105D08E6ee3...c7b", permission: "Agent" },
  { email: "support@tokeny.com", wallet: "0x36B764ED2d3d8c39A...2b2", permission: "Agent" },
  { email: "team@tokeny.com", wallet: "0x95d98e0067BDf31C...453", permission: "Agent" },
  { email: "dev@tokeny.com", wallet: "0x8eCd2d2a85E7a88d0...e90", permission: "Agent" },
  { email: "ops@tokeny.com", wallet: "0x19a6de871851B0836...3a6", permission: "Agent" },
  { email: "legal@tokeny.com", wallet: "0x58C203FDA5B277ed...0c0", permission: "Agent" },
  { email: "owner@tokeny.com", wallet: "0xd1e1e9d793C78ba89...d1E", permission: "Owner" },
  { email: "ceo@tokeny.com", wallet: "0x0CC5c52AF4b2D16A...f14", permission: "Owner" },
];

export default function AgentsContent() {
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
 

  const totalItems = agents.length;
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));

 const handleCopy = (wallet) => {
  navigator.clipboard.writeText(wallet);
  toast.success("Copied!", {
    description: wallet,
    duration: 2500,
  });
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
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Shield className="w-3 h-3 mr-1" />
                Agent
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
            <p className="text-muted-foreground mt-2">
              Manage wallet addresses with agent or owner permissions
            </p>
          </div>

          <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="agent@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Wallet Address</Label>
                  <Input placeholder="0x..." />
                </div>
                <div className="space-y-2">
                  <Label>Permission</Label>
                  <Select defaultValue="Agent">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agent">Agent</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                  Cancel
                </Button>
                <Button>Add Agent</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-32">Actions</TableHead>
                  <TableHead>Permission</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="destructive" className="h-8">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={agent.permission === "Owner" ? "default" : "secondary"}
                        className={
                          agent.permission === "Owner"
                            ? "bg-purple-600 text-white"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        <Shield className="w-3.5 h-3.5 mr-1" />
                        {agent.permission}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {agent.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 font-mono text-sm">
                        <span className="text-foreground">{agent.wallet}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopy(agent.wallet)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
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
            {totalItems} {totalItems === 1 ? "agent" : "agents"}
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