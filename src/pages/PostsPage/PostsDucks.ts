import { createReducer, createAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from "axios";
import { Dispatch } from 'redux';

const API_URL = 'http://localhost:3004/posts';

interface State {
    posts: any;
    favoritePosts: any;
    loading: boolean;
}

// Define action types
export const postsModule = 'postsModule';
const SET_POSTS = `${postsModule}/SET_POSTS`;
const SET_TO_FAVORITE = `${postsModule}/SET_TO_FAVORITE`;
const UNSET_TO_FAVORITE = `${postsModule}/UNSET_TO_FAVORITE`;
const LOADING = `${postsModule}/LOADING`;

// Define actions
const setPosts = createAction<any>(SET_POSTS);
const setLoading = createAction<boolean>(LOADING);
const setToFavorite = createAction<any>(SET_TO_FAVORITE);
const unsetToFavorite = createAction<any>(UNSET_TO_FAVORITE);

// Define your initial state
const initialState: State = {
    posts: [],
    favoritePosts: [],
    loading: false
};

// Define your reducer
const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setPosts, (state, action) => {
            state.posts = action.payload;
        })
        .addCase(setLoading, (state, action) => {
            state.loading = action.payload;
        })
        .addCase(setToFavorite, (state, action) => {
            state.favoritePosts.push(action.payload);
        })
        .addCase(unsetToFavorite, (state, action) => {
            state.favoritePosts = state.favoritePosts.filter((item: any) => item.id !== action.payload.id);
        });
});

// Define thunk actions with proper types
export const fetchPosts = (filter: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response: AxiosResponse<any> = await axios.get(API_URL, {
            params: filter
        });
        dispatch(setPosts(response.data));
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const setToFavorites = (post: any) => (dispatch: Dispatch) => {
    dispatch(setToFavorite(post));
};

export const unsetInFavorites = (post: any) => (dispatch: Dispatch) => {
    dispatch(unsetToFavorite(post));
};

export default reducer;
