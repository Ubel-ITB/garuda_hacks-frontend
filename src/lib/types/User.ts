export interface IUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  role: "citizen" | "officer" | "admin" | "publisher";
}

export interface IUserForm {
  username: string;
  password: string;
  displayName?: string;
  role: "citizen" | "officer" | "admin" | "publisher";
}
