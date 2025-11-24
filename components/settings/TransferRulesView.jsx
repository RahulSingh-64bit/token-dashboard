"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Info, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const TransferRulesView = ({ onBack }) => {
  const [transferLimits, setTransferLimits] = useState(false);
  const [conditionalTransfers, setConditionalTransfers] = useState(false);
  const [whitelisting, setWhitelisting] = useState(false);
  const [fees, setFees] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-foreground">Transfer rules</h1>

      {/* Transfer Limits */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer limits
              <Switch
                checked={transferLimits}
                onCheckedChange={setTransferLimits}
              />
            </CardTitle>
            <CardDescription>
              It ensures a limit on the amount allowed for each investor to
              transfer within a certain period of time.
            </CardDescription>
          </div>
        </CardHeader>

        <Collapsible open={transferLimits}>
          <CollapsibleContent className="border-t">
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-border px-5 py-4 w-full sm:w-auto sm:min-w-[380px]">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="daily"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label
                      htmlFor="daily"
                      className="font-medium whitespace-nowrap"
                    >
                      Daily
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Input defaultValue="300" className="w-full sm:w-32" />
                    <span className="text-sm font-medium text-purple-600">
                      SMP
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start sm:justify-center gap-3 rounded-lg border border-border px-5 py-4 w-full sm:w-auto sm:min-w-40">
                  <Checkbox id="monthly" />
                  <Label htmlFor="monthly" className="font-medium">
                    Monthly
                  </Label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-border px-5 py-4 w-full sm:w-auto sm:min-w-[380px]">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="weekly"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label
                      htmlFor="weekly"
                      className="font-medium whitespace-nowrap"
                    >
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Input defaultValue="1500" className="w-full sm:w-32" />
                    <span className="text-sm font-medium text-purple-600">
                      SMP
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start sm:justify-center gap-3 rounded-lg border border-border px-5 py-4 w-full sm:w-auto sm:min-w-40">
                  <Checkbox id="yearly" />
                  <Label htmlFor="yearly" className="font-medium">
                    Yearly
                  </Label>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="custom"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="custom" className="font-medium">
                      Custom period
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm w-full lg:w-auto">
                    <span className="whitespace-nowrap">
                      Time period (Seconds) *
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Input defaultValue="323345" className="w-full sm:w-32" />
                      <Input defaultValue="20" className="w-full sm:w-24" />
                      <span className="font-medium text-purple-600">SMP</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Conditional Transfers */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Conditional transfers
              <Switch
                checked={conditionalTransfers}
                onCheckedChange={setConditionalTransfers}
              />
            </CardTitle>
            <CardDescription>
              It ensures that all transfers between investors are executed only
              after the approval of different counterparts defined in an
              approval flow.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span className="text-blue-500">
              Transfer whitelisting must be disabled to enable this rule.
            </span>
          </div>
        </CardContent>

        <Collapsible open={conditionalTransfers}>
          <CollapsibleContent className="border-t">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-6">
                <Label className="text-base font-medium">
                  Select approver(s) *
                </Label>

                {/* Horizontal checkboxes */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="recipient"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="recipient" className="cursor-pointer">
                      Transfer recipient
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="any-agent"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="any-agent" className="cursor-pointer">
                      Any token agent
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="specific"
                      defaultChecked
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="specific" className="cursor-pointer">
                      Specific wallet(s)
                    </Label>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Please specify wallet addresses that will approve transfers.
                  You can add up to 5 wallet addresses. Each wallet needs to
                  approve every transfer in order to execute them.
                </p>

                {/* Wallet inputs */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="approver1">Approver wallet address *</Label>
                    <Input
                      id="approver1"
                      defaultValue="0xD5f2d8bc0963aaa4efa1D626F57362a5C3EF8Ccc"
                      className="font-mono mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="approver2">Approver wallet address *</Label>
                    <Input
                      id="approver2"
                      placeholder="Enter wallet address"
                      className="mt-2"
                    />
                  </div>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add another wallet
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Transfer Whitelisting  */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer whitelisting
              <Switch
                checked={whitelisting}
                onCheckedChange={setWhitelisting}
              />
            </CardTitle>
            <CardDescription>
              If enabled, only listed investors are able to perform transfers.
              Note: any investor can receive tokens if compliance rules are
              fulfilled.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span className="text-blue-500">
              Conditional transfers must be disabled to enable this rule.
            </span>
          </div>
        </CardContent>

        <Collapsible open={whitelisting}>
          <CollapsibleContent className="border-t">
            <CardContent className="pt-6">
              <div className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted border-2 border-dashed rounded-xl" />
                <p className="text-lg font-medium">Whitelisted Investors</p>
                <p className="text-sm text-muted-foreground">
                  Only investors added to the whitelist will be able to initiate
                  transfers. You can manage the list in the Investors section
                  after deployment.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Go to Investor List
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Transfer Fees */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Transfer fees
              <Switch checked={fees} onCheckedChange={setFees} />
            </CardTitle>
            <CardDescription>
              If enabled, a % fee will be taken from the transfer and sent to a
              collector’s wallet. This collector’s wallet needs to belong to a
              qualified investor. For qualifying an investor you can do it in
              the Investor list section once the token is deployed.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
