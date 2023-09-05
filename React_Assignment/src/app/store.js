import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import postReducer from '../features/posts/postsSlice'

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: usersReducer
    }
})