export interface UserProfile {

		userName: string;
		userImg: string;
		id: string;
		userOnline: boolean;
		dataKey?: string;
		userMail?: string;
	[key: string]: any;
}
