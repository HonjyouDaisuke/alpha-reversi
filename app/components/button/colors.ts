export type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export const COLOR_CLASSES: Colors = {
  primary:
    "bg-green-80 text-black hover:enabled:opacity-80 active:enabled:opacity-80 disabled:bg-gray-300",
  secondary:
    "bg-pink-80 border-accent text-accent hover:enabled:bg-accent/10 active:enabled:bg-accent/10 disabled:border-gray-300 disabled:text-gray-300",
  tertiary:
    "text-accent hover:enabled:bg-accent/10 active:enabled:bg-accent/10 disabled:text-gray-300",
};
