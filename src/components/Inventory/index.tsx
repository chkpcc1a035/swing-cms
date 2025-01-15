"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Table } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { InventoryItem } from "@/types/inventory";

interface ProductInfo {
  productImagePath: string;
  productDescription: string;
}

interface WebsiteStatus {
  isStocked: boolean;
  updatedDatabase: boolean;
}

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  const { t } = useTranslation();

  return (
    <Table withRowBorders withColumnBorders withTableBorder striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t("inventory.columns.stockLocation")}</Table.Th>
          <Table.Th>{t("inventory.columns.stockQty")}</Table.Th>
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
            <Table.Td>{item.stock_qty}</Table.Td>
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
  );
}
