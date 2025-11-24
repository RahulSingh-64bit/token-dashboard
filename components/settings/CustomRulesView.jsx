
import { Button } from "@/components/ui/button";

import { Plus, FilePen } from "lucide-react";

export const CustomRulesView = () => {
  return (
    <div className="p-6 md:p-10 lg:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <FilePen className="w-16 h-16 text-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              No Custom Rules Added Yet
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You can add a custom rule by providing a custom compliance smart contract address.
              
            </p>
          </div>

          {/* Add Button */}
          <Button size="lg" className="gap-3 font-medium">
            <Plus className="w-5 h-5" />
            Add Custom Rule
          </Button>
        </div>

       
      </div>
    </div>
  );
};
