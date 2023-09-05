import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from './ReactionButton'
import { Link } from 'react-router-dom';

const PostsExcert = ({ post }) => {
    return (
        <article>
            <div className='heading'><h3>{post.title}</h3> <p className='postView'><Link to={`post/${post.id}`}>View Blog</Link></p></div>
            <p className='excert'>{post.body.substring(0, 75)}.....</p>
            <p className="postCredit">
                
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    )
}

export default PostsExcert
