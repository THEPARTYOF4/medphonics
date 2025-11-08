import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const summaryItems = [
    {
      title: 'Recent AI Consultations',
      content: [
        { text: 'Discussion about headache symptoms', date: '2025-11-07' },
        { text: 'Analysis of blood test results', date: '2025-11-06' }
      ],
      action: { text: 'View All Conversations', href: '#ai' }
    },
    {
      title: 'Medical Documents',
      content: [
        { text: 'Annual Physical Report', date: '2025-11-05' },
        { text: 'Blood Test Results', date: '2025-11-03' }
      ],
      action: { text: 'Manage Documents', href: '#documents' }
    },
    {
      title: 'Health Reminders',
      content: [
        { text: 'Schedule annual checkup', date: '2025-11-15' },
        { text: 'Medication refill needed', date: '2025-11-10' }
      ],
      action: { text: 'View All Reminders', href: '#reminders' }
    },
    {
      title: 'Recent Searches',
      content: [
        { text: 'Migraine prevention tips', date: '2025-11-07' },
        { text: 'Vitamin D deficiency', date: '2025-11-06' }
      ],
      action: { text: 'View Search History', href: '#history' }
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
      <p className="text-muted-foreground">
        Here's an overview of your recent medical activities and important updates.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {summaryItems.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {item.content.map((entry, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm">{entry.text}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                <Button variant="link" className="px-0" asChild>
                  <a href={item.action.href}>{item.action.text} →</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}