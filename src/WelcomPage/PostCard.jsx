import React from 'react';

function PostCard({ post }) {
  if (!post) {
    return null;
  }

  const imageUrl = post.images && post.images.length > 0 && post.images[0].image_url
    ? `https://cf07-223-24-156-219.ngrok-free.app${post.images[0].image_url}`
    : 'https://via.placeholder.com/300x200?text=No+Image';
  console.log('Image URL:', imageUrl);

  const profilePictureUrl = post.user && post.user.profile_picture
    ? `https://cf07-223-24-156-219.ngrok-free.app${post.user.profile_picture}`
    : 'https://via.placeholder.com/30x30?text=NP';
  console.log('Profile Picture URL:', profilePictureUrl);

  const categoryName = post.category ? post.category.name : 'Uncategorized';
  const authorName = post.user ? post.user.username : 'Unknown Author';

  const timeAgo = (createdAt) => {
    if (!createdAt) return 'N/A';
    const postDate = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    const years = Math.floor(months / 12);
    return `${years}y`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-48 sm:h-56">
        <img
          src={imageUrl}
          alt={post.title || 'Post image'}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Error'; console.log('Image load failed'); }} // กรณีโหลดรูปไม่สำเร็จ
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-500 mb-1">{categoryName}</h3>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
        <div className="flex items-center mt-auto">
          <img
            src={profilePictureUrl}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover mr-2"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/30x30?text=Error'; console.log('Profile pic load failed'); }}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-800">{authorName}</p>
            <p className="text-gray-500">{timeAgo(post.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;