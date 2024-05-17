import { Message } from './message';
import { MessageType } from './message-type';

describe('Message', () => {
	let message: Message;

	beforeEach(() => {
		message = new Message();
	});

	it('setMessage should set message data correctly', () => {
		const testMessage = 'Test message';
		const testSpinner = true;

		message.setMessage(testMessage, testSpinner);

		const messageData: MessageType = message.getMessage();

		expect(messageData.message).toBe(testMessage);
		expect(messageData.useSpinner).toBe(testSpinner);
	});

	it('getMessage should return message data', () => {
		const initialMessageData: MessageType = { message: null, useSpinner: false };

		const messageData: MessageType = message.getMessage();

		expect(messageData).toEqual(initialMessageData);
	});
});
