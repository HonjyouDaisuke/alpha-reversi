interface Props {
	message: string | undefined;
	useSpinner: boolean;
}
function Spinner() {
	return (
		<div className="animate-ping h-4 w-4 bg-blue-600 rounded-full" />
	)
}
export default function MessageBoard({ message, useSpinner }: Props) {
	return (
		<div className="shadow rounded h-12 items-center w-full bg-blue-200">
			<div className="flex flex-row gap-4 w-full justify-center h-12 items-center">
				{message}{useSpinner && <Spinner />}
			</div>
		</div>
	);
}