"use client";

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Divider,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Box as BoxIcon } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, redirecting to home");
      router.replace("/");
      router.refresh();
    }
  }, [isAuthenticated, router]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const success = await login(values.email, values.password);

      if (success) {
        router.push("/");
        router.refresh(); // Force a refresh of the page
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
    }
  };

  return (
    <Box
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940)",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container w="40vw" h="50%">
        <Paper shadow="md" p={30} mt={30} radius="md" bg="white">
          <Group justify="center" mb="lg">
            <BoxIcon size={32} color="#228BE6" />
            <Title order={2} ta="center">
              Welcome back
            </Title>
          </Group>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label={<Text c="dark">Email</Text>}
              placeholder="you@example.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label={<Text c="dark">Password</Text>}
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group justify="space-between" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>

          <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <Button
              variant="default"
              leftSection={<FaGoogle />}
              onClick={handleGoogleLogin}
            >
              Google
            </Button>
            <Button variant="default" leftSection={<FaApple />}>
              Apple
            </Button>
          </Group>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor size="sm" component="button">
              Contact Authorized Person
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
