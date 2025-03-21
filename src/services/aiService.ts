
import { getApiBaseUrl } from '@/utils/config';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface ProductAnalysis {
  productId: number;
  name: string;
  category: string;
  price: string;
  recommendation: string;
  confidenceScore: number;
}

export class AIService {
  private static apiKey: string | null = null;

  static async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/products`);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  static async analyzeProduct(productId: number): Promise<ProductAnalysis> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/products/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error analyzing product: ${response.statusText} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to analyze product:', error);
      throw error;
    }
  }

  static async analyzeAllProducts(productIds: number[]): Promise<ProductAnalysis[]> {
    try {
      // Use Promise.allSettled instead of Promise.all to prevent one failure from stopping all requests
      const results = await Promise.allSettled(
        productIds.map(id => this.analyzeProduct(id))
      );
      
      // Filter out the fulfilled promises and get their values
      const analyses = results
        .filter((result): result is PromiseFulfilledResult<ProductAnalysis> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);
      
      // Log any rejected promises
      results
        .filter(result => result.status === 'rejected')
        .forEach((result: PromiseRejectedResult) => {
          console.warn('Analysis failed for a product:', result.reason);
        });
      
      return analyses;
    } catch (error) {
      console.error('Failed to analyze all products:', error);
      throw error;
    }
  }

  static setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }
}
