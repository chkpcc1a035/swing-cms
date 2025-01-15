import { Paper, Text, Group } from '@mantine/core';

export function MRRStats() {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group justify="space-between" align="flex-end">
        <div>
          <Text size="sm" c="dimmed">MRR</Text>
          <Text size="xl" fw={700}>$21,819</Text>
        </div>
        <Text size="sm" c="green">+3.8%</Text>
      </Group>
    </Paper>
  );
}