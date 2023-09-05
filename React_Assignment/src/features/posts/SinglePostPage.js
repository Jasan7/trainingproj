import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Blog not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <div className='heading'><h3>{post.title}</h3> <p className='postView'><Link to={`/post/edit/${post.id}`}>Edit Blog</Link></p></div>
            <p>{post.body}</p>
            <p className="postCredit">
                
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    )
}

export default SinglePostPage