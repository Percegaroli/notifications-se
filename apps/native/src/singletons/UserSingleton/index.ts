export class UserSingleton {
  private static instance: UserSingleton;
  private email: string;

  constructor() {
    this.email = "";
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }

  public static getInstance() {
    if (UserSingleton.instance) return UserSingleton.instance;
    UserSingleton.instance = new UserSingleton();
    return UserSingleton.getInstance();
  }
}
