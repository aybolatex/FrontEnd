import React from 'react';
import { connect } from 'react-redux';
import { postsModule } from './PostsPage/PostsDucks';
import withBackgroundColor from '../utils/withBackgroundColor';
import PostCard from '../components/PostCard';

interface Props {
    favoritePosts: any;
}

const FavoritePostsPage: React.FC<Props> = ({ favoritePosts }) => {
    return (
        <div className="container mt-5 opacity">
            <h2>Favorite posts</h2>
            <hr className="mb-4 mt-2" />
            <div className="container">
                <div className="container">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <ul className="list-group">
                                {favoritePosts.length ? (
                                    favoritePosts.map((post: any) => <PostCard key={post.id} post={post} />)
                                ) : (
                                    <div>No favorite posts...</div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    favoritePosts: state[postsModule].favoritePosts,
});

export default connect(mapStateToProps)(withBackgroundColor(FavoritePostsPage));
