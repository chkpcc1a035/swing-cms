import { Database } from "../../database.types";

// Base types from Supabase
type InventoryRow = Database["public"]["Tables"]["inventory"]["Row"];
type ProductSeriesRow = Database["public"]["Tables"]["product_series"]["Row"];

// Type guards for JSON fields
export interface ProductInfo {
  productImagePath: string;
  productDescription: string;
}

export interface WebsiteStatus {
  isStocked: boolean;
  updatedDatabase: boolean;
}

// Extended type that includes the joined data and parsed JSON
export interface InventoryItem
  extends Omit<InventoryRow, "product_info" | "website_status"> {
  product_info: ProductInfo;
  website_status: WebsiteStatus;
  product_series: Pick<ProductSeriesRow, "series_name">;
}
