import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export interface DoctorNote {
  name: string;
  initials: string;
  specialty: string;
  note: string;
}

export const DoctorNoteCard: React.FC<DoctorNote> = ({ name, initials, specialty, note }) => (
  <Card>
    <CardHeader className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full border bg-gray-200 flex items-center justify-center font-bold text-lg text-primary">{initials}</div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-muted-foreground">{specialty}</div>
        </div>
      </div>
      <button className="px-3 py-1 rounded bg-primary text-white text-xs">Contact {name}</button>
    </CardHeader>
    <CardContent>
      <div className="mb-2">{note}</div>
    </CardContent>
  </Card>
);
