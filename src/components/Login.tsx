import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Stack,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
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

  const handleSubmit = async (values: LoginFormValues) => {
    const success = await login(values.email, values.password);
    if (success) {
      navigate("/dashboard");
    } else {
      form.setErrors({
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Paper radius="md" p="xl" withBorder className="w-full max-w-md">
        {/* <Title order={2} mb="lg" ta="center">
          Welcome to SKU Manager
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </Stack>
        </form> */}
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Email" placeholder="your@email.com" />
          </Grid.Col>
          <Grid.Col span={6}>TEST</Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}
