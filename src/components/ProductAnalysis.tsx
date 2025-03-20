
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { ProductAnalysis as ProductAnalysisType } from "@/services/aiService";

interface ProductAnalysisProps {
  analysis: ProductAnalysisType | null;
  isLoading: boolean;
}

const ProductAnalysis = ({ analysis, isLoading }: ProductAnalysisProps) => {
  if (isLoading) {
    return (
      <Card className="w-full h-full min-h-[200px] flex items-center justify-center">
        <CardContent className="pt-6 text-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <p className="mt-4 text-gray-500">AI is analyzing product data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="w-full h-full min-h-[200px]">
        <CardHeader>
          <CardTitle className="text-gray-500">AI Analysis</CardTitle>
          <CardDescription>
            Select a product to see AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-32">
          <Info className="h-12 w-12 text-gray-300" />
          <p className="text-gray-400 mt-2">No product selected</p>
        </CardContent>
      </Card>
    );
  }

  // Determine confidence level display
  const confidenceLevel = analysis.confidenceScore >= 0.85 
    ? { label: "High", color: "bg-green-500", icon: <CheckCircle className="h-4 w-4" /> } 
    : analysis.confidenceScore >= 0.75 
      ? { label: "Medium", color: "bg-yellow-500", icon: <Info className="h-4 w-4" /> }
      : { label: "Low", color: "bg-red-500", icon: <AlertCircle className="h-4 w-4" /> };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>AI Analysis</CardTitle>
          <Badge variant="outline" className="ml-2">
            {analysis.category}
          </Badge>
        </div>
        <CardDescription>
          Product: {analysis.name} ({analysis.price})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Recommendation:</h4>
          <p className="text-sm text-gray-700">{analysis.recommendation}</p>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-medium">AI Confidence:</h4>
            <span className="text-sm text-gray-500">
              {Math.round(analysis.confidenceScore * 100)}%
            </span>
          </div>
          <Progress value={analysis.confidenceScore * 100} className={confidenceLevel.color} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-xs text-gray-500">
          {confidenceLevel.icon}
          <span className="ml-1">{confidenceLevel.label} confidence level</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductAnalysis;
