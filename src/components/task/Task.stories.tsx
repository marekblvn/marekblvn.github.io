import { Meta, StoryObj } from "@storybook/react";
import Task from "./Task";

const meta: Meta<typeof Task> = {
  component: Task,
  title: "Elementary Components/Navigation/Task",
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
  args: {},
};
