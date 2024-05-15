import { MessageType } from "./message-type";

export class Message {
  messageData: MessageType = { message: null, useSpinner: false };

  constructor() {
    this.messageData.message = null;
    this.messageData.useSpinner = false;
  }

  setMessage(message: string, useSpinner: boolean) {
    this.messageData.message = message;
    this.messageData.useSpinner = useSpinner;
  }

  getMessage(): MessageType {
    return this.messageData;
  }
}
