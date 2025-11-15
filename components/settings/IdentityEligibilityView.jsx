import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, Pencil, Trash2 } from "lucide-react";

export const IdentityEligibilityView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Identity eligibility</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Claims</CardTitle>
          <CardDescription>Select the rules that your investors need to meet to receive tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Set up eligibility for your token by specifying which claims are required on the on-chain identities (ONCHAINID) that will receive your token.</p>
          <p className="text-sm text-muted-foreground">Create your own claims (e.g. a KYB/AML claim) or add an existing claim from a trusted claim issuer (e.g. a KYC provider) using the same blockchain network.</p>
          <div className="flex flex-wrap gap-2 ">
            <Button >
              <Plus className="w-4 h-4 mr-2" />
              Create new claim
            </Button>
            <Button variant="outline">Add an existing claim</Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Actions</th>
                    <th className="text-left p-3 text-sm font-medium">Claim</th>
                    <th className="text-left p-3 text-sm font-medium">Topic ID</th>
                    <th className="text-left p-3 text-sm font-medium">Claim issuer</th>
                    <th className="text-left p-3 text-sm font-medium">Used for</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">DEFAULT CLAIM</p>
                        <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-xs">0xfbf8e9ef9769f72</code>
                    </td>
                    <td className="p-3 text-sm">Default claim issuer</td>
                    <td className="p-3 text-sm">SMP</td>
                    <td className="p-3">
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
