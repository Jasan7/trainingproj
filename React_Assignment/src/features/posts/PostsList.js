import { useSelector } from "react-redux";
import { selectAllPosts, getPostStatus, getPostsError } from "./postsSlice";
import React from 'react'
import PostsExcert from "./PostsExcert";

const PostsList = () => {
  
  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostStatus)
  const error = useSelector(getPostsError)

  let content;
  if(postsStatus === 'loading'){
    content = <p></p>
  }else if(postsStatus === 'succeeded'){
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostsExcert key={post.id} post={post}/>)
  } else if(postsStatus === 'failed'){
    content = <p>{error}</p>
  }
 
    return (
        <section>
            {content}
        </section>
  )
}

export default PostsList
