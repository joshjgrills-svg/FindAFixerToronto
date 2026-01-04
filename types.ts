
export interface Testimonial {
  author: string;
  text: string;
  rating: number;
  date?: string;
}

export interface ServiceDetail {
  name: string;
  description: string;
}

export type TradeType = 'Plumber' | 'Electrician' | 'Roofer' | 'HVAC' | 'Drywaller';
export type ClientType = 'Residential' | 'Commercial' | 'Both';

export interface Professional {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  yelpRating?: number;
  yelpReviewCount?: number;
  bbbRating?: string; // New BBB Field (e.g., "A+")
  address: string;
  neighborhood: string;
  phone: string;
  website: string;
  email?: string;
  services: string[];
  isEmergency: boolean;
  description: string;
  logoUrl?: string;
  status: 'Open' | 'Closed';
  mapsUri?: string;
  verified: boolean;
  businessHours?: string;
  certifications?: string[];
  testimonials?: Testimonial[];
  serviceDetails?: ServiceDetail[];
  latitude?: number;
  longitude?: number;
  confidenceScore?: number;
  
  // New Credibility Fields
  trustScore: number;         // 0-100 FindaFixer Trust Index
  yearsInBusiness?: number;   // Estimated longevity
  verifiedLicense?: boolean;  // If the AI found license info
  
  trade: TradeType;
  clientType: ClientType;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageData?: string; // base64 image data
}
