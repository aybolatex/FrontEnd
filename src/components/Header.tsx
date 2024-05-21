import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DynamicContext } from '../utils/DynamicContextProvider';
import { postsModule } from '../pages/PostsPage/PostsDucks';

const Header: React.FC = () => {
    const dynamicContext = useContext(DynamicContext);
    const { favoritePosts } = useSelector((state: any) => state[postsModule]);

    return (
        <nav className={`navbar navbar-expand-lg navbar-${dynamicContext?.theme} header-bg bg-${dynamicContext?.theme}`}>
            <div className="container">
                <Link to="/" className="navbar-brand">
                    IT Blog
                </Link>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbars"
                    aria-controls="navbars"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbars">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/posts" className="nav-link">
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/manage/posts" className="nav-link">
                                Manage posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/manage/posts/create" className="nav-link">
                                Create post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/faq" className="nav-link">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                    <Link to={`/favorite-posts`} style={{ backgroundColor: '#E0E0E0FF' }} className="btn mr-1">
                        Favorites posts ({favoritePosts.length})
                    </Link>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={dynamicContext?.toggleTheme} type="button" className={`btn btn-dark`}>
                            Dark
                        </button>
                        <button onClick={dynamicContext?.toggleTheme} type="button" className={`btn btn-light`}>
                            Light
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
