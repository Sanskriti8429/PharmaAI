import { Database, CheckCircle, XCircle, Clock, RefreshCw, TrendingUp, Activity, Globe, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DataSources = () => {
  const { dataSources } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'disconnected':
        return <XCircle size={18} className="text-red-500" />;
      case 'error':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'disconnected':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    return `${hours}h ago`;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Commercial Database': 'bg-blue-50 text-blue-700 border-blue-200',
      'Public Registry': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Patent Registry': 'bg-amber-50 text-amber-700 border-amber-200',
      'Trade Data': 'bg-green-50 text-green-700 border-green-200',
      'Scientific Literature': 'bg-violet-50 text-violet-700 border-violet-200',
      'Internal Database': 'bg-slate-50 text-slate-700 border-slate-200'
    };
    return colors[type] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Commercial Database':
        return <TrendingUp size={20} className="text-blue-600" />;
      case 'Public Registry':
        return <Globe size={20} className="text-cyan-600" />;
      case 'Patent Registry':
        return <Shield size={20} className="text-amber-600" />;
      case 'Trade Data':
        return <Activity size={20} className="text-green-600" />;
      case 'Scientific Literature':
        return <Database size={20} className="text-violet-600" />;
      default:
        return <Database size={20} className="text-slate-600" />;
    }
  };

  const connectedCount = dataSources.filter(ds => ds.status === 'connected').length;
  const healthPercentage = ((connectedCount / dataSources.length) * 100).toFixed(0);

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Data Sources</h1>
            <p className="text-slate-600">Connected pharmaceutical databases & registries for comprehensive intelligence</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <RefreshCw size={16} />
            Sync All
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600 font-medium">Total Sources</span>
              <div className="p-2 bg-slate-100 rounded-lg">
                <Database size={18} className="text-slate-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{dataSources.length}</div>
            <div className="text-xs text-slate-500 mt-1">Active connections</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600 font-medium">Connected</span>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle size={18} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">{connectedCount}</div>
            <div className="text-xs text-slate-500 mt-1">Ready for queries</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600 font-medium">System Health</span>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity size={18} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{healthPercentage}%</div>
            <div className="text-xs text-slate-500 mt-1">Overall uptime</div>
          </div>
        </div>

        {/* Data Sources List */}
        <div className="space-y-3">
          {dataSources.map(source => (
            <div
              key={source.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-slate-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl">
                  {getTypeIcon(source.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">{source.name}</h3>
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md border ${getTypeColor(source.type)}`}>
                        {source.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {getStatusIcon(source.status)}
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${getStatusColor(source.status)}`}>
                        {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{source.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock size={14} />
                      <span className="font-medium">Last sync: <span className="text-slate-700">{formatLastSync(source.lastSync)}</span></span>
                    </div>

                    <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 hover:gap-2 transition-all">
                      <RefreshCw size={14} />
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Database size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-1">Multi-Agent Data Integration</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                The Master Agent orchestrates queries across all connected sources, enabling Worker Agents to fetch market intelligence, clinical trial data, patent landscapes, and trade analytics in real-time. All connections are encrypted and synchronized for optimal performance.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-blue-200">
            <div className="bg-white bg-opacity-60 rounded-lg p-3">
              <div className="font-bold text-blue-900 text-xs mb-1">Market Intelligence</div>
              <div className="text-xs text-blue-700">IQVIA, IMS Health</div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-3">
              <div className="font-bold text-blue-900 text-xs mb-1">Clinical Research</div>
              <div className="text-xs text-blue-700">ClinicalTrials.gov</div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-3">
              <div className="font-bold text-blue-900 text-xs mb-1">Patent Data</div>
              <div className="text-xs text-blue-700">USPTO, EPO</div>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-3">
              <div className="font-bold text-blue-900 text-xs mb-1">Trade Analytics</div>
              <div className="text-xs text-blue-700">EXIM Portal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;