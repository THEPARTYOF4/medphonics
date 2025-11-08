import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PaperclipIcon, SendIcon } from "lucide-react";

interface AiInputProps {
  onSubmit: (message: string, file?: File) => void;
  isLoading: boolean;
  /** 'fixed' places the input fixed to bottom (default). 'inline' renders it as a normal block for use inside pages. */
  variant?: 'fixed' | 'inline';
}

export function AiInput({ onSubmit, isLoading, variant = 'fixed' }: AiInputProps) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSubmit(message, selectedFile || undefined);
      setMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const containerClass =
    variant === 'fixed'
      ? 'p-4 fixed bottom-4 left-4 right-4 max-w-3xl mx-auto'
      : 'p-4 w-full';

  return (
    <Card className={containerClass}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Ask about your medical documents or general health questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={
            variant === 'inline'
              ? 'flex-1 text-lg bg-transparent border-none focus:ring-0 focus:outline-none'
              : 'flex-1'
          }
          disabled={isLoading}
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex-shrink-0"
        >
          <PaperclipIcon className="h-4 w-4" />
        </Button>

        <Button 
          type="submit" 
          disabled={isLoading || (!message.trim() && !selectedFile)}
          className="flex-shrink-0"
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
      
      {selectedFile && (
        <div className="mt-2 text-sm text-muted-foreground">
          File selected: {selectedFile.name}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFile(null)}
            className="ml-2 h-auto p-1"
          >
            ✕
          </Button>
        </div>
      )}
    </Card>
  );
}