import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save, Edit, BrainCircuit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import ProductAnalysis from './ProductAnalysis';
import { AIService, ProductAnalysis as ProductAnalysisType } from '@/services/aiService';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
}

const Product = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<ProductRow[]>([
    { id: '1', name: 'Enterprise API Gateway', category: 'Security', price: '$599', stock: '∞', status: 'Active' },
    { id: '2', name: 'Identity Provider', category: 'Authentication', price: '$399', stock: '∞', status: 'Active' },
    { id: '3', name: 'OIDC Connector', category: 'Integration', price: '$299', stock: '∞', status: 'Active' },
    { id: '4', name: 'OAuth Server', category: 'Security', price: '$499', stock: '∞', status: 'Active' },
  ]);

  const [editRow, setEditRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<ProductRow | null>(null);
  const [newRow, setNewRow] = useState<ProductRow>({
    id: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    status: '',
  });
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [productAnalysis, setProductAnalysis] = useState<ProductAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisPerformed, setAnalysisPerformed] = useState<boolean>(false);

  const handleAddRow = () => {
    if (newRow.name && newRow.category && newRow.price) {
      const newId = (rows.length + 1).toString();
      setRows([...rows, { ...newRow, id: newId, stock: newRow.stock || '∞', status: newRow.status || 'Active' }]);
      setNewRow({
        id: '',
        name: '',
        category: '',
        price: '',
        stock: '',
        status: '',
      });
    }
  };

  const handleDeleteRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
    if (selectedProduct === id) {
      setSelectedProduct(null);
      setProductAnalysis(null);
    }
  };

  const handleEditStart = (row: ProductRow) => {
    setEditRow(row.id);
    setEditData({ ...row });
  };

  const handleEditCancel = () => {
    setEditRow(null);
    setEditData(null);
  };

  const handleEditSave = () => {
    if (editData && editRow) {
      setRows(rows.map((row) => (row.id === editRow ? editData : row)));
      setEditRow(null);
      setEditData(null);
      
      if (selectedProduct === editRow) {
        performAnalysis(editData);
      }
    }
  };

  const handleEditChange = (key: keyof ProductRow, value: string) => {
    if (editData) {
      setEditData({ ...editData, [key]: value });
    }
  };

  const handleNewRowChange = (key: keyof ProductRow, value: string) => {
    setNewRow({ ...newRow, [key]: value });
  };

  const selectProduct = (productId: string) => {
    setSelectedProduct(productId);
    const product = rows.find(row => row.id === productId);
    if (product) {
      performAnalysis(product);
    }
  };

  const performAnalysis = async (product: ProductRow) => {
    setIsAnalyzing(true);
    try {
      const analysis = await AIService.analyzeProduct(parseInt(product.id));
      setProductAnalysis(analysis);
      setAnalysisPerformed(true);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${product.name}`,
      });
    } catch (error) {
      console.error('Error analyzing product:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the product. Please try again later.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeAllProducts = async () => {
    setIsAnalyzing(true);
    try {
      const productIds = rows.map(row => parseInt(row.id));
      const analyses = await AIService.analyzeAllProducts(productIds);
      
      if (analyses.length > 0) {
        setAnalysisPerformed(true);
        toast({
          title: "Bulk Analysis Complete",
          description: `Successfully analyzed ${analyses.length} products`,
        });
        
        if (selectedProduct) {
          const selectedAnalysis = analyses.find(a => a.productId === parseInt(selectedProduct));
          if (selectedAnalysis) {
            setProductAnalysis(selectedAnalysis);
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "No products could be analyzed. Please try again later.",
        });
      }
    } catch (error) {
      console.error('Error analyzing all products:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze products. Please try again later.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="product" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Manage and customize our .NET 8 OIDC integration products to fit your needs.
            </p>
          </div>
          {analysisPerformed && (
            <Alert className="max-w-[900px] bg-green-50 border-green-200">
              <BrainCircuit className="h-4 w-4 text-green-600" />
              <AlertTitle>AI Analysis Active</AlertTitle>
              <AlertDescription>
                Our AI is now analyzing your product data to provide pricing and category recommendations.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border rounded-lg">
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Product Catalog</TabsTrigger>
                <TabsTrigger value="cards">Product Cards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="p-4">
                <div className="flex justify-end mb-4">
                  <Button onClick={analyzeAllProducts} disabled={isAnalyzing} className="flex items-center">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze All Products'}
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow 
                          key={row.id} 
                          className={selectedProduct === row.id ? "bg-blue-50" : ""}
                          onClick={() => !editRow && selectProduct(row.id)}
                        >
                          {editRow === row.id ? (
                            <>
                              <TableCell className="font-medium">
                                <Input 
                                  value={editData?.name} 
                                  onChange={(e) => handleEditChange('name', e.target.value)} 
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={editData?.category} 
                                  onChange={(e) => handleEditChange('category', e.target.value)} 
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={editData?.price} 
                                  onChange={(e) => handleEditChange('price', e.target.value)} 
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={editData?.stock} 
                                  onChange={(e) => handleEditChange('stock', e.target.value)} 
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={editData?.status} 
                                  onChange={(e) => handleEditChange('status', e.target.value)} 
                                />
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" onClick={handleEditCancel}>
                                    Cancel
                                  </Button>
                                  <Button size="sm" onClick={handleEditSave}>
                                    <Save className="h-4 w-4 mr-1" />
                                    Save
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="font-medium">{row.name}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell>{row.price}</TableCell>
                              <TableCell>{row.stock}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditStart(row);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteRow(row.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <Input 
                            placeholder="Product name" 
                            value={newRow.name} 
                            onChange={(e) => handleNewRowChange('name', e.target.value)} 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            placeholder="Category" 
                            value={newRow.category} 
                            onChange={(e) => handleNewRowChange('category', e.target.value)} 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            placeholder="Price" 
                            value={newRow.price} 
                            onChange={(e) => handleNewRowChange('price', e.target.value)} 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            placeholder="Stock" 
                            value={newRow.stock} 
                            onChange={(e) => handleNewRowChange('stock', e.target.value)} 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            placeholder="Status" 
                            value={newRow.status} 
                            onChange={(e) => handleNewRowChange('status', e.target.value)} 
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={handleAddRow}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="cards" className="p-4">
                <div className="flex justify-end mb-4">
                  <Button onClick={analyzeAllProducts} disabled={isAnalyzing} className="flex items-center">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze All Products'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {rows.map((product) => (
                    <div 
                      key={product.id} 
                      className={`border rounded-lg p-4 flex flex-col cursor-pointer ${selectedProduct === product.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => selectProduct(product.id)}
                    >
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                      <div className="mt-2 text-lg font-semibold">{product.price}</div>
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <span className="text-sm">Status: {product.status}</span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(product);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRow(product.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <ProductAnalysis analysis={productAnalysis} isLoading={isAnalyzing} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
