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
  async get<T>(endpoint: string): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return mock data based on endpoint
    if (endpoint.includes('/api/projects')) {
      if (endpoint.includes('/projects/')) {
        return mockProjects[0] as T;
      }
      return { projects: mockProjects } as T;
    }
    
    if (endpoint.includes('/api/events')) {
      return { events: mockEvents } as T;
    }
    
    if (endpoint.includes('/api/benchmarks')) {
      return { benchmarkUsers: mockBenchmarks } as T;
    }
    
    if (endpoint.includes('/api/users')) {
      if (endpoint.includes('/sessions')) {
        return { sessions: mockSessions } as T;
      }
      return { users: mockUsers } as T;
    }
    
    if (endpoint.includes('/api/emails')) {
      return { emails: mockEmails, stats: { pending: 2, sent: 45, scheduled: 12 } } as T;
    }
    
    if (endpoint.includes('/api/analytics')) {
      return mockAnalytics as T;
    }
    
    if (endpoint.includes('/api/campaigns')) {
      return { campaigns: mockCampaigns } as T;
    }

    if (endpoint.includes('/api/settings/team')) {
      return [] as T;
    }

    if (endpoint.includes('/api/settings/apikey')) {
      return { fullKey: 'demo_key_123456789', name: 'Demo API Key' } as T;
    }
    
    return {} as T;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data } as T;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data } as T;
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data } as T;
  }

  async delete<T>(endpoint: string): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true } as T;
  }
}

export const useApiClient = () => {
  return new MockApiClient();
};
