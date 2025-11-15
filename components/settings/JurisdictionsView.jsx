import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Globe } from "lucide-react";

export const JurisdictionsView = () => {
  const [allCountriesChecked, setAllCountriesChecked] = useState(true);
  const [europeChecked, setEuropeChecked] = useState(true);
  const [asiaChecked, setAsiaChecked] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Jurisdictions</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Jurisdictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Globe className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-sm text-muted-foreground">Select the countries that you want to allow the circulation of the token</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Allowed countries: <span className="text-primary">184</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-destructive flex items-center justify-center text-white text-xs">✕</span>
              <span className="text-sm font-medium">Denied countries: <span className="text-destructive">0</span></span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={allCountriesChecked} onChange={(e) => setAllCountriesChecked(e.target.checked)} className="w-4 h-4" />
              <Label className="font-semibold">All</Label>
            </div>
            
            <div className="relative">
              <Input placeholder="Search countries" className="pl-10" />
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Europe Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={europeChecked} onChange={(e) => setEuropeChecked(e.target.checked)} className="w-4 h-4" />
                <Label className="font-semibold">Europe</Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pl-7">
                {["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"].map(country => (
                  <div key={country} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <Label className="text-sm font-normal">{country}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Asia Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={asiaChecked} onChange={(e) => setAsiaChecked(e.target.checked)} className="w-4 h-4" />
                <Label className="font-semibold">Asia</Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pl-7">
                {["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "East Timor", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"].map(country => (
                  <div key={country} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <Label className="text-sm font-normal">{country}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
