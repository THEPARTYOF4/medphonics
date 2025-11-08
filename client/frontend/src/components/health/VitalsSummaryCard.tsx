import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface VitalsProps {
  weight: number;
  weightChange: number;
  heartRate: number;
  bp: string;
  deviceStatus: string;
}

export function VitalsSummaryCard({ weight, weightChange, heartRate, bp, deviceStatus }: VitalsProps) {
  const weightUp = weightChange > 0;
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Today's Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3 text-base">
          <div className="flex justify-between items-center"><div className="text-sm">Weight</div><div className="font-semibold text-lg">{weight} lb <span className="ml-2 text-sm text-muted-foreground">({weightUp ? `up ${weightChange} lb` : `down ${Math.abs(weightChange)} lb`})</span></div></div>
          <div className="flex justify-between items-center"><div className="text-sm">Heart Rate</div><div className="font-semibold text-lg">{heartRate} bpm</div></div>
          <div className="flex justify-between items-center"><div className="text-sm">Blood Pressure</div><div className="font-semibold text-lg">{bp}</div></div>
          <div className="flex justify-between items-center"><div className="text-sm">Device Status</div><div className="font-semibold text-lg">{deviceStatus}</div></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default VitalsSummaryCard;
