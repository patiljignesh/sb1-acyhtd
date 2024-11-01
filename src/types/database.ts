export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
}

export interface Printer {
  id: string;
  user_id: string;
  model: string;
  materials: string[];
  build_volume: string;
  experience: string;
  description: string;
}

export interface PrintRequest {
  id: string;
  user_id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  files: string[];
  created_at: string;
}

export interface PrintOffer {
  id: string;
  request_id: string;
  printer_id: string;
  amount: number;
  timeline: number;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}