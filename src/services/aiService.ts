
import { toast } from "@/components/ui/use-toast";

export interface ProductAnalysis {
  id: string;
  name: string;
  category: string;
  price: string;
  status: string;
  recommendation: string;
  confidenceScore: number;
}

export class AIService {
  /**
   * Analyzes products based on their category and price 
   * and provides recommendations using a RAG-like approach
   */
  static async analyzeProducts(products: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    stock: string;
    status: string;
  }>): Promise<ProductAnalysis[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show toast to indicate analysis is happening
    toast({
      title: "Analyzing products",
      description: `Processing ${products.length} products with AI`,
    });
    
    // Process each product to generate analysis
    return products.map(product => {
      // Extract numeric price (remove $ and convert to number)
      const numericPrice = parseFloat(product.price.replace('$', ''));
      
      // Determine price range category
      let priceCategory: 'low' | 'medium' | 'high';
      if (numericPrice < 300) {
        priceCategory = 'low';
      } else if (numericPrice < 500) {
        priceCategory = 'medium';
      } else {
        priceCategory = 'high';
      }
      
      // Generate recommendation based on category and price
      let recommendation = '';
      let confidenceScore = 0;
      
      // Security category logic
      if (product.category === 'Security') {
        if (priceCategory === 'high') {
          recommendation = 'Optimal pricing for enterprise security solutions';
          confidenceScore = 0.92;
        } else if (priceCategory === 'medium') {
          recommendation = 'Consider bundling with additional features to increase value perception';
          confidenceScore = 0.85;
        } else {
          recommendation = 'Price appears below market average, potential for upselling';
          confidenceScore = 0.78;
        }
      } 
      // Authentication category logic
      else if (product.category === 'Authentication') {
        if (priceCategory === 'high') {
          recommendation = 'Premium pricing justified for advanced auth features';
          confidenceScore = 0.89;
        } else if (priceCategory === 'medium') {
          recommendation = 'Well positioned in market, highlight security compliance';
          confidenceScore = 0.91;
        } else {
          recommendation = 'Consider promoting as entry-level solution with upgrade path';
          confidenceScore = 0.82;
        }
      }
      // Integration category logic
      else if (product.category === 'Integration') {
        if (priceCategory === 'high') {
          recommendation = 'High price justified if it offers extensive compatibility';
          confidenceScore = 0.87;
        } else if (priceCategory === 'medium') {
          recommendation = 'Competitive pricing, emphasize ease of implementation';
          confidenceScore = 0.88;
        } else {
          recommendation = 'Good entry point for customers with simple integration needs';
          confidenceScore = 0.84;
        }
      }
      // Default logic for other categories
      else {
        recommendation = 'Consider market analysis to optimize product positioning';
        confidenceScore = 0.70;
      }
      
      return {
        ...product,
        recommendation,
        confidenceScore
      };
    });
  }
}
