import { Meta, StoryObj } from "@storybook/react";
import WindowTitleBar from "./WindowTitleBar";

const meta: Meta<typeof WindowTitleBar> = {
  component: WindowTitleBar,
  title: "Composite Components/Window/Window Title Bar",
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
    title: "Window",
  },
};
