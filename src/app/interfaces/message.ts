import { Time } from "@angular/common";

export interface Message {
	id?: any;
	timestamp: any;
	date: any;
	numDate: any;
	time: any;
	year: any;
	writerName: string;
	writerImg: string;
	writerId: string;
	reactions : Array<{
		item: string,
		amount: number,
		reactionUsers: Array<{
			name: string,
			userId: any
		}>
	}>;
	text: string;
	lastEditedTime : {
		date: any;
		time: string;
		year: string
	} | null;
	answerAmount?: number;
	lastAnswerDate?: string | null;
	lastAnswerTime?: string | null;
	deletedMessage ?: boolean;
	threadExist ?: boolean;
}

