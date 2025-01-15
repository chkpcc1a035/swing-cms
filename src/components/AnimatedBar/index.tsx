import { useState } from "react";
import { ActionIcon, Group, Divider, Box, rem, Tooltip } from "@mantine/core";
import { IconPlus, IconDownload, IconUpload } from "@tabler/icons-react";
import { keyframes } from "@emotion/react";
import { RxCross1, RxFilePlus } from "react-icons/rx";
import { BsFiletypeCsv } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { VscRefresh } from "react-icons/vsc";

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(10px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const ExpandedActionBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = (action: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Clicked ${action} button`);
    // Add your action handlers here
    switch (action) {
      case "edit":
        console.log("Editing item...");
        break;
      case "delete":
        console.log("Deleting item...");
        break;
      case "download":
        console.log("Downloading item...");
        break;
      case "upload":
        console.log("Uploading item...");
        break;
      case "close":
        setIsExpanded(false);
        break;
    }
  };

  const icons = [
    {
      Icon: BsFiletypeCsv,
      label: "Batch Uploads",
      tooltip: "Upload multiple items at once by CSV",
    },
    {
      Icon: RxFilePlus,
      label: "Add One Item",
      tooltip: "Add single item record",
    },
    {
      Icon: IconDownload,
      label: "Export",
      tooltip: "Export All Item Records Into CSV",
    },
    { Icon: VscRefresh, label: "Refresh", tooltip: "Refresh Item Records" },
    { Icon: RxCross1, label: "close", tooltip: "Close Menu" },
  ];

  return (
    <ActionIcon
      variant="filled"
      color="green"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        width: isExpanded ? rem(384) : rem(64),
        height: rem(64),
        borderRadius: isExpanded ? rem(12) : rem(26),
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Group
        gap={16}
        justify="center"
        w="100%"
        h="100%"
        style={{
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      >
        {icons.map(({ Icon, label, tooltip }, index) => (
          <Box
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              animation: isExpanded
                ? `${fadeInUp} 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                : "none",
              animationDelay: `${index * 50}ms`,
            }}
          >
            <Tooltip label={tooltip} position="bottom">
              <ActionIcon
                variant="transparent"
                color="white"
                size={42}
                onClick={handleIconClick(label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "8px",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Icon size={24} stroke="1.5" />
              </ActionIcon>
            </Tooltip>
            {index < icons.length - 1 && (
              <Divider
                orientation="vertical"
                color="gray.1"
                style={{
                  height: rem(40),
                }}
              />
            )}
          </Box>
        ))}
      </Group>
      <IconPlus
        size={32}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 200ms ease",
          pointerEvents: isExpanded ? "none" : "auto",
        }}
      />
    </ActionIcon>
  );
};

export default ExpandedActionBar;
