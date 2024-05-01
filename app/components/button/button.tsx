import clsx from "clsx";
import type { ComponentProps } from "react";
import { Colors, COLOR_CLASSES } from "./colors";

type Props = ComponentProps<"button"> & {
  color?: keyof Colors;
};

export default function Button({
  children,
  className,
  type = "button",
  color = "primary",
  ...props
}: Props) {
  const colorClass = COLOR_CLASSES[color];

  return (
    <button
      className={clsx("py-2 px-4 rounded-full", colorClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
