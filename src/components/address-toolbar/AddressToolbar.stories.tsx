import { Meta, StoryObj } from "@storybook/react";
import AddressToolbar from "./AddressToolbar";

const meta: Meta<typeof AddressToolbar> = {
  component: AddressToolbar,
  title: "Elementary Components/Controls/Address Toolbar",
  tags: ["autodocs"],
  args: {
    address: "Desktop",
  },
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
    address: "Desktop",
  },
  render: ({ address }) => {
    return (
      <div
        style={{
          display: "grid",
          width: "300px",
        }}
      >
        <AddressToolbar address={address} />
      </div>
    );
  },
};
