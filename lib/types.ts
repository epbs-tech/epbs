export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  image: string;
  isActive: boolean;
  detailedDescription?: string;
  objectives?: string[];
  prerequisites?: string[];
  syllabus?: {
    title: string;
    content: string[];
  }[];
}

export interface Session {
  id: string;
  formationId: string;
  startDate: string;
  endDate: string;
  location: string;
  priceEURO: number;
  priceMAD: number;
  maxParticipants: number;
  currentParticipants: number;
  isOpen: boolean;
  formation?: Formation;
}

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  sessionId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentMethod: 'creditCard' | 'bankTransfer';
  paymentStatus: 'pending' | 'completed';
  createdAt: string;
  session?: Session;
}

export interface Admin {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff';
}