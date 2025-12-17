import { Agent, DataSource } from '../types';

export const mockAgents: Agent[] = [
  {
    id: 'iqvia',
    name: 'IQVIA Insights Agent',
    status: 'active',
    description: 'Market analysis, sales trends, and competitive intelligence',
    queriesProcessed: 247,
    avgResponseTime: 1.2,
    successRate: 98.5
  },
  {
    id: 'clinical',
    name: 'Clinical Trials Agent',
    status: 'active',
    description: 'Trial pipeline data from ClinicalTrials.gov and WHO ICTRP',
    queriesProcessed: 189,
    avgResponseTime: 0.8,
    successRate: 100
  },
  {
    id: 'patent',
    name: 'Patent Landscape Agent',
    status: 'active',
    description: 'Patent searches, expiry timelines, and FTO analysis',
    queriesProcessed: 156,
    avgResponseTime: 1.5,
    successRate: 96.2
  },
  {
    id: 'exim',
    name: 'EXIM Trends Agent',
    status: 'idle',
    description: 'Export-import data for APIs and formulations',
    queriesProcessed: 98,
    avgResponseTime: 1.1,
    successRate: 99.1
  },
  {
    id: 'web',
    name: 'Web Intelligence Agent',
    status: 'active',
    description: 'Real-time web search for guidelines and publications',
    queriesProcessed: 312,
    avgResponseTime: 0.9,
    successRate: 97.8
  },
  {
    id: 'internal',
    name: 'Internal Knowledge Agent',
    status: 'idle',
    description: 'Internal documents and strategy deck analysis',
    queriesProcessed: 67,
    avgResponseTime: 2.1,
    successRate: 100
  },
  {
    id: 'report',
    name: 'Report Generator Agent',
    status: 'idle',
    description: 'Formats findings into polished reports',
    queriesProcessed: 134,
    avgResponseTime: 3.2,
    successRate: 100
  }
];

export const mockDataSources: DataSource[] = [
  {
    id: 'iqvia-db',
    name: 'IQVIA Market Intelligence',
    type: 'Commercial Database',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 15),
    description: 'Sales data, market trends, and therapy area analytics'
  },
  {
    id: 'clinicaltrials',
    name: 'ClinicalTrials.gov',
    type: 'Public Registry',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 30),
    description: 'Global clinical trial registry and results database'
  },
  {
    id: 'uspto',
    name: 'USPTO Patent Database',
    type: 'Patent Registry',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 45),
    description: 'US patent filings, grants, and expiry information'
  },
  {
    id: 'exim',
    name: 'EXIM Trade Portal',
    type: 'Trade Data',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 60),
    description: 'Import-export data for pharmaceutical APIs and formulations'
  },
  {
    id: 'pubmed',
    name: 'PubMed & Scientific Journals',
    type: 'Scientific Literature',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 20),
    description: 'Medical and pharmaceutical research publications'
  },
  {
    id: 'who',
    name: 'WHO ICTRP',
    type: 'Public Registry',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 90),
    description: 'WHO International Clinical Trials Registry Platform'
  },
  {
    id: 'internal',
    name: 'Internal Document Repository',
    type: 'Internal Database',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 5),
    description: 'Strategy decks, field insights, and internal research'
  }
];

export const sampleQueries = [
  "Find respiratory molecules with low competition but high patient burden in emerging markets",
  "Analyze Metformin's potential for repurposing in oncology indications",
  "Which anti-diabetic drugs have patents expiring in the next 2 years?",
  "Show clinical trial landscape for GLP-1 receptor agonists",
  "Identify opportunities in rare disease repurposing for cardiovascular drugs",
  "Analyze import trends for APIs used in respiratory therapies",
  "Find molecules suitable for extended-release formulations with unmet needs",
  "What are the emerging indications for NSAIDs beyond pain management?",
  "Analyze patent landscape for biologics in autoimmune disorders",
  "Show market opportunity for pediatric formulations of existing molecules"
];

export const mockQueryResponses: Record<string, any> = {
  respiratory: {
    summary: "Analysis identified 3 high-potential respiratory molecules with favorable market dynamics and low competitive intensity in India and Southeast Asia.",
    agents: [
      {
        name: "IQVIA Insights Agent",
        findings: {
          marketSize: "$2.4B (India), $1.8B (Southeast Asia)",
          growthRate: "14.2% CAGR (2023-2028)",
          competitorCount: "12 active players (significantly below category average of 28)",
          topTherapies: ["COPD", "Asthma", "Bronchiectasis"]
        }
      },
      {
        name: "Clinical Trials Agent",
        findings: {
          activeTrials: 8,
          phaseDist: { "Phase 1": 2, "Phase 2": 3, "Phase 3": 3 },
          topSponsors: ["Regional Pharma Corp", "Generic Innovations Ltd"],
          unmetNeeds: "Pediatric formulations, once-daily dosing, combination therapies"
        }
      },
      {
        name: "Patent Landscape Agent",
        findings: {
          expiredPatents: 5,
          ftoStatus: "Clear for 3 molecules",
          opportunityWindow: "18-24 months before major competition",
          keyMolecules: ["Roflumilast", "Tiotropium", "Formoterol"]
        }
      }
    ]
  },
  metformin: {
    summary: "Metformin shows significant potential for oncology repurposing with 45 active clinical trials, strong mechanistic rationale, and favorable safety profile.",
    agents: [
      {
        name: "Web Intelligence Agent",
        findings: {
          publications: 127,
          mechanismsIdentified: ["AMPK activation", "mTOR inhibition", "Anti-inflammatory effects"],
          cancerTypes: ["Breast", "Colorectal", "Prostate", "Pancreatic"],
          evidenceStrength: "Strong (multiple Phase 3 trials)"
        }
      },
      {
        name: "Clinical Trials Agent",
        findings: {
          activeTrials: 45,
          completedTrials: 23,
          successRate: "68% positive outcomes",
          leadingInstitutions: ["MD Anderson", "Mayo Clinic", "Johns Hopkins"],
          stage: "12 trials in Phase 3"
        }
      },
      {
        name: "Patent Landscape Agent",
        findings: {
          compositionPatents: "Expired (2012)",
          methodOfUsePatents: "3 active filings for oncology indications",
          ftoAnalysis: "Moderate - requires navigation around method patents",
          filingOpportunity: "Novel combinations, specific cancer subtypes"
        }
      }
    ]
  }
};
