import { useState } from "react";
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


const EditPostForm = () => {

    const {postId} = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if(!post){
        return (
            <section>
              <h2>Blog not Found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => {
        if(canSave){
            try{
                
                setRequestStatus('pending')
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }catch(err){
                console.error('Failed to save the post', err)
            }finally{
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option 
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section className="editblog">
            <h3>Edit Blog</h3>
            <form>
                <label htmlFor="postTitle">Blog Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <div className="editbuttons">
                <button
                    className="saveButton"
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Blog
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Blog
                </button>
                </div>
            </form>
        </section>
    )
}

export default EditPostForm
