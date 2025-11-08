import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from '../services/api';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
}

export function DoctorsMap() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.getNearbyDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center">Loading nearby doctors...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="h-[300px] bg-gray-100 rounded-lg mb-4">
        {/* Map placeholder - would integrate with Google Maps or similar */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Interactive Map Coming Soon
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <CardTitle>{doctor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{doctor.specialty}</p>
              <p className="text-sm text-gray-600 mt-1">{doctor.address}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}