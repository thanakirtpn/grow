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
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="relative w-20 sm:w-40 md:w-60 h-20 sm:h-30 md:h-40 flex justify-center mt-1 sm:mt-4 mx-auto">
        <img
          src={imageUrl}
          alt={post.title || 'Post image'}
          className="w-full max-w-xs h-full object-cover rounded-lg"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Error'; console.log('Image load failed'); }}
        />
      </div>

      <div className="p-3 flex flex-col flex-grow min-h-0 inline-block">
        <h3 className="text-sm text-[#C53678] px-2 py-1 mb-1 bg-rose-50 rounded-xl inline-block w-auto max-w-full">{categoryName}</h3>
        <h2 className="text-base font-semibold text-[#333333] py-2 line-clamp-2">{post.title}</h2>
        <div className="flex items-center mt-auto">
          <img
            src={profilePictureUrl}
            alt={authorName}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover mr-2"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/30x30?text=Error'; console.log('Profile pic load failed'); }}
          />
          <div className="flex text-[13px] gap-4">
            <p className="font-medium text-[#97989F]">{authorName}</p>
            <p className="font-normal text-[#97989F]">{timeAgo(post.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;