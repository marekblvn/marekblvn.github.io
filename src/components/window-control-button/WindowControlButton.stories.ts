import { Meta, StoryObj } from "@storybook/react";
import WindowControlButton from "./WindowControlButton";

const meta: Meta<typeof WindowControlButton> = {
  component: WindowControlButton,
  title: "Elementary Components/Controls/Window Control Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    icon: "close",
  },
  argTypes: {
    icon: {
      description: "Icon code",
      table: {
        type: {
          summary: "'minimize' | 'maximize' | 'normize' | 'close' | 'help'",
        },
      },
    },
  },
  parameters: {
    backgrounds: { default: "desktop" },
    docs: {
      description: {
        component: "Control button for Window.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
