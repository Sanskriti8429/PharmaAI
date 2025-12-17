import { Clock, CheckCircle, XCircle, Loader, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

const QueryHistory = () => {
  const { queries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueries = queries.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'processing':
        return <Loader size={18} className="text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Query History</h1>
        <p className="text-slate-600">Review and analyze past research queries</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredQueries.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
            <Clock size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {searchTerm ? 'No queries found' : 'No queries yet'}
          </h3>
          <p className="text-slate-600">
            {searchTerm ? 'Try adjusting your search terms' : 'Start a new query to see your history here'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map(query => (
            <div
              key={query.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(query.status)}
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium mb-1">{query.text}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTimestamp(query.timestamp)}
                      </span>
                      {query.agentsInvolved.length > 0 && (
                        <span>{query.agentsInvolved.length} agents involved</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                  {query.status}
                </span>
              </div>

              {query.response && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-700 line-clamp-3">{query.response.summary}</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View full report →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryHistory;
