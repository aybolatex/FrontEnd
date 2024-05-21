import React, { useEffect, useState } from 'react';
import { deletePost, getPosts } from '../services/PostsService';
import { Link } from 'react-router-dom';
import Notice from '../components/Notice';

interface Post {
    id: number;
    title: string;
    author: string;
    category: string;
    createdAt: string;
}

interface NoticeProps {
    status: 'success' | 'danger';
    message: string;
    visible: boolean;
}

const ManagePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [notice, setNotice] = useState<NoticeProps>({ status: 'success', message: '', visible: false });

    useEffect(() => {
        fetchPosts();
    }, [posts]);


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const params = {};
            const posts = await getPosts(params);
            setPosts(posts);
        } catch (error) {
            setLoading(false);
        }
    };

    const onDelete = async (postId: number) => {
        try {
            const response = await deletePost(postId);
            if (response.status === 200) {
                setNotice({ status: 'success', message: 'Post deleted successfully', visible: true });
                const posts = await getPosts({});
                setPosts(posts);
                setLoading(false);
            } else {
                setLoading(false);
                setNotice({ status: 'danger', message: 'Failed to delete post', visible: true });
            }
        } catch (error) {
            setLoading(false);
            setNotice({ status: 'danger', message: 'An error occurred while deleting post', visible: true });
        }
    };

    return (
        <div className="container mt-5">
            <Notice {...notice} onClose={() => setNotice({ ...notice, visible: false })} />
            <h2>Manage posts</h2>
            <hr className="mb-4 mt-2" />
            <div className="d-flex justify-content-end">
                <Link type="button" className="btn btn-primary mb-2" to="/manage/posts/create">
                    Create
                </Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr key={post.id}>
                        <td width="50px" scope="row">{index + 1}</td>
                        <td width="100px">{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{post.category}</td>
                        <td width="230px">{post.createdAt}</td>
                        <td width="100px">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                <Link to={`/manage/posts/edit/${post.id}`} type="button" className="btn btn-outline-dark">
                                    Edit
                                </Link>
                                <button type="button" className="btn btn-danger" onClick={() => onDelete(post.id)}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePage;
