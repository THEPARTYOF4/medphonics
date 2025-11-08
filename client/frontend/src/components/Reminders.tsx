import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export interface Reminder {
  title: string;
  description: string;
  time: string;
  showButton?: boolean;
}

interface RemindersProps {
  reminders: Reminder[];
}

export const Reminders: React.FC<RemindersProps> = ({ reminders }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {reminders.map((reminder, idx) => (
      <Card key={idx}>
        <CardHeader>
          <div className="text-base font-semibold">{reminder.title}</div>
        </CardHeader>
        <CardContent>
          <div className="font-medium">{reminder.description}</div>
          <div className="text-muted-foreground">{reminder.time}</div>
          {reminder.showButton && (
            <button className="mt-2 px-3 py-1 rounded bg-primary text-white text-sm">Add to Calendar</button>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);
