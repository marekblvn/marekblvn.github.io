import { Meta, StoryObj } from "@storybook/react";
import Window from "./Window";

const meta: Meta<typeof Window> = {
  component: Window,
  title: "Composite Components/Window",
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
    icon: "folder-open",
  },
  render: () => {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Window
          icon="folder-open"
          controls={["minimize", "maximize", "close"]}
          onClose={() => console.log("closing window")}
        />
      </div>
    );
  },
};
