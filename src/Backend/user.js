import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class UserService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_endpoint)
      .setProject(conf.appwrite_project);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createUser({ userId, profileImage, username, name }) {
    try {
      const existingUser = await this.database.listDocuments(
        conf.appwrite_database,
        conf.appwrite_collection_userData,
        [Query.equal("username", username)]
      );

      if (existingUser.total > 0) {
        throw new Error(
          "Username already exists. Please choose a different one."
        );
      }

      return await this.database.createDocument(
        conf.appwrite_database,
        conf.appwrite_collection_userData,
        ID.unique(),
        {
          userId,
          profileImage,
          username,
          name,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createUser :: error", error);
      throw error;
    }
  }

  async userData(userId) {
    try {
      const user = await this.database.listDocuments(
        conf.appwrite_database,
        conf.appwrite_collection_userData,
        [Query.equal("userId", userId)]
      );
      return user.documents[0];
    } catch (error) {
      console.log("Appwrite serive :: userPosts :: error", error);
    }
  }


  //wrong
  async updateUserData(userDocId, { profileImage, username, name }) {
    try {
      conf.appwrite_database,
        conf.appwrite_collection_userData,
        userDocId,
        {
          profileImage,
          username,
          name,
        };
    } catch (error) {
      console.log("Appwrite serive :: updateUserData :: error", error);
    }
  }

  async uploadUserImage(file){
    try {
      const create= await this.bucket.createFile(
        conf.appwrite_bucket_profileImg,
        ID.unique(),
        file
      )
      console.log(create)
      return(create)
    } catch (error) {
      console.log("Appwrite serive :: uploadUserImage :: error", error);
    }
  }

  async deleteUserImage(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwrite_bucket_profileImg, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteUserImage :: error", error);
    }
  }

  userImagePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwrite_bucket_profileImg, fileId);
    } catch (error) {
      console.log("Appwrite serive :: userImagePreview :: error", error);
    }
  }
}

const userService = new UserService();
export default userService;
