import { Meta, StoryObj } from "@storybook/react";
import Window from "./Window";
import BasicToolbar from "../basic-toolbar/BasicToolbar";
import DirectoryToolbar from "../directory-toolbar/DirectoryToolbar";
import { DefaultMenu } from "../../data/menu-data";

const meta: Meta<typeof Window> = {
  component: Window,
  title: "Composite Components/Window/Window",
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
        }}
      >
        <Window
          icon="folder-open"
          controls={["minimize", "maximize", "close"]}
          onClose={() => {}}
          toolbars={[<BasicToolbar key={0} menuItems={DefaultMenu} />]}
        />
      </div>
    );
  },
};

export const MultiTools: Story = {
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
        }}
      >
        <Window
          icon="folder-open"
          controls={["minimize", "maximize", "close"]}
          onClose={() => {}}
          toolbars={[
            <BasicToolbar key={0} menuItems={DefaultMenu} />,
            <DirectoryToolbar key={1} />,
          ]}
        />
      </div>
    );
  },
};
