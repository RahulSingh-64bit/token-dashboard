import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Coins, 
  Users, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  // Sidebar.jsx
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'token', 
    label: 'Token', 
    icon: Coins,
    subItems: ['Token actions', 'Agents', 'Transactions', 'Requests', 'Documents']
  },
  { 
    id: 'investors', 
    label: 'Investors', 
    icon: Users,
    subItems: ['Investor List', 'Candidates', 'Position Reports', 'Investor Requests']
  },
  { id: 'primary-market', label: 'Primary Market', icon: TrendingUp },
  { id: 'secondary-market', label: 'Secondary Market', icon: TrendingDown }
];

  const [expandedItem, setExpandedItem] = useState('token');

  return (
    <>
      {/* Mobile Overlay */}
     {isOpen && (
  <div
    className="fixed inset-0 bg-gray-500/20 backdrop-blur-xs z-40 lg:hidden transition-colors"
    onClick={() => setIsOpen(false)}
  />
)}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
        transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-semibold text-gray-900">USP</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.subItems) {
                      setExpandedItem(expandedItem === item.id ? null : item.id);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg mb-1
                    transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.subItems && (
                    <ChevronRight className={`
                      w-4 h-4 transition-transform
                      ${expandedItem === item.id ? 'rotate-90' : ''}
                    `} />
                  )}
                </button>

                {/* Sub Items */}
                {item.subItems && expandedItem === item.id && (
                  <div className="ml-4 pl-4 border-l-2 border-gray-200 mt-1 mb-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem}
                        onClick={() => {
                          setActiveTab(subItem.toLowerCase().replace(' ', '-'));
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg mb-1 text-sm
                          transition-colors
                          ${activeTab === subItem.toLowerCase().replace(' ', '-')
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;