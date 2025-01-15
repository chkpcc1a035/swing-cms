import { Group, Paper, Text, Stack } from '@mantine/core';

interface EngagementCardProps {
  percentage: string;
  description: string;
  period: string;
}

function EngagementCard({ percentage, description, period }: EngagementCardProps) {
  return (
    <Stack gap={0}>
      <Text size="xl" fw={700}>{percentage}</Text>
      <Text size="sm" c="dimmed">
        {description} {period}
      </Text>
    </Stack>
  );
}

export function EngagementStats() {
  return (
    <Paper p="md" radius="md" withBorder>
      <Text mb="md">Engagement</Text>
      <Group justify="space-between">
        <EngagementCard
          percentage="68%"
          description="Engaged in the last"
          period="30 days"
        />
        <EngagementCard
          percentage="36%"
          description="Engaged in the last"
          period="7 days"
        />
        <EngagementCard
          percentage="9,863"
          description="Newsletter subscribers"
          period=""
        />
      </Group>
    </Paper>
  );
}