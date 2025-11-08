interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
}

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

export const api = {
  // Articles
  getArticles: async (): Promise<Article[]> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Understanding Heart Health',
            content: 'A comprehensive guide to maintaining heart health...',
            date: '2025-11-07',
          },
          {
            id: '2',
            title: 'Mental Health Awareness',
            content: 'Important insights about mental health...',
            date: '2025-11-06',
          },
        ]);
      }, 500);
    });
  },

  // Doctors
  getNearbyDoctors: async (): Promise<Doctor[]> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            location: { lat: 44.9778, lng: -93.2650 },
            address: '123 Medical Center Dr, Minneapolis, MN',
          },
          {
            id: '2',
            name: 'Dr. Michael Chen',
            specialty: 'Family Medicine',
            location: { lat: 44.9537, lng: -93.0900 },
            address: '456 Health Ave, St. Paul, MN',
          },
        ]);
      }, 500);
    });
  },

  // ChatGPT Analysis
  analyzeDocument: async (file: File): Promise<{ analysis: string }> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          analysis: 'This is a mock analysis of the uploaded medical document...',
        });
      }, 1000);
    });
  },
};