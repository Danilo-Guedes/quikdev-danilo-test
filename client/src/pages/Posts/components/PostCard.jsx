/* eslint-disable react/prop-types */

function PostCard( {post}) {
  return (
    <div key={post.id} className="post-card">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <img src={post.imageUrl} alt="Post Image" />
      <div className="user-info">
        <img src={post.user.imageUrl} alt="User Image" />
        <span>{post.user.name}</span>
      </div>
    </div>
  );
}

export default PostCard;
