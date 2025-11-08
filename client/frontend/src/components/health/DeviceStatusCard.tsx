import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DeviceProps {
  deviceName: string;
  battery: number;
  implantDate: string;
  connection: string;
  lastSync: string;
}

export function DeviceStatusCard({ deviceName, battery, implantDate, connection, lastSync }: DeviceProps) {
  return (
  <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">My Cardiac Device</CardTitle>
      </CardHeader>
  <CardContent className="flex-1">
        <div className="space-y-2 text-base">
          <div className="flex justify-between"><div className="text-sm">Device</div><div className="font-semibold">{deviceName}</div></div>
          <div className="flex justify-between"><div className="text-sm">Battery</div><div className="font-semibold">{battery}%</div></div>
          <div className="flex justify-between"><div className="text-sm">Implanted</div><div className="font-semibold">{implantDate}</div></div>
          <div className="flex justify-between"><div className="text-sm">Connection</div><div className="font-semibold">{connection} (Last sync {lastSync})</div></div>
        </div>
        <div className="mt-3 bg-gray-100 p-3 rounded text-sm text-muted-foreground">AI Explanation: Your device is working as expected and supporting your heart rhythm effectively.</div>
      </CardContent>
    </Card>
  );
}

export default DeviceStatusCard;
