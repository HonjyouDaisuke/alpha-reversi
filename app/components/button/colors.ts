export type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export const COLOR_CLASSES: Colors = {
  primary:
    "bg-accent text-white hover:enabled:opacity-80 active:enabled:opacity-80 disabled:bg-gray-300",
  secondary:
    "border border-accent text-accent hover:enabled:bg-accent/10 active:enabled:bg-accent/10 disabled:border-gray-300 disabled:text-gray-300",
  tertiary:
    "text-accent hover:enabled:bg-accent/10 active:enabled:bg-accent/10 disabled:text-gray-300",
};
