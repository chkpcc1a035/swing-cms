"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { InventoryTable } from "@/components/Inventory";
import { InventoryItem } from "@/types/inventory";


export default function InventoryPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select(
          `
          *,
          product_series (
            series_name
          )
        `
        )
        .returns<InventoryItem[]>();

      if (error) throw error;
      if (data) setItems(data);
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
      <InventoryTable items={items} />
    </div>
  );
}
