import { Meta, StoryObj } from "@storybook/react";
import DirectoryToolbar from "./DirectoryToolbar";

const meta: Meta<typeof DirectoryToolbar> = {
  component: DirectoryToolbar,
  title: "Elementary Components/Controls/Directory Toolbar",
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

export const Overflown: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ maxWidth: "200px" }}>
        <DirectoryToolbar />
      </div>
    );
  },
};
