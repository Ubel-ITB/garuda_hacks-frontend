export interface IUser {
  username: string;
  password: string;
  displayName: string;
  role: "citizen" | "officer" | "admin" | "publisher";
}
