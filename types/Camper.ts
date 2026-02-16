export interface Camper {
  _id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  form: "alcove" | "integrated" | "semi-integrated" | string;

  length: string;
  width: string;
  height: string;

  tank: string;
  consumption: string;

  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "electric" | string;

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  gallery: CamperImage[];
  reviews: CamperReview[];
}

export interface CamperImage {
  thumb: string;
  original: string;
}

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface CampersResponse {
  campers: Camper[];
  page: number;
  totalPages: number;
}

export interface CampersQueryParams {
  page?: number;
  limit?: number;
  location?: string;
  transmission?: "automatic" | "manual";
  engine?: "diesel" | "petrol" | "electric";
  form?: "alcove" | "integrated" | "semi-integrated";
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  water?: boolean;
  gas?: boolean;
}

export interface CampersFilterItemProps {
  filters: CampersQueryParams;
  setFilters: (filters: CampersQueryParams) => void;
}