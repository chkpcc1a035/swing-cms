import { MantineProvider, AppShell, Group, Title, Select } from '@mantine/core';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Layout/Sidebar';
import { MemberStats } from './components/Dashboard/MemberStats';
import { MRRStats } from './components/Dashboard/MRRStats';
import { EngagementStats } from './components/Dashboard/EngagementStats';
import { RecentPosts } from './components/Dashboard/RecentPosts';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        navbar={{ width: 300, breakpoint: 'sm' }}
        padding="md"
      >
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Group justify="space-between" mb="lg">
            <Title order={2}>Dashboard</Title>
            <Select
              defaultValue="30"
              data={[
                { value: '7', label: 'Past 7 days' },
                { value: '30', label: 'Past 30 days' },
                { value: '90', label: 'Past 90 days' }
              ]}
            />
          </Group>

          <div className="space-y-6">
            <MemberStats />
            <MRRStats />
            <EngagementStats />
            <RecentPosts />
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;