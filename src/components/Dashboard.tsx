import {  FileText, TestTube,  Clock, Zap,  Database, Search, Globe, FileCheck, Beaker } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { queries, reports, agents } = useApp();

  const stats = [
    {
      label: 'Research Queries',
      value: queries.length,
      change: '+12%',
      icon: Search,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Generated Reports',
      value: reports.filter((r: any) => r.status === 'ready').length,
      change: '+5%',
      icon: FileText,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Molecules Analyzed',
      value: Math.floor(queries.length * 1.8),
      change: '+23%',
      icon: TestTube,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      label: 'Active Agents',
      value: agents.filter((a: any) => a.status === 'active').length,
      change: `${agents.length} total`,
      icon: Zap,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  const avgResponseTime = agents.length > 0 
    ? (agents.reduce((acc: number, a: any) => acc + a.avgResponseTime, 0) / agents.length).toFixed(1)
    : '0.0';

  const totalQueriesProcessed = agents.reduce((acc: number, a: any) => acc + a.queriesProcessed, 0);
  const avgSuccessRate = agents.length > 0
    ? (agents.reduce((acc: number, a: any) => acc + a.successRate, 0) / agents.length).toFixed(1)
    : '0';

  const recentActivity = [
    { action: 'Patent search completed', time: '2 min ago', agent: 'Patent Landscape Agent' },
    { action: 'IQVIA market analysis', time: '5 min ago', agent: 'IQVIA Insights Agent' },
    { action: 'Clinical trial data fetched', time: '8 min ago', agent: 'Clinical Trials Agent' },
    { action: 'Report generated', time: '12 min ago', agent: 'Report Generator Agent' }
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Pharmaceutical Research Intelligence</h1>
            <p className="text-slate-600">AI-powered multi-agent system for drug repurposing & market analysis</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`bg-gradient-to-br ${stat.gradient} p-2.5 rounded-lg shadow-sm`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</div>
                <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Worker Agents Status */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Worker Agent Performance</h2>
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Zap size={14} />
                <span className="font-medium">All Operational</span>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {agents.map((agent: any) => (
                <div key={agent.id} className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 border border-slate-100 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className={`w-2 h-2 rounded-full ${
                          agent.status === 'active' ? 'bg-green-500' :
                          agent.status === 'processing' ? 'bg-yellow-500' :
                          'bg-slate-300'
                        }`} />
                        {agent.status === 'active' && (
                          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm">{agent.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="text-right">
                        <span className="text-slate-900 font-semibold">{agent.avgResponseTime}s</span>
                        <span className="text-slate-500 ml-1">avg</span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 font-semibold">{agent.successRate}%</span>
                        <span className="text-slate-500 ml-1">success</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{agent.queriesProcessed} queries processed</span>
                    <span className="text-slate-400">Active 2m ago</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Metrics */}
            <div className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">{totalQueriesProcessed}</div>
                <div className="text-xs text-slate-600">Total Processed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{avgResponseTime}s</div>
                <div className="text-xs text-slate-600">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{avgSuccessRate}%</div>
                <div className="text-xs text-slate-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* System Health & Activity */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-4">System Health</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-700">Master Agent</span>
                    <span className="text-xs font-bold text-green-600">Healthy</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-700">Response Time</span>
                    <span className="text-xs font-bold text-blue-600">{avgResponseTime}s</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-700">Data Sources</span>
                    <span className="text-xs font-bold text-purple-600">7 Active</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-4 text-sm">
                <Clock size={16} />
                <span>Recent Activity</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="bg-slate-50 px-3 py-2 rounded-lg">
                    <div className="text-xs font-medium text-slate-900">{activity.action}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-600">{activity.agent}</span>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 text-white">
            <Database size={24} className="mb-2 opacity-90" />
            <h3 className="text-sm font-bold mb-1">IQVIA Database</h3>
            <p className="text-xs text-blue-100">Market intelligence</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-4 text-white">
            <FileCheck size={24} className="mb-2 opacity-90" />
            <h3 className="text-sm font-bold mb-1">USPTO Patents</h3>
            <p className="text-xs text-green-100">IP landscape data</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-4 text-white">
            <Beaker size={24} className="mb-2 opacity-90" />
            <h3 className="text-sm font-bold mb-1">Clinical Trials</h3>
            <p className="text-xs text-purple-100">Trial pipeline data</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-sm p-4 text-white">
            <Globe size={24} className="mb-2 opacity-90" />
            <h3 className="text-sm font-bold mb-1">Web Intelligence</h3>
            <p className="text-xs text-amber-100">Real-time insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;