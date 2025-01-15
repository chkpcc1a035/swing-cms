import { Group, Paper, Text, Stack } from '@mantine/core';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: 'green' | 'red';
}

function StatCard({ title, value, change, changeColor }: StatCardProps) {
  return (
    <Stack gap={0}>
      <Text size="sm" c="dimmed">{title}</Text>
      <Group align="baseline" gap="xs">
        <Text size="xl" fw={700}>{value}</Text>
        <Text size="sm" c={changeColor}>
          {change}
        </Text>
      </Group>
    </Stack>
  );
}

export function MemberStats() {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group justify="space-between">
        <StatCard
          title="Total members"
          value="13,041"
          change="+4%"
          changeColor="green"
        />
        <StatCard
          title="Paid members"
          value="3,207"
          change="+1%"
          changeColor="green"
        />
        <StatCard
          title="Free members"
          value="9,834"
          change="+8%"
          changeColor="green"
        />
      </Group>
    </Paper>
  );
}