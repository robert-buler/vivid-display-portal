
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
        throw new Error(`Error analyzing product: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to analyze product:', error);
      throw error;
    }
  }

  static async analyzeAllProducts(productIds: number[]): Promise<ProductAnalysis[]> {
    try {
      const analyses = await Promise.all(
        productIds.map(id => this.analyzeProduct(id))
      );
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
