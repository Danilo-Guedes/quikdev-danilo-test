import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../../api/post';
import PostCard from './PostCard';

const PostListing = () => {
    const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching posts</div>;
    }

    return (
        <div>
            {posts.map((post) => (
               <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostListing;
