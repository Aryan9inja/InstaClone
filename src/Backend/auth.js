import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_endpoint)
      .setProject(conf.appwrite_project);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      ); 

      if (user) {
        return this.login({ email, password });
      }

      return user;
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log("Appwrite serive :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      
      if (Object.keys(user).length === 0) return "No user";
      
      return user;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return "No user";
    }
  }
  

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService=new AuthService()
export default authService