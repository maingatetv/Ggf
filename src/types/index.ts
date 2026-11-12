export type AppTab = 
  | 'house-generator' 
  | 'cost-killer' 
  | 'renovation' 
  | 'smart-city' 
  | 'influencer-clone';

export interface UnlockedState {
  'house-generator': boolean;
  'cost-killer': boolean;
  'renovation': boolean;
  'smart-city': boolean;
  'influencer-clone': boolean;
}

export interface PaystackTransaction {
  appId: AppTab;
  title: string;
  amountUSD: number;
  customerEmail: string;
  reference: string;
  timestamp: string;
}

export interface HouseConfig {
  bedrooms: number;
  bathrooms: number;
  plotSize: string;
  budgetUSD: number;
  style: 'Ultra Modern Minimalist' | 'Luxury Villa' | 'Contemporary Mediterranean' | 'Tropical High-Roof';
  stories: number;
  hasPool: boolean;
  hasSolar: boolean;
  hasCarport: boolean;
}

export interface BOQItem {
  id: string;
  category: string;
  item: string;
  spec: string;
  quantity: number;
  unit: string;
  unitRateUSD: number;
  totalUSD: number;
}

export interface MaterialPriceItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  retailPriceUSD: number;
  wholesalePriceUSD: number;
  supplier: string;
  location: string;
  minOrder: string;
  deliveryDays: string;
  overpayPercent: number;
}

export interface RenovationSlide {
  id: string;
  title: string;
  costUSD: number;
  valueAfterUSD: number;
  beforeImg: string;
  afterImg: string;
  description: string;
}

export interface SmartCityMetric {
  acres: number;
  residentialPlots: number;
  commercialPlots: number;
  populationCapacity: number;
  solarCapacityMW: number;
  roadNetworkKm: number;
  estimatedInfraCostUSD: number;
  projectedLandGDVUSD: number;
}
