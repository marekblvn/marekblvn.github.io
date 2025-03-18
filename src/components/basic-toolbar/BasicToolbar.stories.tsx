import { Meta, StoryObj } from "@storybook/react";
import BasicToolbar from "./BasicToolbar";

const meta: Meta<typeof BasicToolbar> = {
  component: BasicToolbar,
  title: "Elementary Components/Controls/Basic Toolbar",
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
