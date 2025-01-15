// src/components/Dashboard/index.tsx

"use client";

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ActionIcon,
  Menu,
  LoadingOverlay,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Package2,
  Boxes,
  Settings,
  FileBox,
  Sun,
  Moon,
  Languages,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const { isLoading, isAuthenticated, logout } = useAuth();

  console.log("[Dashboard] Render:", {
    pathname,
    isLoading,
    isAuthenticated,
    colorScheme: useMantineColorScheme().colorScheme,
    isDark: useMantineColorScheme().colorScheme === "dark",
    currentLanguage: i18n.language,
  });

  const changeLanguage = (lang: string) => {
    console.log("[Dashboard] Changing language to:", lang);
    i18n.changeLanguage(lang);
  };

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // Show loading overlay while authentication is being checked
  if (isLoading) {
    console.log("[Dashboard] Showing loading overlay");
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </div>
    );
  }

  // Return only children if on login page or not authenticated
  if (pathname === "/login" || !isAuthenticated) {
    console.log(
      "[Dashboard] Not authenticated or on login page, rendering children only"
    );
    return <>{children}</>;
  }

  console.log("[Dashboard] Rendering full dashboard layout");

  const handleLogout = async () => {
    console.log("[Dashboard] Initiating logout");
    try {
      await logout();
    } catch (error) {
      console.error("[Dashboard] Logout error:", error);
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group>
              <Package2 size={24} />
              <span className="text-xl font-semibold">{t("header.title")}</span>
            </Group>
          </Group>

          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Change language"
                >
                  <Languages size={20} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{t("header.selectLanguage")}</Menu.Label>
                <Menu.Item onClick={() => changeLanguage("en")}>
                  English
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage("zh")}>
                  繁體中文
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size="lg"
              aria-label="Toggle color scheme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </ActionIcon>

            <ActionIcon
              variant="default"
              onClick={handleLogout}
              size="lg"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/inventory"
          label={t("nav.inventory")}
          leftSection={<Boxes size={20} />}
          active={pathname === "/inventory"}
        />
        <NavLink
          component={Link}
          href="/series"
          label={t("nav.series")}
          leftSection={<FileBox size={20} />}
          active={pathname === "/series"}
        />
        <NavLink
          component={Link}
          href="/settings"
          label={t("nav.settings")}
          leftSection={<Settings size={20} />}
          active={pathname === "/settings"}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
