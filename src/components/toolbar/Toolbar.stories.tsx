import { Meta, StoryObj } from "@storybook/react";
import Toolbar from "./Toolbar";
import BasicToolbar from "../basic-toolbar/BasicToolbar";
import { DefaultMenu } from "../../data/menu-data";
import DirectoryToolbar from "../directory-toolbar/DirectoryToolbar";
import WindowTools from "../window-tools/WindowTools";

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: "Elementary Components/Controls/Toolbar",
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
    children: <BasicToolbar menuItems={DefaultMenu} />,
  },
};

export const Multiple: Story = {
  args: {
    children: [
      <BasicToolbar key={0} menuItems={DefaultMenu} />,
      <DirectoryToolbar key={1} />,
    ],
  },
  render: (args) => {
    return <WindowTools>{args.children}</WindowTools>;
  },
};
