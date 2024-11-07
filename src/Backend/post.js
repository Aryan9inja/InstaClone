import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class PostService {
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

  async createPost({ userId, postImage, likeCount, caption, creationTime }) {
    try {
      return await this.database.createDocument(
        conf.appwrite_database,
        conf.appwrite_collection_postData,
        ID.unique(),
        {
          userId,
          postImage,
          likeCount,
          caption,
          creationTime,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async allPosts() {
    try {
      return await this.database.listDocuments(
        conf.appwrite_database, 
        conf.appwrite_collection_postData,
        [Query.orderDesc("creationTime")]
      );
    } catch (error) {
      console.log("Appwrite serive :: allPosts :: error", error);
    }
  }

  async userPosts(userId) {
    try {
      return await this.database.listDocuments(
        conf.appwrite_database,
        conf.appwrite_collection_postData,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite serive :: userPosts :: error", error);
    }
  }

  async updatePost(postId, caption) {
    try {
      return await this.database.updateDocument(
        conf.appwrite_database,
        conf.appwrite_collection_postData,
        postId,
        {
          caption,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async updateLikes(postId, likeCount) {
    try {
      return await this.database.updateDocument(
        conf.appwrite_database,
        conf.appwrite_collection_postData,
        postId,
        {
          likeCount,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updateLikes :: error", error);
    }
  }

  async deletePost(postId, postImageId) {
    try {
      await this.database.deleteDocument(
        conf.appwrite_database,
        conf.appwrite_collection_postData,
        postId
      );

      await this.deletePostImage(postImageId);

      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async uploadPostImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_bucket_post,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadPostImage :: error", error);
    }
  }

  async deletePostImage(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwrite_bucket_post, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePostImage :: error", error);
    }
  }

  postImagePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwrite_bucket_post, fileId);
    } catch (error) {
      console.log("Appwrite serive :: postImagePreview :: error", error);
    }
  }
}

const postService = new PostService();
export default postService;
