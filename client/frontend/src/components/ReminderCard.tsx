import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export interface Reminder {
  title: string;
  description: string;
  time: string;
  showButton?: boolean;
}

export const ReminderCard: React.FC<Reminder> = ({ title, description, time, showButton }) => (
  <Card>
    <CardHeader>
      <div className="text-base font-semibold">{title}</div>
    </CardHeader>
    <CardContent>
      <div className="font-medium">{description}</div>
      <div className="text-muted-foreground">{time}</div>
      {showButton && (
        <button className="mt-2 px-3 py-1 rounded bg-primary text-white text-sm">Add to Calendar</button>
      )}
    </CardContent>
  </Card>
);
