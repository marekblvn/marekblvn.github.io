import { Meta, StoryObj } from "@storybook/react";
import Taskbar from "./Taskbar";

const meta: Meta<typeof Taskbar> = {
  component: Taskbar,
  title: "Composite Components/Navigation/Taskbar",
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
  render: () => {
    return (
      <div style={{ width: "500px" }}>
        <Taskbar />
      </div>
    );
  },
};
