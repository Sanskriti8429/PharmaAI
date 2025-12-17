export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing';
  description: string;
  queriesProcessed: number;
  avgResponseTime: number;
  successRate: number;
}

export interface Query {
  id: string;
  text: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  agentsInvolved: string[];
  response?: QueryResponse;
}

export interface QueryResponse {
  summary: string;
  data: AgentResult[];
  reportUrl?: string;
}

export interface AgentResult {
  agentId: string;
  agentName: string;
  data: any;
  processingTime: number;
}

export interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentName?: string;
  data?: any;
}

export interface Report {
  id: string;
  title: string;
  generatedAt: Date;
  queryId: string;
  summary: string;
  downloadUrl: string;
  status: 'generating' | 'ready';
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  description: string;
}
