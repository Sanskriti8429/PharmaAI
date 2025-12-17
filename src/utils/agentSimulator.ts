import { Message, AgentResult } from '../types';

export const simulateAgentProcessing = async (
  query: string,
  onMessage: (message: Message) => void
): Promise<AgentResult[]> => {
  const queryLower = query.toLowerCase();

  const relevantAgents = determineRelevantAgents(queryLower);

  onMessage({
    id: Date.now().toString(),
    type: 'system',
    content: `Master Agent analyzing query and delegating to ${relevantAgents.length} specialized agents...`,
    timestamp: new Date()
  });

  await delay(800);

  const results: AgentResult[] = [];

  for (const agent of relevantAgents) {
    onMessage({
      id: Date.now().toString() + Math.random(),
      type: 'agent',
      content: `${agent.name} is processing your request...`,
      timestamp: new Date(),
      agentName: agent.name
    });

    await delay(1200);

    const result = generateAgentResult(agent.id);
    results.push(result);

    onMessage({
      id: Date.now().toString() + Math.random(),
      type: 'agent',
      content: agent.successMessage,
      timestamp: new Date(),
      agentName: agent.name,
      data: result.data
    });

    await delay(600);
  }

  return results;
};

const determineRelevantAgents = (query: string) => {
  const agents = [];

  if (query.includes('market') || query.includes('competition') || query.includes('sales') || query.includes('trend')) {
    agents.push({
      id: 'iqvia',
      name: 'IQVIA Insights Agent',
      successMessage: 'Market analysis complete. Found relevant therapeutic areas and competitive dynamics.'
    });
  }

  if (query.includes('trial') || query.includes('clinical') || query.includes('study') || query.includes('phase')) {
    agents.push({
      id: 'clinical',
      name: 'Clinical Trials Agent',
      successMessage: 'Clinical trial landscape mapped. Identified active trials and pipeline opportunities.'
    });
  }

  if (query.includes('patent') || query.includes('ip') || query.includes('expir') || query.includes('fto')) {
    agents.push({
      id: 'patent',
      name: 'Patent Landscape Agent',
      successMessage: 'Patent analysis complete. FTO assessment and opportunity windows identified.'
    });
  }

  if (query.includes('import') || query.includes('export') || query.includes('trade') || query.includes('api')) {
    agents.push({
      id: 'exim',
      name: 'EXIM Trends Agent',
      successMessage: 'Trade data analyzed. Import-export trends and sourcing insights compiled.'
    });
  }

  if (query.includes('research') || query.includes('publication') || query.includes('study') || query.includes('evidence')) {
    agents.push({
      id: 'web',
      name: 'Web Intelligence Agent',
      successMessage: 'Literature review complete. Scientific evidence and guidelines synthesized.'
    });
  }

  if (agents.length === 0) {
    agents.push(
      {
        id: 'iqvia',
        name: 'IQVIA Insights Agent',
        successMessage: 'Market analysis complete.'
      },
      {
        id: 'clinical',
        name: 'Clinical Trials Agent',
        successMessage: 'Clinical trial data retrieved.'
      },
      {
        id: 'patent',
        name: 'Patent Landscape Agent',
        successMessage: 'Patent landscape analyzed.'
      }
    );
  }

  return agents;
};

const generateAgentResult = (agentId: string): AgentResult => {
  const baseTime = 800 + Math.random() * 1500;

  switch (agentId) {
    case 'iqvia':
      return {
        agentId,
        agentName: 'IQVIA Insights Agent',
        processingTime: baseTime,
        data: {
          marketSize: `$${(Math.random() * 5 + 1).toFixed(1)}B`,
          growthRate: `${(Math.random() * 15 + 5).toFixed(1)}% CAGR`,
          competitors: Math.floor(Math.random() * 30 + 10),
          marketShare: {
            top3: ['Company A (18%)', 'Company B (15%)', 'Company C (12%)']
          },
          trends: ['Increasing demand in emerging markets', 'Shift towards combination therapies', 'Growing preference for once-daily formulations']
        }
      };

    case 'clinical':
      return {
        agentId,
        agentName: 'Clinical Trials Agent',
        processingTime: baseTime,
        data: {
          activeTrials: Math.floor(Math.random() * 50 + 10),
          phaseDistribution: {
            'Phase I': Math.floor(Math.random() * 10 + 2),
            'Phase II': Math.floor(Math.random() * 15 + 5),
            'Phase III': Math.floor(Math.random() * 12 + 3),
            'Phase IV': Math.floor(Math.random() * 8 + 1)
          },
          topSponsors: ['Pharma Corp A', 'Research Institute B', 'Biotech Company C'],
          keyIndications: ['Primary indication', 'Secondary indication', 'Exploratory use'],
          unmetNeeds: ['Pediatric formulations', 'Long-acting versions', 'Improved safety profile']
        }
      };

    case 'patent':
      return {
        agentId,
        agentName: 'Patent Landscape Agent',
        processingTime: baseTime,
        data: {
          activePatents: Math.floor(Math.random() * 20 + 5),
          expiringWithin2Years: Math.floor(Math.random() * 8 + 2),
          ftoStatus: Math.random() > 0.5 ? 'Clear' : 'Requires navigation',
          keyPatentHolders: ['Big Pharma A', 'Research Corp B', 'Generic Co C'],
          opportunityWindow: `${Math.floor(Math.random() * 24 + 12)} months`,
          filingTrends: 'Increasing activity in novel formulations and combinations'
        }
      };

    case 'exim':
      return {
        agentId,
        agentName: 'EXIM Trends Agent',
        processingTime: baseTime,
        data: {
          importVolume: `${(Math.random() * 500 + 100).toFixed(0)} MT`,
          exportVolume: `${(Math.random() * 300 + 50).toFixed(0)} MT`,
          topImportCountries: ['China (45%)', 'India (28%)', 'EU (18%)'],
          topExportDestinations: ['USA (35%)', 'EU (30%)', 'LATAM (20%)'],
          priceTrajectory: Math.random() > 0.5 ? 'Declining' : 'Stable',
          supplyRisk: Math.random() > 0.7 ? 'High' : 'Low'
        }
      };

    case 'web':
      return {
        agentId,
        agentName: 'Web Intelligence Agent',
        processingTime: baseTime,
        data: {
          publicationsFound: Math.floor(Math.random() * 200 + 50),
          recentGuidelines: ['WHO Treatment Guidelines 2024', 'FDA Safety Updates', 'EMA Regulatory Changes'],
          keyFindings: ['Strong efficacy data in recent meta-analyses', 'Favorable safety profile confirmed', 'Growing real-world evidence'],
          clinicalEvidence: 'Level A (Strong recommendation)',
          expertOpinions: ['Leading researchers support expanded use', 'Emerging consensus on optimal dosing']
        }
      };

    default:
      return {
        agentId,
        agentName: 'Agent',
        processingTime: baseTime,
        data: { status: 'Data retrieved successfully' }
      };
  }
};

export const generateFinalSummary = (results: AgentResult[]): string => {
  const insights: string[] = [];

  results.forEach(result => {
    switch (result.agentId) {
      case 'iqvia':
        insights.push(`Market analysis reveals a ${result.data.marketSize} opportunity growing at ${result.data.growthRate}, with ${result.data.competitors} active competitors.`);
        break;
      case 'clinical':
        insights.push(`Clinical landscape shows ${result.data.activeTrials} active trials, indicating robust research activity and validation of therapeutic approach.`);
        break;
      case 'patent':
        insights.push(`Patent analysis indicates ${result.data.ftoStatus} freedom-to-operate status with ${result.data.expiringWithin2Years} key patents expiring within 2 years.`);
        break;
      case 'exim':
        insights.push(`Trade data shows ${result.data.importVolume} import volume with ${result.data.priceTrajectory.toLowerCase()} price trends, suggesting ${result.data.supplyRisk.toLowerCase()} supply risk.`);
        break;
      case 'web':
        insights.push(`Literature review identified ${result.data.publicationsFound} relevant publications with ${result.data.clinicalEvidence} evidence supporting the approach.`);
        break;
    }
  });

  return `Based on comprehensive multi-source analysis:\n\n${insights.join('\n\n')}\n\nRecommendation: The opportunity presents a favorable risk-reward profile for portfolio development consideration. Strategic factors including market dynamics, competitive intensity, regulatory pathway, and intellectual property landscape have been evaluated.`;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
