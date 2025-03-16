import { Meta, StoryObj } from "@storybook/react";
import StartButton from "./StartButton";

const meta: Meta<typeof StartButton> = {
  component: StartButton,
  title: "Elementary Components/Controls/Start Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    backgrounds: { default: "desktop" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
