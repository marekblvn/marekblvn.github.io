import { Meta, StoryObj } from "@storybook/react";
import Start from "./Start";

const meta: Meta<typeof Start> = {
  component: Start,
  title: "Start",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    backgrounds: { default: "desktop" },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
