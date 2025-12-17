import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewQuery from './components/NewQuery';
import QueryHistory from './components/QueryHistory';
import Reports from './components/Reports';
import DataSources from './components/DataSources';

const AppContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'query':
        return <NewQuery />;
      case 'history':
        return <QueryHistory />;
      case 'reports':
        return <Reports />;
      case 'sources':
        return <DataSources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderView()}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
