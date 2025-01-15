import { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { I18nProvider } from "@/contexts/i18nProvider";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "SKU Manager",
  description: "SKU Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="dark">
          <I18nProvider>
            <AuthProvider>
              <Layout>{children}</Layout>
            </AuthProvider>
          </I18nProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
