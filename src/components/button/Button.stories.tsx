import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "./Button";
import folderIcon from "../../assets/icons/16x16/folder.png";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Elementary Components/Controls/Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    label: "Button",
    children: null,
    onClick: fn(),
  },
  parameters: {
    backgrounds: { default: "desktop" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
    children: null,
    onClick: fn(),
  },
};

export const WithIcon: Story = {
  args: {
    label: "Button",
    children: null,
    onClick: fn(),
    icon: folderIcon,
  },
};

export const Disabled: Story = {
  args: {
    label: "Button",
    children: null,
    onClick: fn(),
    disabled: true,
  },
};
