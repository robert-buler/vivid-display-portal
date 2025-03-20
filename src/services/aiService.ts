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
  private static API_URL = "https://api.openai.com/v1/chat/completions";
  private static MODEL = "gpt-4o-mini";
  
  private static getApiKey(): string | null {
    if (import.meta.env.VITE_OPENAI_API_KEY) {
      return import.meta.env.VITE_OPENAI_API_KEY;
    }
    
    return localStorage.getItem('openai_api_key');
  }
  
  static setApiKey(key: string): void {
    localStorage.setItem('openai_api_key', key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session",
    });
  }

  static async analyzeProducts(products: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    stock: string;
    status: string;
  }>): Promise<ProductAnalysis[]> {
    toast({
      title: "Analyzing products",
      description: `Processing ${products.length} products with AI`,
    });

    const batchSize = 5;
    const results: ProductAnalysis[] = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchPromises = batch.map(product => this.analyzeProduct(product));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  private static async analyzeProduct(product: {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: string;
    status: string;
  }): Promise<ProductAnalysis> {
    try {
      let apiKey = this.getApiKey();
      
      if (!apiKey) {
        apiKey = prompt("Please enter your OpenAI API key (it will be saved for this session):", "");
        
        if (apiKey) {
          this.setApiKey(apiKey);
        } else {
          throw new Error("API key is required to use real AI analysis");
        }
      }

      const systemPrompt = `
        You are a product pricing analyst specialized in software products. 
        Analyze the following product details and provide:
        1. A concise recommendation for pricing or marketing strategy (1-2 sentences max)
        2. A confidence score between 0.0 and 1.0 for your recommendation
        
        Format your response as a valid JSON object with exactly these two fields:
        {
          "recommendation": "your recommendation text here",
          "confidenceScore": 0.XX
        }
      `;

      const numericPrice = parseFloat(product.price.replace('$', ''));
      
      const userPrompt = `
        Product: ${product.name}
        Category: ${product.category}
        Price: ${product.price} (numeric: ${numericPrice})
        Status: ${product.status}
        
        Based on this information, what pricing or marketing recommendation would you make?
        Remember to only return a valid JSON object with the recommendation and confidenceScore fields.
      `;

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("Unexpected API response format");
      }

      let aiResult;
      try {
        aiResult = JSON.parse(data.choices[0].message.content);
      } catch (e) {
        console.error("Failed to parse AI response:", data.choices[0].message.content);
        const recommendationMatch = data.choices[0].message.content.match(/"recommendation"\s*:\s*"([^"]*)"/);
        const scoreMatch = data.choices[0].message.content.match(/"confidenceScore"\s*:\s*([0-9.]*)/);
        
        aiResult = {
          recommendation: recommendationMatch ? recommendationMatch[1] : "Unable to generate recommendation",
          confidenceScore: scoreMatch ? parseFloat(scoreMatch[1]) : 0.7
        };
      }

      return {
        ...product,
        recommendation: aiResult.recommendation || "No recommendation provided",
        confidenceScore: typeof aiResult.confidenceScore === 'number' ? 
          Math.min(Math.max(aiResult.confidenceScore, 0), 1) : 0.7
      };
    } catch (error) {
      console.error("Error during product analysis:", error);
      
      return {
        ...product,
        recommendation: "Error analyzing product. Please try again later.",
        confidenceScore: 0.5
      };
    }
  }
}
