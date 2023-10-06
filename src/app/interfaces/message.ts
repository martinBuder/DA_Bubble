import { Time } from "@angular/common";

export interface Message {
	date: Date;
	time: Time;
	writerName: string;
	writerImg: string;
	reactions: string;
	messageToken: string;
	text: string;
}
