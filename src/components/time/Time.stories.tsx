import { Meta, StoryObj } from "@storybook/react";
import Time from "./Time";

const meta: Meta<typeof Time> = {
  component: Time,
  title: "Elementary Components/Time",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    backgrounds: {
      default: "desktop",
    },
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
