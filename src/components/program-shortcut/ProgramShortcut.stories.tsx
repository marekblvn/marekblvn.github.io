import { Meta, StoryObj } from "@storybook/react";
import ProgramShortcut from "./ProgramShortcut";

const meta: Meta<typeof ProgramShortcut> = {
  component: ProgramShortcut,
  title: "Elementary Components/Navigation/Program Shortcut",
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
    label: "Program",
    icon: "folder",
    onDoubleClick: () => console.log("Click"),
  },
};
