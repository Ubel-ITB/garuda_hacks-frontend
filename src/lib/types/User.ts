export interface IUser {
  _id: string;
  profilePicUrl?: string;
  username: string;
  password: string;
  displayName: string;
  role?: "citizen" | "officer" | "admin" | "publisher";
}

export interface IUserForm {
  username?: string;
  profilePicUrl?: string;
  password?: string;
  displayName?: string;
  role?: "citizen" | "officer" | "admin" | "publisher";
}
