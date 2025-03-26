import { Meta, StoryObj } from "@storybook/react";
import WindowTools from "./WindowTools";
import BasicToolbar from "../basic-toolbar/BasicToolbar";
import DirectoryToolbar from "../directory-toolbar/DirectoryToolbar";
import { DefaultMenu } from "../../data/menu-data";
import AddressToolbar from "../address-toolbar/AddressToolbar";

const meta: Meta<typeof WindowTools> = {
  component: WindowTools,
  title: "Composite Components/Window/Window Tools",
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
    children: {},
  },
  render: () => {
    return (
      <WindowTools>
        <BasicToolbar menuItems={DefaultMenu} />
        <DirectoryToolbar />
        <AddressToolbar />
      </WindowTools>
    );
  },
};
