import { Meta, StoryObj } from "@storybook/react";
import ToolMenu from "./ToolMenu";
import { DefaultFileMenu } from "../../data/menu-data";

const meta: Meta<typeof ToolMenu> = {
  component: ToolMenu,
  title: "Elementary Components/Controls/ToolMenu",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    backgrounds: { default: "desktop" },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    items: DefaultFileMenu.children,
  },
};
