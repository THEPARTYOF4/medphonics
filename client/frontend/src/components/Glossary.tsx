import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock medical terms for the glossary
const medicalTerms = [
  {
    term: 'Anemia',
    definition: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    category: 'Hematology'
  },
  {
    term: 'Arrhythmia',
    definition: 'An irregular heartbeat or abnormal heart rhythm.',
    category: 'Cardiology'
  },
  {
    term: 'Biopsy',
    definition: 'A medical procedure that involves taking a small sample of tissue to examine under a microscope.',
    category: 'Diagnostics'
  },
  {
    term: 'Hypertension',
    definition: 'High blood pressure, a common condition that can increase the risk of heart disease and stroke.',
    category: 'Cardiology'
  },
  {
    term: 'MRI',
    definition: 'Magnetic Resonance Imaging - a medical imaging technique that uses magnetic fields and radio waves to create detailed images.',
    category: 'Diagnostics'
  }
].sort((a, b) => a.term.localeCompare(b.term));

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = medicalTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background pt-4 pb-2 z-10">
        <Input
          type="search"
          placeholder="Search medical terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4">
          {filteredTerms.map((item) => (
            <Card key={item.term}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{item.term}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.definition}</p>
              </CardContent>
            </Card>
          ))}
          {filteredTerms.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No medical terms found matching your search.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}