"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Coins,
  Users,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "token",
      label: "Token",
      icon: Coins,
      subItems: [
        { label: "Token actions", href: "/dashboard/token/actions" },
        { label: "Agents", href: "/dashboard/token/agents" },
        { label: "Transactions", href: "/dashboard/token/transactions" },
        { label: "Requests", href: "/dashboard/token/requests" },
        { label: "Documents", href: "/dashboard/token/documents" },
        { label: "Settings", href: "/dashboard/token/settings" },
      ],
    },
    {
      id: "investors",
      label: "Investors",
      icon: Users,
      subItems: [
        { label: "Investor List", href: "/dashboard/investors/investorsList" },
        { label: "Candidates", href: "/dashboard/investors/candidates" },
        { label: "Position Reports", href: "/dashboard/investors/reports" },
        { label: "Investor Requests", href: "/dashboard/investors/requests" },
      ],
    },
    {
      id: "primary-market",
      label: "Primary Market",
      icon: TrendingUp,
      subItems: [
        {
          label: "Subscription Orders",
          href: "/dashboard/primary-market/subscription-orders",
        },
        {
          label: "Redemption Orders",
          href: "/dashboard/primary-market/redemption-orders",
        },
      ],
    },
    {
      id: "secondary-market",
      label: "Secondary Market",
      icon: TrendingDown,
      subItems: [
        {
          label: "Billboard Settings",
          href: "/dashboard/secondary-market/billboard-settings",
        },
        {
          label: "Billboard Offers",
          href: "/dashboard/secondary-market/billboard-offers",
        },
        { label: "CEX", href: "/dashboard/secondary-market/cex" },
      ],
    },
  ];

  useEffect(() => {
    if (pathname.startsWith("/dashboard/token")) setExpandedItem("token");
    else if (pathname.startsWith("/dashboard/investors"))
      setExpandedItem("investors");
    else if (pathname.startsWith("/dashboard/primary-market"))
      setExpandedItem("primary-market");
    else if (pathname.startsWith("/dashboard/secondary-market"))
      setExpandedItem("secondary-market");
    else setExpandedItem(null);
  }, [pathname]);

  const isTopLevelActive = (item) => {
    if (item.href && pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => pathname.startsWith(sub.href));
    }
    return false;
  };

  const isSubItemActive = (href) => pathname.startsWith(href);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="relative">
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-50 w-64 ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* <nav className="flex p-2">
              <div className="flex items-center justify-center gap-6 p-3">
                <Image
                  src="/logo2.png"
                  alt="logo"
                  width={120}
                  height={100}
                  className="object-contain justify-center"
                />
              </div>
            </nav> */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-semibold text-gray-900">USP</span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {/* Top-level button */}
                  <button
                    onClick={() => {
                      if (item.href) router.push(item.href);
                      if (item.subItems) {
                        setExpandedItem(
                          expandedItem === item.id ? null : item.id
                        );
                      }
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                      isTopLevelActive(item)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.subItems && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedItem === item.id ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Sub-items */}
                  {item.subItems && expandedItem === item.id && (
                    <div className="ml-4 pl-4 border-l-2 border-gray-200 mt-1 mb-2">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.href}
                          onClick={() => {
                            router.push(sub.href);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
                            isSubItemActive(sub.href)
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>


        <button
          onClick={() => setIsOpen(false)}
          className={`lg:hidden fixed top-6 z-50 bg-white border border-gray-200 rounded-r-lg shadow-lg p-2 hover:bg-gray-50 transition-all duration-300 ${
            isOpen ? "left-64" : "left-0 -translate-x-full"
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </>
  );
}