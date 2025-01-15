import { Table, Paper, Text } from '@mantine/core';

interface Post {
  title: string;
  sends: number;
  openRate: number;
}

const posts: Post[] = [
  {
    title: "Subscription business metrics explained for publishers",
    sends: 12984,
    openRate: 76
  },
  {
    title: "How to create a valuable offer that converts",
    sends: 11701,
    openRate: 92
  }
];

export function RecentPosts() {
  return (
    <Paper p="md" radius="md" withBorder>
      <Text mb="md">Recent posts</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>TITLE</Table.Th>
            <Table.Th>SENDS</Table.Th>
            <Table.Th>OPEN RATE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {posts.map((post) => (
            <Table.Tr key={post.title}>
              <Table.Td>{post.title}</Table.Td>
              <Table.Td>{post.sends.toLocaleString()}</Table.Td>
              <Table.Td>{post.openRate}%</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}