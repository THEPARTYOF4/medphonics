import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export interface DoctorNote {
  name: string;
  initials: string;
  specialty: string;
  note: string;
}

interface DoctorNotesProps {
  notes: DoctorNote[];
}

export const DoctorNotes: React.FC<DoctorNotesProps> = ({ notes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    {notes.map((doc, idx) => (
      <Card key={idx}>
        <CardHeader className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full border bg-gray-200 flex items-center justify-center font-bold text-lg text-primary">{doc.initials}</div>
            <div>
              <div className="font-semibold">{doc.name}</div>
              <div className="text-xs text-muted-foreground">{doc.specialty}</div>
            </div>
          </div>
          <button className="px-3 py-1 rounded bg-primary text-white text-xs">Contact ...</button>
        </CardHeader>
        <CardContent>
          <div className="mb-2">{doc.note}</div>
        </CardContent>
      </Card>
    ))}
  </div>
);
