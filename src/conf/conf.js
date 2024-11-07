const conf = {
  appwrite_endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_database: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_collection_postData: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_POST_DATA
  ),
  appwrite_collection_userData: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_USER_DATA
  ),
  appwrite_bucket_post: String(import.meta.env.VITE_APPWRITE_BUCKET_POSTS),
  appwrite_bucket_profileImg: String(
    import.meta.env.VITE_APPWRITE_BUCKET_PROFILE_IMAGE
  ),
};

export default conf;
