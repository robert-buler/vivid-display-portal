
import React, { useState } from 'react';
import { AIService } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';

const ApiKeySettings = () => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      AIService.setApiKey(apiKey.trim());
      setOpen(false);
      setApiKey('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Enter your OpenAI API key to enable AI-powered product analysis.
            The key will be saved in your browser for this session only.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveApiKey}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
