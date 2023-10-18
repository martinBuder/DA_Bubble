export interface ChannelConfig {
	channelName: string;
	description: string;
	usersAmount: number;
	admins: Array<string>;
	creator: string; 
	members: Array<string>;
}
