export interface ChannelConfig {
	userIDs: Array<string>;
	channelName: string;
	description: string;
	usersAmount: number;
	admins: Array<string>;
	creator: string; 
	members: Array<{string}>;
}
