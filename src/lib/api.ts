// Mock API for demo purposes
import { 
  mockProjects, 
  mockEvents, 
  mockBenchmarks, 
  mockUsers, 
  mockEmails, 
  mockAnalytics, 
  mockSessions,
  mockCampaigns 
} from "./mockData";

export interface ApiError {
  message: string;
  status: number;
}

class MockApiClient {
  async get(endpoint: string): Promise<any> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return mock data based on endpoint
    if (endpoint.includes('/api/projects')) {
      if (endpoint.includes('/projects/')) {
        return mockProjects[0];
      }
      return { projects: mockProjects };
    }
    
    if (endpoint.includes('/api/events')) {
      return { events: mockEvents };
    }
    
    if (endpoint.includes('/api/benchmarks')) {
      return { benchmarkUsers: mockBenchmarks, users: mockUsers };
    }
    
    if (endpoint.includes('/api/users')) {
      if (endpoint.includes('/sessions')) {
        return { sessions: mockSessions };
      }
      return { users: mockUsers };
    }
    
    if (endpoint.includes('/api/emails')) {
      return { emails: mockEmails, stats: { pending: 2, sent: 45, scheduled: 12 } };
    }
    
    if (endpoint.includes('/api/analytics')) {
      return mockAnalytics;
    }
    
    if (endpoint.includes('/api/campaigns')) {
      return { campaigns: mockCampaigns };
    }

    if (endpoint.includes('/api/projects/') && endpoint.includes('/team')) {
      return [
        { id: '1', email: 'demo@example.com', role: 'admin', status: 'active' },
        { id: '2', email: 'member@example.com', role: 'member', status: 'active' }
      ];
    }

    if (endpoint.includes('/api/projects/') && endpoint.includes('/api-keys')) {
      return [
        { id: '1', name: 'Production Key', key: 'pk_demo_***********', createdAt: '2024-01-15' }
      ];
    }

    if (endpoint.includes('/api/settings/team')) {
      return [{ email: 'demo@example.com' }];
    }

    if (endpoint.includes('/api/settings/apikey')) {
      return { fullKey: 'demo_key_123456789', name: 'Demo API Key' };
    }

    if (endpoint.includes('/api/settings')) {
      return { brevo_api_key: null, from_email: null, from_name: null };
    }
    
    return {};
  }

  async post(endpoint: string, data?: unknown): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Handle specific post endpoints
    if (endpoint.includes('/api/projects')) {
      return { projectId: mockProjects[0].id, apiKey: mockProjects[0].apiKey, name: mockProjects[0].name, website: mockProjects[0].website };
    }
    
    return { success: true, data };
  }

  async put(endpoint: string, data?: unknown): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data };
  }

  async patch(endpoint: string, data?: unknown): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data };
  }

  async delete(endpoint: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
}

export const useApiClient = () => {
  return new MockApiClient();
};
