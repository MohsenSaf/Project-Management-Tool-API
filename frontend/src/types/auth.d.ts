interface IUser {
  UserId: string;
  Username: string;
  Permission: Array<string>;
  expiration?: string | undefined;
}
interface IAuthContext {
  userInfo: IUser | null | undefined;
  isLogIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setUser: (value: IUser) => void;
  logOut: () => void;
}
