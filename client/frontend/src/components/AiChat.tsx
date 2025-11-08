import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiInput } from './AiInput';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  file?: {
    name: string;
    type: string;
  };
}

const mockResponses = [
  "Based on your symptoms, you might want to consult with a primary care physician. Would you like me to help you find one nearby?",
  "According to medical guidelines, it's recommended to get this checked within the next 48 hours. Here's why...",
  "That's a common concern. Let me explain what the research says about this condition...",
  "I've analyzed your description, and here are some potential causes to discuss with your healthcare provider:",
];

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // CustomEvent detail will contain { message, file, isEli5 }
      const ce = e as CustomEvent;
      const detail = ce.detail as { message?: string; file?: File; isEli5?: boolean } | undefined;
  if (!detail || !detail.message) return;
  const messageText = detail.message;

      // Reuse the same submit flow used by handleSubmit
      (async () => {
        setIsLoading(true);
        const userMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: messageText as string,
          file: detail.file ? { name: detail.file.name, type: detail.file.type } : undefined
        };
        setMessages(prev => [...prev, userMessage]);

        try {
          await new Promise(resolve => setTimeout(resolve, 1200));
          const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
          let responseContent = randomResponse;
          if (detail.file) {
            responseContent = `I've reviewed your file "${detail.file.name}". ${randomResponse}`;
          }
          if (detail.isEli5) {
            responseContent = `In simple terms (for a 5th grader): ${responseContent}`;
          }

          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: responseContent
          };
          setMessages(prev => [...prev, aiResponse]);
        } catch {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: 'Sorry, I encountered an error while processing your request.'
          }]);
        } finally {
          setIsLoading(false);
        }
      })();
    };

    window.addEventListener('ai-message', handler as EventListener);
    return () => window.removeEventListener('ai-message', handler as EventListener);
  }, []);

  const handleSubmit = async (message: string, file?: File) => {
    setIsLoading(true);

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      file: file ? { name: file.name, type: file.type } : undefined
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock response
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      let responseContent = randomResponse;
      
      if (file) {
        responseContent = `I've reviewed your file "${file.name}". ${randomResponse}`;
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[600px]">
      <ScrollArea className="h-[550px] pr-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground mt-8">
              👋 Hi! I'm your medical AI assistant. Feel free to ask me any health-related questions 
              or share medical documents for analysis.
            </div>
          )}
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 ${
                message.type === 'assistant' 
                  ? 'bg-primary/5'
                  : 'bg-background'
              }`}
            >
              <div className="font-semibold mb-1">
                {message.type === 'assistant' ? '🤖 AI Assistant' : '👤 You'}
              </div>
              {message.file && (
                <div className="text-sm text-muted-foreground mb-2">
                  📎 Attached: {message.file.name}
                </div>
              )}
              <div className="text-sm">{message.content}</div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="absolute bottom-0 left-0 right-0">
        <AiInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}