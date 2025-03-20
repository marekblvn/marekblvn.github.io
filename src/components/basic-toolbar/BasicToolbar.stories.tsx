import { Meta, StoryObj } from "@storybook/react";
import BasicToolbar from "./BasicToolbar";
import {
  DefaultEditMenu,
  DefaultFavoritesMenu,
  DefaultFileMenu,
  DefaultGoMenu,
  DefaultHelpMenu,
  DefaultToolsMenu,
  DefaultViewMenu,
} from "../../data/menu-data";

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
  args: {
    menuItems: [
      DefaultFileMenu,
      DefaultEditMenu,
      DefaultViewMenu,
      DefaultGoMenu,
      DefaultFavoritesMenu,
      DefaultToolsMenu,
      DefaultHelpMenu,
    ],
  },
};
