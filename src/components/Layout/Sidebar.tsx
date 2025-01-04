import { NavLink, Stack } from '@mantine/core';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Users, 
  Percent,
  ExternalLink,
  GhostIcon
} from 'lucide-react';

export function Sidebar() {
  return (
    <Stack gap="xs" p="md">
      <NavLink
        label="Ghost"
        leftSection={<GhostIcon size={20} />}
        variant="subtle"
        active
      />
      
      <NavLink
        label="Dashboard"
        leftSection={<LayoutDashboard size={16} />}
      />
      
      <NavLink
        label="View site"
        leftSection={<ExternalLink size={16} />}
      />

      <NavLink
        label="Posts"
        leftSection={<FileText size={16} />}
      />

      <NavLink
        label="Tags"
        leftSection={<Tags size={16} />}
      />

      <NavLink
        label="Members"
        leftSection={<Users size={16} />}
        rightSection={<span className="text-sm text-gray-500">13,041</span>}
      />

      <NavLink
        label="Offers"
        leftSection={<Percent size={16} />}
      />
    </Stack>
  );
}