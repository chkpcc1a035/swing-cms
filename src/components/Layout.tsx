import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ActionIcon,
  useMantineColorScheme,
  Menu,
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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          to="/inventory"
          label={t("nav.inventory")}
          leftSection={<Boxes size={20} />}
          active={location.pathname === "/inventory"}
        />
        <NavLink
          component={Link}
          to="/series"
          label={t("nav.series")}
          leftSection={<FileBox size={20} />}
          active={location.pathname === "/series"}
        />
        <NavLink
          component={Link}
          to="/settings"
          label={t("nav.settings")}
          leftSection={<Settings size={20} />}
          active={location.pathname === "/settings"}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
