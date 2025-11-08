import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiInput } from "./AiInput";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  file?: {
    name: string;
    type: string;
  };
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      const detail = ce.detail as
        | { message?: string; file?: File; isEli5?: boolean }
        | undefined;
      if (!detail || !detail.message) return;
      handleSubmit(detail.message, detail.file, detail.isEli5);
    };

    window.addEventListener("ai-message", handler as EventListener);
    return () =>
      window.removeEventListener("ai-message", handler as EventListener);
  }, []);

  const handleSubmit = async (message: string, file?: File, isEli5?: boolean) => {
    setIsLoading(true);

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      file: file ? { name: file.name, type: file.type } : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 👇 Mocked response logic
      let aiText: string;

      if (message.toLowerCase().includes("cardiac")) {
        aiText =
          "🫀 *Cardiac* refers to anything related to the **heart**. For example, a *cardiac arrest* occurs when the heart suddenly stops beating, preventing blood from circulating through the body. Maintaining cardiac health is essential to prevent conditions such as arrhythmias, hypertension, or coronary artery disease.";
      } else {
        aiText =
          "💬 I’m here to help with medical explanations. Try asking me about a cardiac term — for example, 'Explain a cardiac condition.'";
      }

      // Instead of API call, return the mock response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiText,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content:
            "⚠️ Sorry, something went wrong while connecting to the server. Please try again.",
        },
      ]);
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
              👋 Hi! I’m your medical AI assistant.  
              Ask anything — like “What are common heart conditions?”  
              or upload a document for review.
            </div>
          )}

          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 transition ${
                message.type === "assistant"
                  ? "bg-primary/5 border-primary/30"
                  : "bg-background border-border"
              }`}
            >
              {message.file && (
                <div className="text-sm text-muted-foreground mb-2">
                  📎 Attached: {message.file.name}
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {message.content}
              </div>
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
