import { createContext, useContext, useState, ReactNode } from 'react';
import { Query, Report, Message } from '../types';
import { mockAgents, mockDataSources } from '../data/mockData';

interface AppContextType {
  queries: Query[];
  addQuery: (query: Query) => void;
  updateQuery: (id: string, updates: Partial<Query>) => void;
  reports: Report[];
  addReport: (report: Report) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  agents: typeof mockAgents;
  dataSources: typeof mockDataSources;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');

  const addQuery = (query: Query) => {
    setQueries(prev => [query, ...prev]);
  };

  const updateQuery = (id: string, updates: Partial<Query>) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AppContext.Provider value={{
      queries,
      addQuery,
      updateQuery,
      reports,
      addReport,
      messages,
      addMessage,
      clearMessages,
      currentView,
      setCurrentView,
      agents: mockAgents,
      dataSources: mockDataSources
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
