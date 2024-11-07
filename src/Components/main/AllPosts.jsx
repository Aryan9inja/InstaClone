import React, { useEffect, useState } from 'react'
import postService from '../../Backend/post'
import Post from "./Post"

function AllPosts() {
    const [posts,setPosts]=useState([])

    useEffect(() => {
        postService.allPosts()
          .then((posts) => {
            if (posts) setPosts(posts.documents);
          })
          .catch((error) => console.error("Failed to fetch posts:", error));
      }, []);
      
    return (
        <>
        {posts.map((post)=>(
            <div
            key={post.$id}>
                <Post {...post}/>
            </div>
        ))}
        </>
    )
}

export default AllPosts
