export interface Menu {
  label?: string;
  isDisabled?: boolean;
  children?: Array<Submenu>;
}

export interface Submenu {
  label?: string;
  isDisabled?: boolean;
  children?: Array<Submenu>;
  isDivider?: true;
  keyShortcut?: string;
  icon?: string;
}

export const DefaultFileMenu: Menu = {
  label: "File",
  isDisabled: false,
  children: [
    {
      label: "New",
      isDisabled: false,
    },
    {
      isDivider: true,
    },
    {
      label: "Create Shortcut",
      isDisabled: true,
    },
    {
      label: "Delete",
      isDisabled: false,
    },
    {
      label: "Rename",
      isDisabled: false,
    },
    {
      label: "Properties",
      isDisabled: true,
    },
    { isDivider: true },
    {
      label: "Work Offline",
      isDisabled: false,
    },
    {
      label: "Close",
      isDisabled: false,
    },
  ],
};

export const DefaultEditMenu: Menu = {
  label: "Edit",
  isDisabled: false,
  children: [
    { label: "Undo", isDisabled: true },
    { isDivider: true },
    { label: "Cut", isDisabled: true, keyShortcut: "Ctrl + X" },
    { label: "Copy", isDisabled: true, keyShortcut: "Ctrl + C" },
    { label: "Paste", isDisabled: true, keyShortcut: "Ctrl + V" },
    { label: "Paste Shortcut", isDisabled: true },
    { isDivider: true },
    { label: "Select All", isDisabled: false, keyShortcut: "Ctrl + A" },
    { label: "Invert Selection" },
  ],
};

export const DefaultViewMenu: Menu = {
  label: "View",
  isDisabled: false,
  children: [
    { label: "Toolbars" },
    { label: "Explorer Bar" },
    { isDivider: true },
    { label: "as Web Page" },
    { isDivider: true },
    { label: "Large Icons" },
    { label: "Small Icons" },
    { label: "List" },
    { label: "Details", isDisabled: true },
    { label: "Arrange Icons" },
    { label: "Line Up Icons", isDisabled: true },
    { isDivider: true },
    { label: "Refresh", keyShortcut: "F5" },
    { label: "Folder Options...", isDisabled: true },
  ],
};

export const DefaultGoMenu: Menu = {
  label: "Go",
  isDisabled: false,
  children: [
    { label: "Back", keyShortcut: "Alt + Left Arrow", isDisabled: true },
    { label: "Forward", keyShortcut: "Alt + Right Arrow", isDisabled: true },
    {
      label: "Up One Level",
    },
    { isDivider: true },
    { label: "Home Page", keyShortcut: "Alt + Home" },
    { label: "Channel Guide" },
    { label: "Search the Web" },
    { isDivider: true },
    { label: "My Computer" },
    { label: "Internet Call" },
  ],
};

export const DefaultFavoritesMenu: Menu = {
  label: "Favorites",
  isDisabled: false,
  children: [
    { label: "Add to Favorites...", isDisabled: true },
    { label: "Organize Favorites", isDisabled: true },
    { isDivider: true },
    { label: "(Empty)", isDisabled: true },
  ],
};

export const DefaultToolsMenu: Menu = {
  label: "Tools",
  isDisabled: false,
  children: [
    { label: "Find" },
    { isDivider: true },
    { label: "Map Network Drive...", isDisabled: true },
    { label: "Disconnect Network Drive...", isDisabled: true },
    { label: "Synchronize...", isDisabled: true },
  ],
};

export const DefaultHelpMenu: Menu = {
  label: "Help",
  isDisabled: false,
  children: [
    { label: "Help Topics", isDisabled: true },
    { isDivider: true },
    { label: "About..." },
  ],
};

export const DefaultMenu = [
  DefaultFileMenu,
  DefaultEditMenu,
  DefaultViewMenu,
  DefaultGoMenu,
  DefaultFavoritesMenu,
  DefaultToolsMenu,
  DefaultHelpMenu,
];
