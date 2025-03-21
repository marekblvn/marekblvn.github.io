import { Meta, StoryObj } from "@storybook/react";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Elementary Components/Controls/Icon Button",
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
    icon: "folder",
    size: "small",
  },
};
