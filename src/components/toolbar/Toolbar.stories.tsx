import { Meta, StoryObj } from "@storybook/react";
import Toolbar from "./Toolbar";
import BasicToolbar from "../basic-toolbar/BasicToolbar";

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: "Elementary Components/Controls/Toolbar",
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
    children: <BasicToolbar />,
  },
};
