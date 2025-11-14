import React from 'react';
import { 
  Coins, 
  Copy, 
  ChevronRight,
  TrendingUp,
  Pause
} from 'lucide-react';
import StatsCard from '../ui/StatsCard';

const DashboardContent = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Token Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
              <Coins className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">USP</h1>
              <p className="text-gray-600">UrbanSpace Properties</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Token actions
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Token Address</p>
            <div className="flex items-center gap-2">
              <code className="text-blue-600 text-sm font-mono break-all">
                0x39eb88946F03B01B8d441fCd8a3E8f42649
              </code>
              <button className="p-1 hover:bg-gray-100 rounded shrink-0">
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Active
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Valuation</p>
              <p className="text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Circulating supply"
          value="130,463.33"
          icon={TrendingUp}
          color="gray"
        />
        <StatsCard
          title="Total unblocked"
          value="130,240.25"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Total blocked"
          value="233.08"
          icon={Pause}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investors by Type */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Investors by type</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="20" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" 
                  strokeDasharray="125.6 251.2" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A78BFA" strokeWidth="20" 
                  strokeDasharray="83.7 251.2" strokeDashoffset="-125.6" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E0E7FF" strokeWidth="20" 
                  strokeDasharray="41.9 251.2" strokeDashoffset="-209.3" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">investors</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span className="text-sm text-gray-700">Natural</span>
              </div>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-sm text-gray-700">Legal</span>
              </div>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-200 rounded-full" />
                <span className="text-sm text-gray-700">Other</span>
              </div>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
          </div>
        </div>

        {/* Investors by Country */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Investors by country of residence</h3>
          <div className="space-y-4">
            {[
              { country: 'Luxembourg', count: 4, width: '100%' },
              { country: 'United Kingdom', count: 1, width: '25%' },
              { country: 'Italy', count: 1, width: '25%' }
            ].map((item) => (
              <div key={item.country}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item.country}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;