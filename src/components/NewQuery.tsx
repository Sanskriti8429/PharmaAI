import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Sparkles, Upload, TrendingUp, TestTube } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { simulateAgentProcessing, generateFinalSummary } from '../utils/agentSimulator';
import { Message } from '../types';
import { sampleQueries } from '../data/mockData';

const NewQuery = () => {
  const { addQuery, addReport, messages, addMessage, clearMessages, updateQuery } = useApp();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim() || isProcessing) return;

    const queryId = Date.now().toString();
    const query = {
      id: queryId,
      text,
      timestamp: new Date(),
      status: 'processing' as const,
      agentsInvolved: []
    };

    addQuery(query);
    clearMessages();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };
    addMessage(userMessage);

    setInput('');
    setIsProcessing(true);

    try {
      const results = await simulateAgentProcessing(text, addMessage);

      const summary = generateFinalSummary(results);

      const summaryMessage: Message = {
        id: Date.now().toString(),
        type: 'agent',
        content: summary,
        timestamp: new Date(),
        agentName: 'Master Agent',
        data: { results }
      };
      addMessage(summaryMessage);

      updateQuery(queryId, {
        status: 'completed',
        response: {
          summary,
          data: results
        }
      });

      const report = {
        id: `report-${queryId}`,
        title: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
        generatedAt: new Date(),
        queryId,
        summary,
        downloadUrl: '#',
        status: 'ready' as const
      };
      addReport(report);

    } catch (error) {
      console.error('Query processing error:', error);
      updateQuery(queryId, { status: 'failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const fileMessage: Message = {
        id: Date.now().toString(),
        type: 'system',
        content: `File uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        timestamp: new Date()
      };
      addMessage(fileMessage);
    }
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'user') {
      return (
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-6 py-3 max-w-2xl">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      );
    }

    if (message.type === 'system') {
      return (
        <div className="flex justify-center">
          <div className="bg-slate-100 text-slate-600 rounded-lg px-4 py-2 text-xs flex items-center gap-2">
            <Loader size={12} className="animate-spin" />
            {message.content}
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-6 py-4 max-w-3xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-xs font-semibold text-slate-900">{message.agentName}</span>
          </div>
          <p className="text-sm text-slate-700 whitespace-pre-line">{message.content}</p>

          {message.data && message.data.results && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-600 mb-3">Detailed Findings</p>
              <div className="space-y-3">
                {message.data.results.map((result: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-900 mb-2">{result.agentName}</p>
                    <div className="text-xs text-slate-600 space-y-1">
                      {Object.entries(result.data).map(([key, value]: [string, any]) => {
                        if (typeof value === 'object' && !Array.isArray(value)) {
                          return (
                            <div key={key} className="ml-2">
                              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                              <div className="ml-2">
                                {Object.entries(value).map(([k, v]: [string, any]) => (
                                  <div key={k}>• {k}: {String(v)}</div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={key}>
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                            <span>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">New Research Query</h1>
        <p className="text-slate-600">Ask the Master Agent to analyze pharmaceutical opportunities</p>
      </div>

      {messages.length === 0 ? (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Sparkles size={32} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">How can I assist your research today?</h2>
              <p className="text-slate-600">The Master Agent will coordinate specialized agents to provide comprehensive pharmaceutical insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => handleSubmit(sampleQueries[0])}
                className="text-left p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                disabled={isProcessing}
              >
                <TrendingUp size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-slate-900 mb-1">Market Analysis</p>
                <p className="text-xs text-slate-600">{sampleQueries[0]}</p>
              </button>

              <button
                onClick={() => handleSubmit(sampleQueries[1])}
                className="text-left p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                disabled={isProcessing}
              >
                <TestTube size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-slate-900 mb-1">Repurposing Opportunity</p>
                <p className="text-xs text-slate-600">{sampleQueries[1]}</p>
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Example Queries</h3>
              <div className="space-y-2">
                {sampleQueries.slice(2, 6).map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(query)}
                    className="w-full text-left text-sm text-slate-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-lg transition-colors"
                    disabled={isProcessing}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map(message => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <div className="bg-white border-t border-slate-200 p-6">
        <div className="max-w-4xl mx-auto">
          {uploadedFile && (
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
              <Upload size={14} />
              <span>{uploadedFile.name}</span>
              <button
                onClick={() => setUploadedFile(null)}
                className="ml-auto text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <label className="flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors">
              <Upload size={20} className="text-slate-600" />
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>

            <div className="flex-1 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Describe your research query or ask about pharmaceutical opportunities..."
                className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isProcessing}
              />

              <button
                onClick={() => handleSubmit()}
                disabled={!input.trim() || isProcessing}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
              >
                {isProcessing ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuery;
