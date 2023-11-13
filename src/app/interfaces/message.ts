import { Time } from "@angular/common";

export interface Message {
	fireId?: any;
	timestamp: any;
	date: any;
	time: any;
	year: any;
	writerName: string;
	writerImg: string;
	writerId: string;
	reactions : Array<{
		item: string,
		amount: number
	}>;
	text: string;
	answerAmount?: number;
	lastAnswerTime?: string;
}
