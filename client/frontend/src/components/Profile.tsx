import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
  // Mock user data - would come from your auth system
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/placeholder.png',
    medicalInfo: {
      bloodType: 'A+',
      allergies: ['Penicillin', 'Pollen'],
      conditions: ['Asthma'],
      medications: ['Albuterol Inhaler']
    },
    recentActivity: [
      { date: '2025-11-07', action: 'Uploaded medical report' },
      { date: '2025-11-06', action: 'Updated medication list' },
      { date: '2025-11-05', action: 'Consulted AI about symptoms' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{userData.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
            <Button className="ml-auto" variant="outline">
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Blood Type</h4>
            <p>{userData.medicalInfo.bloodType}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Allergies</h4>
            <ul className="list-disc list-inside">
              {userData.medicalInfo.allergies.map(allergy => (
                <li key={allergy}>{allergy}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Medical Conditions</h4>
            <ul className="list-disc list-inside">
              {userData.medicalInfo.conditions.map(condition => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Current Medications</h4>
            <ul className="list-disc list-inside">
              {userData.medicalInfo.medications.map(medication => (
                <li key={medication}>{medication}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center border-b last:border-0 pb-2 last:pb-0">
                <span>{activity.action}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}