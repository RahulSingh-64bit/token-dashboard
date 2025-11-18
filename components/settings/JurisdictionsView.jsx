import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Globe, Search } from "lucide-react";

const regions = [
  {
    name: "Europe",
    countries: [
      "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
      "Bulgaria", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", "France",
      "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia",
      "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco",
      "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal",
      "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain",
      "Sweden", "Switzerland", "Ukraine", "United Kingdom"
    ]
  },
  {
    name: "Asia",
    countries: [
      "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
      "Brunei", "Cambodia", "China", "Cyprus", "East Timor", "Georgia", "India",
      "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan",
      "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia",
      "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine",
      "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea",
      "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Turkey",
      "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ]
  }
  // Add more regions here later
];

export const JurisdictionsView = () => {
  const [selectedCountries, setSelectedCountries] = useState(() => 
    new Set(regions.flatMap(r => r.countries))
  );
  const [searchQuery, setSearchQuery] = useState("");

  // All countries list (for "All" checkbox logic)
  const allCountries = useMemo(() => 
    regions.flatMap(r => r.countries), 
  []);

  // Filter regions/countries based on search
  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return regions;

    const query = searchQuery.toLowerCase();
    return regions
      .map(region => ({
        ...region,
        countries: region.countries.filter(c => c.toLowerCase().includes(query))
      }))
      .filter(region => region.countries.length > 0);
  }, [searchQuery]);

  const toggleCountry = (country) => {
    setSelectedCountries(prev => {
      const next = new Set(prev);
      if (next.has(country)) next.delete(country);
      else next.add(country);
      return next;
    });
  };

  const toggleRegion = (regionName, checked) => {
    const region = regions.find(r => r.name === regionName);
    if (!region) return;

    setSelectedCountries(prev => {
      const next = new Set(prev);
      region.countries.forEach(c => {
        checked ? next.add(c) : next.delete(c);
      });
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelectedCountries(checked ? new Set(allCountries) : new Set());
  };

  const isRegionFullyChecked = (regionName) => {
    const region = regions.find(r => r.name === regionName);
    if (!region) return false;
    return region.countries.every(c => selectedCountries.has(c));
  };

  const isRegionIndeterminate = (regionName) => {
    const region = regions.find(r => r.name === regionName);
    if (!region) return false;
    const checked = region.countries.filter(c => selectedCountries.has(c)).length;
    return checked > 0 && checked < region.countries.length;
  };

  const allChecked = selectedCountries.size === allCountries.length;
  const allIndeterminate = selectedCountries.size > 0 && selectedCountries.size < allCountries.length;
  const allowedCount = selectedCountries.size;
  const deniedCount = allCountries.length - allowedCount;

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
            <p className="text-sm text-muted-foreground">
              Select the countries where you want to allow token circulation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">
                Allowed countries: <span className="text-primary font-bold">{allowedCount}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-destructive flex items-center justify-center text-white text-xs">X</span>
              <span className="text-sm font-medium">
                Denied countries: <span className="text-destructive font-bold">{deniedCount}</span>
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* All Countries */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allChecked}
                ref={input => input && (input.indeterminate = allIndeterminate)}
                onChange={e => toggleAll(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label className="font-semibold cursor-pointer" onClick={() => toggleAll(!allChecked)}>
                All Countries {allIndeterminate && "(Partially selected)"}
              </Label>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Regions */}
            <div className="space-y-8">
              {filteredRegions.map(region => (
                <div key={region.name} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isRegionFullyChecked(region.name)}
                      ref={input => input && (input.indeterminate = isRegionIndeterminate(region.name))}
                      onChange={e => toggleRegion(region.name, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label className="font-semibold text-lg">
                      {region.name} ({region.countries.length})
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pl-7">
                    {region.countries.map(country => (
                      <div key={country} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCountries.has(country)}
                          onChange={() => toggleCountry(country)}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label className="text-sm font-normal cursor-pointer">
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {searchQuery && filteredRegions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No countries found matching "{searchQuery}"
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};