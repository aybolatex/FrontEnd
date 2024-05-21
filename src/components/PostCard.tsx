import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postsModule, setToFavorites, unsetInFavorites } from "../pages/PostsPage/PostsDucks";

const PostCard: React.FC<{ post: any }> = ({ post }) => {
    const dispatch = useDispatch();
    const { favoritePosts } = useSelector((state: any) => state[postsModule]);

    return (
        <li className="list-group-item">
            <div className="row">
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3>{post.title}</h3>
                            <span className="font-italic">{post.category}</span>
                        </div>
                        <div>
                            <span className="font-italic">{post.alreadyRead ? 'Already read' : ''}</span>
                        </div>
                    </div>
                    <p>{post.subTitle}</p>
                    <Link to={`/post/${post.id}`} className="btn btn-primary mr-1">
                        Read More
                    </Link>
                    {!favoritePosts.some((item: any) => item.id === post.id) ?
                        <button
                            onClick={() => dispatch(setToFavorites(post))}
                            className="btn back-button btn-primary">
                            Add to favorite
                        </button>
                        :
                        <button
                            onClick={() => dispatch(unsetInFavorites(post))}
                            className="btn secondary-button btn-secondary">
                            Remove from favorite
                        </button>
                    }
                </div>
            </div>
        </li>
    );
};

export default PostCard;
