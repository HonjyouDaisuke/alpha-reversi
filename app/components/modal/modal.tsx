import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import CloseButton from "./close-button";

type Props = ComponentProps<"div"> & {
  open?: boolean;
  staticBackdrop?: boolean;
  onModalClose?: () => void;
  slots?: { header?: ReactNode; footer?: ReactNode };
  slotClasses?: { header?: string; body?: string; footer?: string };
};

export default function Modal({
  children,
  open = false,
  staticBackdrop = false,
  onModalClose,
  slots = {},
  slotClasses = {},
  className,
  ...props
}: Props) {
  const backdropClass = clsx(
    "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/50",
    className
  );
  const headerClass = clsx(
    "flex items-center justify-between p-4",
    onModalClose ? "mt-4" : "",
    "header" in slotClasses ? slotClasses.header : ""
  );
  const bodyClass = clsx("p-4", "body" in slotClasses ? slotClasses.body : "");
  const footerClass = clsx(
    "flex items-center justify-end gap-3 p-4 rounded-b",
    "footer" in slotClasses ? slotClasses.footer : ""
  );

  return (
    open && (
      <div
        tabIndex={-1}
        role="button"
        onClick={staticBackdrop ? undefined : onModalClose}
        aria-hidden={open}
        className={backdropClass}
        {...props}
      >
        <div
          className="relative p-4 w-full max-w-2xl max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-slate-500 rounded-lg shadow p-4">
            {/* Header */}
            {"header" in slots && (
              <div className={headerClass}>{slots.header}</div>
            )}
            {onModalClose && <CloseButton onClick={onModalClose} />}
            {/* Body */}
            <div className={bodyClass}>{children}</div>
            {/* Footer */}
            {"footer" in slots && (
              <div className={footerClass}>{slots.footer}</div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
