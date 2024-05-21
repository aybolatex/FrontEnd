import React, {FormEvent, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchPosts, postsModule } from './PostsDucks';
import LoadingSpinner from '../../components/LoadingSpinner';
import withBackgroundColor from '../../utils/withBackgroundColor';
import PostCard from '../../components/PostCard';
import SideFilterBar from '../../components/SideFilterBar';


const PostsPage: React.FC<any> = ({ posts, loading, fetchPosts }) => {
    const [filter, setFilter] = useState<any>({});

    useEffect(() => {
        fetchPosts(filter);
    }, []);

    const handleFilter = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
    };

    return (
        <div className="container mt-5 opacity">
            <h2>Posts</h2>
            <hr className="mb-4 mt-2" />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="container">
                    <div className="container">
                        <div className="row align-items-start">
                            <SideFilterBar
                                handleFilter={handleFilter}
                                filter={filter}
                                postCategoryArray={posts.map((post: any) => post.category)}
                                filteredPosts={posts.filter((post: any) => post.category === 'React')}
                            />
                            <div className="col-9">
                                <div className="d-flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={filter?.['title_like']}
                                        className="form-control"
                                        placeholder="Find..."
                                        name="title_like"
                                        onInput={handleFilter}
                                    />
                                    <button type="button" onClick={() => fetchPosts(filter)} className="btn btn-primary">
                                        Find
                                    </button>
                                </div>
                                <ul className="list-group">
                                    {posts.length ? (
                                        posts.map((post: any) => <PostCard key={post.id} post={post} />)
                                    ) : (
                                        <div>No data...</div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    posts: state[postsModule].posts,
    loading: state[postsModule].loading,
});

export default connect(mapStateToProps, { fetchPosts })(withBackgroundColor(PostsPage));
