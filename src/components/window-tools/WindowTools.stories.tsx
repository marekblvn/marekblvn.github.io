import { Meta, StoryObj } from "@storybook/react";
import WindowTools from "./WindowTools";
import BasicToolbar from "../basic-toolbar/BasicToolbar";
import Window from "../window/Window";

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
    children: [<BasicToolbar />, <BasicToolbar />],
  },
  render: (args) => {
    return <Window toolbars={args.children} />;
  },
};
