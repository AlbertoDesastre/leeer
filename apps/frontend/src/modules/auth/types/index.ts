export interface BasicUser {
  email: string;
  token: string;
}

export interface User extends Omit<BasicUser, "token"> {
  user_id: string;
  nickname: string;
  profile_picture: string;
  description: string;
}
