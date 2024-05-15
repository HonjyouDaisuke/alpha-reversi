import { ReactNode } from "react";

interface ButtonInfo {
	type?: 'submit' | 'reset' | 'button';
	mode: number;
	onClick: (e: React.FormEvent) => void;
	children: ReactNode;
}

const defaultProps: ButtonInfo = {
	type: 'button',
	mode: 1,
	onClick: () => { },
	children: 'Default Button',
};

export default function Button(props: ButtonInfo = defaultProps) {
	return (
		<div>
			<button
				onClick={props.onClick}
				type={props.type}
				className={`${props.mode === 0
					? 'bg-green-500 hover:bg-green-700 text-white shadow'
					: 'hover:bg-green-700 border-green-500 border text-secondary-500 shadow'
					} font-bold py-2 px-4 rounded`}>
				{props.children}
			</button>
		</div>
	);
}