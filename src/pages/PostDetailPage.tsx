import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPostById, updatePostById } from '../services/PostsService';
import { Link } from 'react-router-dom';
import '../assets/styles/PostDetailStyle.css';

const PostDetailPage: React.FC = () => {
    const [post, setPost] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPostDetail();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            navigateToHome();
        }
    };

    const navigateToHome = () => {
        window.location.href = '/posts';
    };

    const fetchPostDetail = async () => {
        try {
            const postId = getPostId();
            const post = await getPostById(postId);
            setPost(post);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post detail:', error);
            setLoading(false);
        }
    };

    const getPostId = () => {
        const url = new URL(window.location.href);
        const pathname = url.pathname;
        const pathParts = pathname.split('/');
        const postIndex = pathParts.indexOf('post');
        return pathParts[postIndex + 1];
    };

    const markAsRead = async () => {
        if (post) {
            post.alreadyRead = true;
            const updatedPost = await updatePostById(post.id, post);
            console.log('updatedPost', updatedPost);
            setPost(updatedPost);
        }
    };

    return (
        <div className="container post-detail">
            {loading ? (
                <LoadingSpinner />
            ) : post ? (
                <>
                    <h2 id="post-title">{post.title}</h2>
                    <hr className="mb-4 mt-2" />
                    <div>
                        <h2 className="post-detail-title">{post.subTitle}</h2>
                        <span className="post-title">Author: {post.author}</span> <br />
                        <span className="font-italic">Category: {post.category}</span> <br />
                        <span className="post-title">{post.alreadyRead ? 'Already read' : ''}</span>
                        <p>{post.description}</p>
                        <div className="d-flex gap-2">
                            <Link to="/posts" className="btn back-button btn-primary">
                                Back to Home
                            </Link>
                            <button
                                id="markAsRead"
                                disabled={post.alreadyRead}
                                onClick={markAsRead}
                                className="btn back-button btn-primary"
                            >
                                Mark as read
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>No data found for this post.</p>
            )}
        </div>
    );
};

export default PostDetailPage;
