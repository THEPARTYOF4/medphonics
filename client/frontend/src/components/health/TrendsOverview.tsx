import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TrendsProps {
  heartRate: number[];
  weight: number[];
  fluid: number[];
}

function MiniSpark({ values }: { values: number[] }) {
  // Simple SVG sparkline based on values
  const max = Math.max(...values, 1);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ');
  return (
    <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline fill="none" stroke="#60a5fa" strokeWidth={2} points={points} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function TrendsOverview({ heartRate, weight, fluid }: TrendsProps) {
  return (
  <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">My Weekly Trends</CardTitle>
      </CardHeader>
  <CardContent className="flex-1">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-medium mb-1">Heart Rate</div>
            <MiniSpark values={heartRate} />
            <div className="text-xs text-muted-foreground mt-1">Fake data</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Weight</div>
            <MiniSpark values={weight} />
            <div className="text-xs text-muted-foreground mt-1">Fake data</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Fluid Retention</div>
            <MiniSpark values={fluid} />
            <div className="text-xs text-muted-foreground mt-1">Fake data</div>
          </div>
        </div>

        <div className="mt-3 bg-gray-100 p-3 rounded text-sm text-muted-foreground">AI Explanation: Your device is working as expected and supporting your heart rhythm effectively.</div>
      </CardContent>
    </Card>
  );
}

export default TrendsOverview;
