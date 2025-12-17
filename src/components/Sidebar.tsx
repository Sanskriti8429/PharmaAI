import { LayoutDashboard, Search, History, FileText, Database, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'query', label: 'New Query', icon: Search },
    { id: 'history', label: 'Query History', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'sources', label: 'Data Sources', icon: Database }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
            PA
          </div>
          <div>
            <h1 className="text-xl font-bold">Pharma AI</h1>
            <p className="text-xs text-slate-400">Discovery Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm">
          <Activity size={16} className="text-green-400" />
          <span className="text-slate-300">System Status</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">All agents operational</p>
      </div>
    </div>
  );
};

export default Sidebar;
