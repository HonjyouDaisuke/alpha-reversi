import { MessageType } from "@/entity/message/message-type";

interface Props {
  messageData: MessageType;
}
function Spinner() {
  return <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full" />;
}
export default function MessageBoard({ messageData }: Props) {
  return (
    <div className="shadow rounded h-12 items-center w-full bg-blue-200">
      <div className="flex flex-row gap-4 w-full justify-center h-12 items-center">
        {messageData.message}
        {messageData.useSpinner && <Spinner />}
      </div>
    </div>
  );
}
