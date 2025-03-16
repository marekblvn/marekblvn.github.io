import { Meta, StoryObj } from "@storybook/react";
import Start from "./Start";

const meta: Meta<typeof Start> = {
  component: Start,
  title: "Composite Components/Navigation/Start",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    backgrounds: { default: "desktop" },
    layout: "centered",
  },
  render: () => {
    return (
      <div
        style={{
          position: "fixed",
          left: "32px",
          bottom: "32px",
          height: "500px",
        }}
      >
        <Start />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div
        style={{
          position: "fixed",
          left: "32px",
          bottom: "32px",
        }}
      >
        <Start />
      </div>
    );
  },
};
