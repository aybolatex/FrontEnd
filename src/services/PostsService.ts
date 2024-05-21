import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3004/posts';

export const getPosts = async (params: any): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(API_URL, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (postId: any): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post detail:', error);
        throw error;
    }
};

export const createPost = async (formData: any): Promise<any> => {
    try {
        return await axios.post(API_URL, formData);
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePostById = async (postId: any, formData: any): Promise<any> => {
    try {
        await axios.put(`${API_URL}/${postId}`, formData);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const deletePost = async (postId: number): Promise<any> => {
    try {
        return await axios.delete(`${API_URL}/${postId}`);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
