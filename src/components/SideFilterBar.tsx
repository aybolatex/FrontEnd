import React from 'react';

const SideFilterBar: React.FC<any> = ({ postCategoryArray, filteredPosts, handleFilter, filter }) => {

    return (
        <div className="col-3 border rounded-2 p-4">
            <label>Category</label>
            <select
                className="form-control"
                name="category_like"
                value={filter?.['category_like'] || ""}
                onChange={handleFilter}
            >
                <option value="">All</option>
                <option>UI/UX</option>
                <option>React</option>
            </select>
            <hr />
            <div className="mt-4">
                <label>Post Titles Array</label>
                <ul>
                    {postCategoryArray.map((category: any, index: number) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>

            <div>
                <label>Filtered Posts (Category: React)</label>
                <ul>
                    {filteredPosts.map((post: any) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideFilterBar;
