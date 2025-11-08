import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { AiInput } from "./AiInput";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArticleCard } from "./ArticleCard";
import { ReminderCard } from "./ReminderCard";
import { DoctorNoteCard } from "./DoctorNoteCard";
import VitalsSummaryCard from './health/VitalsSummaryCard';
import TrendsOverview from './health/TrendsOverview';
import DeviceStatusCard from './health/DeviceStatusCard';

export function HomeDashboard() {
  const [inputLoading, setInputLoading] = useState(false);
  const [isEli5, setIsEli5] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputSubmit = async (message: string, file?: File) => {
    setInputLoading(true);
    setAiResponse(null);

    try {
      // --- Hardcoded AI response logic ---
      let fakeResponse = "";

      if (message.toLowerCase().includes("cardiac")) {
        fakeResponse = `🫀 **Cardiac Term Explained: Myocardial Infarction (Heart Attack)**  

A **myocardial infarction**, commonly known as a *heart attack*, occurs when blood flow to part of the heart muscle (the *myocardium*) is blocked for a long enough time that part of the tissue is damaged or dies.  
 
**What causes it?**  
Usually, a buildup of fatty deposits (called *plaques*) in the coronary arteries narrows the vessels that supply blood to the heart. If one of these plaques ruptures, it can form a clot that completely stops blood flow.

**Key Symptoms:**  
- Chest pain or pressure (often described as a squeezing or heaviness)  
- Pain radiating to the jaw, shoulder, or left arm  
- Shortness of breath, sweating, and nausea  

**Why it matters:**  
Without quick medical intervention, the heart muscle can become permanently damaged, leading to heart failure or dangerous arrhythmias.  

**In simple terms:**  
It’s like a traffic jam in your heart’s blood supply — when blood can’t reach part of your heart, that area starts to “run out of oxygen” and get injured.  

**Treatment:**  
Immediate medical care often includes restoring blood flow using clot-busting medications or surgery (like angioplasty or stent placement), followed by lifestyle changes and long-term medication.`;
      } else {
        fakeResponse =
          "💬 I can explain medical terms or lab results. Try asking about a cardiac term — for example, 'Explain what a heart murmur is.'";
      }

      // --- Simulate API delay for realism ---
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // --- Store hardcoded response locally ---
      setAiResponse(fakeResponse);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong while processing your question.");
    } finally {
      setInputLoading(false);
    }
  };

  const handleFilePicked = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputSubmit(`Uploaded file: ${file.name}`, file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleContinueConversation = () => {
    window.dispatchEvent(new CustomEvent("ai-navigate"));
  };

  const articlesData = [ { link: "https://www.thedailynewsonline.com/news/states-jostle-over-50b-rural-health-fund-as-medicaid-cuts-t...", title: "States jostle over $50B rural health fund as Medicaid cuts trigger scramble", description: "WASHINGTON — Nationwide, states are racing to win their share of a new $50 billion rural health fund...", image_url: "https://bloximages.newyork1.vip.townnews.com/thedailynewsonline.com/content/tncms/assets/v3/editori...", keywords: [ "health economics", "medicaid", "health care", "social programs", "health", "hospital", "medicare (united states)", "centers for medicare & medicaid services", "politics", "make america healthy again", "artificial intelligence", ], creator: ["Sarah Jane TribblE KFF Health News (TNS)"], source_name: "The Daily News Online", }, { link: "https://www.getsurrey.co.uk/news/health/bbc-doctors-surprising-vitamin-packed-32816782", title: "BBC doctors' 'surprising' vitamin-packed superfood you can now buy in supermarkets", description: "You might be surprised to find them at your local supermarket.", image_url: "https://i2-prod.birminghammail.co.uk/incoming/article32816868.ece/ALTERNATES/s615/0_GettyImages-691...", keywords: ["health"], creator: ["Howard Lloyd"], source_name: "Surrey Live", }, { link: "https://www.getsurrey.co.uk/news/nhs-alert-call-999-you-32815428", title: "NHS alert to 'call 999' if you spot this symptom as 'deadly' disease spreads in UK", description: "This infection typically kills around one in 10 people who get it.", image_url: "https://i2-prod.getsurrey.co.uk/incoming/article32815341.ece/ALTERNATES/s615/0_GettyImages-22001253...", keywords: ["news"], creator: ["Fiona Callingham"], source_name: "Surrey Live", }, { link: "https://www.havasunews.com/news/gallego-joins-push-to-overhaul-veteran-transition-programs-and-cut-...", title: "Gallego joins push to overhaul veteran transition programs and cut suicide rates", description: "Sen. Ruben Gallego is backing a new bipartisan bill aimed at reducing veteran suicide by strengthening transition programs.", image_url: "https://bloximages.chicago2.vip.townnews.com/havasunews.com/content/tncms/assets/v3/editorial/1/9c/...", keywords: [ "veterans health administration", "united states department of veterans affairs", "health", "veteran", "military", ], creator: ["Today's News-Herald"], source_name: "Havasu News", }, { link: "https://www.timesargus.com/features/weekend_magazine/health-talk-consider-lung-cancer-screening/art...", title: "Health Talk: Consider lung cancer screening", description: "Radiology and early detection for lung cancer screening are a partnership for success.", image_url: "https://bloximages.chicago2.vip.townnews.com/timesargus.com/content/tncms/custom/image/b304aa08-5df...", keywords: ["weekend_magazine", "health"], creator: ["Ashley Kiernan"], source_name: "Times Argus", }, ];

  return (
    <div className="flex flex-col p-8 max-w-7xl mx-auto">
      {/* --- AI Assistant Hero Section --- */}
      <div className="flex justify-center mb-16">
        <div className="w-full max-w-4xl min-h-[420px] p-2 md:p-6 lg:p-8 flex flex-col gap-10">
          <CardHeader>
            <CardTitle className="text-6xl">
              Ask anything about your health — get clear, reliable answers.
            </CardTitle>
            <p className="text-md text-muted-foreground mt-2">
              Get concise, trustworthy medical explanations — attach lab results or ask general health questions.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <AiInput onSubmit={handleInputSubmit} isLoading={inputLoading} variant="inline" />

              <div className="flex items-center justify-between mt-2 w-full">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEli5}
                    onChange={(e) => setIsEli5(e.target.checked)}
                    className="h-5 w-5"
                  />
                  <span className="text-base">Explain it to me in simpler terms</span>
                </label>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFilePicked}
                    accept=".pdf,.doc,.docx,.png,.jpg"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                  >
                    📎 Upload medical documents
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="text-md text-muted-foreground mt-5">
                  Try: “Explain a cardiac medical term.”
                </div>
              </div>

              {aiResponse && (
                <Card className="mt-10 bg-gray-50 shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">
                      AI Assistant’s Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {aiResponse}
                    </p>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleContinueConversation}
                        className="px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition"
                      >
                        Continue Conversation →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </div>
      </div>

      {/* --- Health Insights Section (unchanged) --- */}
      <div className="text-5xl font-semibold mt-10 mb-6">Personalize Health Insights</div>

      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-4 h-full">
          <VitalsSummaryCard weight={143} weightChange={1.5} heartRate={72} bp="118 / 78" deviceStatus="Stable" />
        </div>
        <div className="col-span-4 h-full">
          <TrendsOverview heartRate={[70, 72, 71, 74, 73]} weight={[142, 143, 144, 144, 145]} fluid={[0.3, 0.4, 0.5, 0.4, 0.6]} />
        </div>
        <div className="col-span-4 h-full">
          <DeviceStatusCard deviceName="Medtronic CRT-D" battery={78} implantDate="Mar 2023" connection="Active" lastSync="3 hrs ago" />
        </div>
      </div>

      {/* --- Reminders Section --- */}
      <h2 className="text-5xl font-semibold mt-10 mb-6">Upcoming Reminders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <ReminderCard title="[Appointment] - Next Appointment" description="Dr. Nguyen" time="Nov 14, 2025 @ 10:00 AM" showButton />
        <ReminderCard title="[Medication Reminder] - Morning Dose" description="Take Furosemide" time="at 8:00 AM" />
        <ReminderCard title="[Appointment] - Lab Work" description="LabCorp" time="Nov 16, 2025 @ 7:30 AM" showButton />
        <ReminderCard title="[Medication Reminder] - Evening Dose" description="Take Metoprolol" time="at 8:00 PM" />
      </div>

      {/* --- Doctor's Notes --- */}
      <h2 className="text-5xl font-semibold mt-10 mb-6">Doctor's Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <DoctorNoteCard name="Dr. Nguyen" initials="DN" specialty="Cardiology" note="Continue current medications and low-sodium diet. Follow-up in 2 weeks." />
        <DoctorNoteCard name="Dr. Smith" initials="JS" specialty="Endocrinology" note="Blood sugar levels are stable. Maintain current regimen and monitor daily." />
        <DoctorNoteCard name="Dr. Rodriguez" initials="AR" specialty="Nephrology" note="Kidney function is good. Stay hydrated and continue regular check-ups." />
      </div>

      {/* --- Notable Articles --- */}
      <h2 className="text-5xl font-semibold mt-10 mb-6">Notable Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {articlesData.map((article) => (
          <ArticleCard
            key={article.link}
            image={article.image_url}
            title={article.title}
            summary={article.description}
            tags={article.keywords.slice(0, 3)}
            source={article.source_name}
            url={article.link}
          />
        ))}
      </div>
    </div>
  );
}
