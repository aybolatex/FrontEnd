import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { createPost, getPostById, updatePostById } from "../services/PostsService";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";

interface FormData {
    title: string;
    subTitle: string;
    category: string;
    author: string;
    description: string;
}

const CreatePostPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [postId] = useState<string | null>(getPostId());
    const [formData, setFormData] = useState<FormData>({
        title: '',
        subTitle: '',
        category: '',
        author: '',
        description: '',
    });
    const [notice, setNotice] = useState<any>({ status: '', message: '', visible: false });

    useEffect(() => {
        fetchPostDetail();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData && postId) {
            updatePost(postId, formData);
        } else if (formData) {
            createNewPost(formData);
        }
    };

    const fetchPostDetail = async () => {
        setLoading(true);
        try {
            if (postId) {
                const post = await getPostById(postId);
                setFormData(post);
            }
        } catch (error) {
            console.error('Error fetching post detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNewPost = async (formData: any) => {
        try {
            formData.createdAt = new Date().toLocaleString("kk-KZ", { timeZone: "Asia/Almaty" });
            const res = await createPost(formData);
            if (res.status === 201) {
                const savedPost = res.data;
                setNotice({ status: 'success', message: 'Post created successfully', visible: true });
                setFormData(savedPost);
            } else {
                setNotice({ status: 'danger', message: 'Failed to create post', visible: true });
            }
        } catch (error) {
            setNotice({ status: 'danger', message: 'Failed to create post', visible: true });
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (postId: string, formData: any) => {
        try {
            formData.updatedAt = new Date().toLocaleString("kk-KZ", { timeZone: "Asia/Almaty" });
            const res = await updatePostById(postId, formData);
            if (res.status === 200) {
                const savedPost = res.data;
                setNotice({ status: 'success', message: 'Post updated successfully', visible: true });
                setFormData(savedPost);
            } else {
                setNotice({ status: 'danger', message: 'Failed to update post', visible: true });
            }
        } catch (error) {
            setNotice({ status: 'danger', message: 'Failed to update post', visible: true });
        } finally {
            setLoading(false);
        }
    };

    function getPostId() {
        const url = new URL(window.location.href);
        const pathname = url.pathname;
        const pathParts = pathname.split('/');
        const postIndex = pathParts.indexOf('edit');
        return pathParts[postIndex + 1];
    }

    return (
        <div className="container mt-5">
            <Notice {...notice} onClose={() => setNotice({ ...notice, visible: false })} />
            {!postId ? <h2>Create post</h2> : <h2>Edit post</h2>}
            <hr className="mb-4 mt-2"/>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit}
                          className="needs-validation"
                          style={{minWidth: "600px"}}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Sub title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="subTitle"
                                value={formData.subTitle}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="form-control"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option></option>
                                <option>UI/UX</option>
                                <option>React</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                className="form-control"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="d-flex gap-2 justify-content-end mt-2">
                            <Link to="/manage/posts" className="btn btn-secondary mb-2">
                                Back
                            </Link>
                            <button type="submit" className="btn btn-primary mb-2">
                                {!postId ? 'Create' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePostPage;
