import { Time } from "@angular/common";

export interface Message {
	timestamp: any;
	date: any;
	time: any;
	year: any;
	writerName: string;
	writerImg: string;
	writerId: string;
	reactions: string;
	text: string;
	answerAmount?: number;
	lastAnswerTime?: string;
}
