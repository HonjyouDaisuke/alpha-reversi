import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export default function CloseButton({ className, ...props }: Props) {
  const buttonClass = clsx(
    "text-gray-600 bg-gray-300 hover:text-gray-500 hover:bg-gray-200 bg-transparent rounded-full text-xs w-7 h-7 ms-auto inline-flex justify-center items-center absolute right-0 top-0 m-4",
    className
  );
  return (
    <button type="button" className={buttonClass} {...props}>
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
}
