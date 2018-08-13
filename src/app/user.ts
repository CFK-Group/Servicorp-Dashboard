export class User {
    username: string;
    password: string;
    userToken?: string;
    userId?: number;
  
    constructor(username: string, password: string){
      this.username = username;
      this.password = password;
    }
  }
  