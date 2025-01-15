import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Table } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface ProductInfo {
  productImagePath: string;
  productDescription: string;
}

interface WebsiteStatus {
  isStocked: boolean;
  updatedDatabase: boolean;
}

interface InventoryItem {
  id: string;
  cost_price: number;
  created_at: string;
  delivery_fee: number;
  product_info: ProductInfo;
  product_number: string;
  quantity: number;
  retail_price: number;
  sku_number: string;
  stock_location: string;
  unit_price: number;
  website_status: WebsiteStatus;
  wholesale_price: number;
  product_series_id: string;
  product_series: {
    series_name: string;
  };
}

export function Inventory() {
  const { t } = useTranslation();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log(
      "Supabase Key exists:",
      !!import.meta.env.VITE_SUPABASE_ANON_KEY
    );
    fetchInventory();
  }, []);

  async function fetchInventory() {
    try {
      console.log("Fetching inventory...");
      const { data, error } = await supabase.from("inventory").select(`
          *,
          product_series (
            series_name
          )
        `);

      console.log("Raw response:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      if (data) {
        setItems(data);
        console.log("Inventory data:", data);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{t("inventory.title")}</h1>
      <Table withRowBorders withColumnBorders withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("inventory.columns.stockLocation")}</Table.Th>
            <Table.Th>{t("inventory.columns.websiteStatus")}</Table.Th>
            <Table.Th>{t("inventory.columns.sku")}</Table.Th>
            <Table.Th>{t("inventory.columns.productNumber")}</Table.Th>
            <Table.Th>{t("inventory.columns.productThumbnail")}</Table.Th>
            <Table.Th>{t("inventory.columns.productSeries")}</Table.Th>
            <Table.Th>{t("inventory.columns.productDesc")}</Table.Th>
            <Table.Th>{t("inventory.columns.quantity")}</Table.Th>
            <Table.Th>{t("inventory.columns.wholesalePrice")}</Table.Th>
            <Table.Th>{t("inventory.columns.costPrice")}</Table.Th>
            <Table.Th>{t("inventory.columns.deliveryFee")}</Table.Th>
            <Table.Th>{t("inventory.columns.unitPrice")}</Table.Th>
            <Table.Th>{t("inventory.columns.retailPrice")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.stock_location}</Table.Td>
              <Table.Td>
                {item.website_status.updatedDatabase
                  ? "Updated Database"
                  : "Not Updated Database"}
                <br />
                {item.website_status.isStocked ? "Stocked" : "Out of Stock"}
              </Table.Td>
              <Table.Td>{item.sku_number}</Table.Td>
              <Table.Td>{item.product_number}</Table.Td>
              <Table.Td>{item.product_info.productImagePath}</Table.Td>
              <Table.Td>{item.product_series.series_name}</Table.Td>
              <Table.Td>{item.product_info.productDescription}</Table.Td>
              <Table.Td>{item.quantity}</Table.Td>
              <Table.Td>${item.wholesale_price}</Table.Td>
              <Table.Td>${item.cost_price}</Table.Td>
              <Table.Td>${item.delivery_fee}</Table.Td>
              <Table.Td>${item.unit_price}</Table.Td>
              <Table.Td>${item.retail_price}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
