import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const filteredTerms = medicalTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Single demo question for quiz ---
  const quizQuestion = {
    term: "An irregular heartbeat or abnormal heart rhythm.",
    choices: ["Anemia", "Arrhythmia", "Hypertension", "MRI"],
    answer: "Arrhythmia",
    definition: "An irregular heartbeat or abnormal heart rhythm."
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === quizQuestion.answer) {
      setQuizResult("✅ Correct! Well done.");
    } else {
      setQuizResult(`❌ Incorrect. The correct answer is "${quizQuestion.answer}".`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between sticky top-0 bg-background pt-4 pb-2 z-10 px-4">
        <Input
          type="search"
          placeholder="Search medical terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={() => { setQuizOpen(true); setSelectedAnswer(null); setQuizResult(null); }}>
          Quiz Yourself
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4 px-4">
          {filteredTerms.map((item) => (
            <Card key={item.term}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{item.term}</span>
                  <span className="text-sm text-muted-foreground">{item.category}</span>
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

      {/* --- Quiz Modal --- */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Quiz: What does this term mean?</h3>
            <p className="mb-4 font-medium">Term: <span className="text-primary">{quizQuestion.term}</span></p>

            <div className="space-y-2 mb-4">
              {quizQuestion.choices.map((choice) => (
                <label key={choice} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="quiz"
                    value={choice}
                    checked={selectedAnswer === choice}
                    onChange={() => setSelectedAnswer(choice)}
                  />
                  {choice}
                </label>
              ))}
            </div>

            {quizResult && (
              <p className="mb-4 font-semibold">{quizResult}</p>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setQuizOpen(false)}>Close</Button>
              <Button onClick={handleSubmitQuiz} disabled={!selectedAnswer}>Submit</Button>
            </div>

            {quizResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded border">
                <strong>Definition:</strong> {quizQuestion.definition}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
