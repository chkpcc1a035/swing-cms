//src/components/Inventory/index.tsx
"use client";
import { useEffect, useState } from "react";
import { Table, Affix, rem } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { InventoryItem } from "@/types/inventory";
import { getSignedUrl } from "@/app/actions/storage";
import { Image as MantineImage } from "@mantine/core";
import { keyframes } from "@emotion/react";
import ExpandedActionBar from "@/components/AnimatedBar";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  const { t } = useTranslation();

  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const urls: { [key: string]: string } = {};
      const newErrors: { [key: string]: string } = {};

      console.log("Client - Starting to load images for items:", items);

      for (const item of items) {
        if (item.product_info.productImagePath) {
          try {
            const path = `products_image/${item.product_info.productImagePath}`;
            const { url } = await getSignedUrl(path);

            urls[item.id] = url;
          } catch (error) {
            console.error("Client - Error for item", item.id, ":", error);
            newErrors[item.id] =
              error instanceof Error ? error.message : "Unknown error";
          }
        }
      }

      setImageUrls(urls);
      setErrors(newErrors);
    };

    loadImages();
  }, [items]);

  return (
    <>
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
              <Table.Td>
                {imageUrls[item.id] ? (
                  <MantineImage
                    src={imageUrls[item.id]}
                    alt={item.product_info.productDescription}
                    w={50}
                    h={50}
                    fit="cover"
                  />
                ) : (
                  <div>
                    {errors[item.id] ? `Error: ${errors[item.id]}` : "No image"}
                  </div>
                )}
              </Table.Td>
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

      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <ExpandedActionBar />
      </Affix>
    </>
  );
}
