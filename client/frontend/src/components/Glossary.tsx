import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Mock medical terms for the glossary
const medicalTerms = [
  {
        "term": "hypertension",
        "definition": "High blood pressure condition where blood pressure against artery walls is consistently too high.",
        "category": "Cardiovascular"
    },
    {
        "term": "diabetes",
        "definition": "A group of diseases that affect how your body uses blood sugar (glucose).",
        "category": "Endocrine/Metabolic"
    },
    {
        "term": "tachycardia",
        "definition": "Abnormally rapid heart rate.",
        "category": "Cardiovascular"
    },
    {
        "term": "bradycardia",
        "definition": "Abnormally slow heart rate.",
        "category": "Cardiovascular"
    },
    {
        "term": "arrhythmia",
        "definition": "Irregular heartbeat or abnormal heart rhythm.",
        "category": "Cardiovascular"
    },
    {
        "term": "myocardial infarction",
        "definition": "Medical term for a heart attack, when blood flow to part of the heart muscle is blocked.",
        "category": "Cardiovascular"
    },
    {
        "term": "angina",
        "definition": "Chest pain caused by reduced blood flow to the heart.",
        "category": "Cardiovascular"
    },
    {
        "term": "stroke",
        "definition": "When blood supply to part of the brain is interrupted or reduced.",
        "category": "Neurological/Cardiovascular"
    },
    {
        "term": "anemia",
        "definition": "Condition where you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
        "category": "Hematology"
    },
    {
        "term": "asthma",
        "definition": "A condition in which airways narrow and swell and produce extra mucus.",
        "category": "Respiratory"
    },
    {
        "term": "bronchitis",
        "definition": "Inflammation of the lining of bronchial tubes that carry air to and from lungs.",
        "category": "Respiratory"
    },
    {
        "term": "arthritis",
        "definition": "Inflammation of one or more joints causing pain and stiffness.",
        "category": "Musculoskeletal"
    },
    {
        "term": "osteoporosis",
        "definition": "Condition where bones become weak and brittle.",
        "category": "Musculoskeletal"
    },
    {
        "term": "gastritis",
        "definition": "Inflammation of the stomach lining.",
        "category": "Gastrointestinal"
    },
    {
        "term": "hypothyroidism",
        "definition": "Condition where thyroid gland doesn't produce enough thyroid hormone.",
        "category": "Endocrine"
    },
    {
        "term": "hyperthyroidism",
        "definition": "Condition where thyroid gland produces too much thyroid hormone.",
        "category": "Endocrine"
    },
    {
        "term": "migraine",
        "definition": "Recurring type of headache that causes moderate to severe pain.",
        "category": "Neurological"
    },
    {
        "term": "pneumonia",
        "definition": "Infection that inflames air sacs in one or both lungs.",
        "category": "Respiratory"
    },
    {
        "term": "atherosclerosis",
        "definition": "Buildup of fats and cholesterol in artery walls.",
        "category": "Cardiovascular"
    },
    {
        "term": "hypoglycemia",
        "definition": "Abnormally low blood sugar levels.",
        "category": "Endocrine/Metabolic"
    },
    {
        "term": "hyperglycemia",
        "definition": "Abnormally high blood sugar levels.",
        "category": "Endocrine/Metabolic"
    },
    {
        "term": "sepsis",
        "definition": "Life-threatening response to infection affecting whole body.",
        "category": "Systemic/Infectious"
    },
    {
        "term": "edema",
        "definition": "Swelling caused by excess fluid trapped in body tissues.",
        "category": "General/Vascular (Sign)"
    },
    {
        "term": "dyspnea",
        "definition": "Difficulty breathing or shortness of breath.",
        "category": "Respiratory (Symptom)"
    },
    {
        "term": "tachypnea",
        "definition": "Abnormally rapid breathing.",
        "category": "Respiratory (Sign)"
    },
    {
        "term": "syncope",
        "definition": "Medical term for fainting or passing out.",
        "category": "Neurological (Symptom)"
    },
    {
        "term": "hypertrophy",
        "definition": "Enlargement or overgrowth of an organ or tissue.",
        "category": "General Pathology"
    },
    {
        "term": "stenosis",
        "definition": "Abnormal narrowing of a passage in the body.",
        "category": "General Pathology"
    },
    {
        "term": "fibrillation",
        "definition": "Very rapid irregular contractions of muscle fibers.",
        "category": "Cardiovascular"
    },
    {
        "term": "ischemia",
        "definition": "Inadequate blood supply to an organ or part of the body.",
        "category": "Cardiovascular"
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
