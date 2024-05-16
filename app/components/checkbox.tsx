import React, { ReactNode, useState } from "react";

interface Props {
  value: boolean;
  label: string;
  onChange: (e: React.FormEvent) => void;
}

interface CheckProps {
  value: boolean;
  onChange: (e: React.FormEvent) => void;
}
function Check({ value, onChange }: CheckProps) {
  const classesStr =
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  if (value === true) {
    return (
      <input
        checked
        className={classesStr}
        type="checkbox"
        value=""
        onChange={onChange}
        id="checkbox"
      />
    );
  } else {
    return (
      <input
        className={classesStr}
        type="checkbox"
        value=""
        onChange={onChange}
        id="checkbox"
      />
    );
  }
}
export default function CheckBox({ value, label, onChange }: Props) {
  const [isChecked, setIsChecked] = useState(value);
  return (
    <div>
      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <Check value={isChecked} onChange={onChange} />
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="checkbox"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
