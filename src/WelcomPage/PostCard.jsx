import { useState, useEffect } from 'react';
import defaultImage from '../assets/Language.jpg';
import defaultProfile from '../assets/Writing.jpg';

function PostCard({ post }) {
  if (!post) return null;

  const [imageError, setImageError] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [profileSrc, setProfileSrc] = useState(null);

  const fetchImage = async (url) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Image fetch error:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      if (post.images?.length > 0 && post.images[0]?.image_url && !imageError) {
        const url = `https://0b02e4248cf5.ngrok-free.app${post.images[0].image_url.startsWith('/') ? '' : '/'}${post.images[0].image_url}`;
        const src = await fetchImage(url);
        setImageSrc(src || defaultImage);
      } else {
        setImageSrc(defaultImage);
      }

      if (post.user?.profile_picture && !profileError) {
        const url = `https://0b02e4248cf5.ngrok-free.app${post.user.profile_picture.startsWith('/') ? '' : '/'}${post.user.profile_picture}`;
        const src = await fetchImage(url);
        setProfileSrc(src || defaultProfile);
      } else {
        setProfileSrc(defaultProfile);
      }
    };
    loadImages();
  }, [post, imageError, profileError]);

  const categoryName = post.category?.name || 'Uncategorized';
  const authorName = post.user?.username || 'Unknown Author';

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
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="relative w-full sm:w-5/6 md:w-6/7 h-32 sm:h-34 md:h-36 flex justify-center mt-3 sm:mt-5 mx-auto">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={post.title || 'Post image'}
            className="w-full h-full object-cover rounded-lg"
            onError={() => {
              if (!imageError) {
                setImageError(true);
                setImageSrc(defaultImage);
              }
            }}
          />
        )}
      </div>
      <div className="p-2 sm:p-3 flex flex-col flex-grow min-h-0 inline-block">
        <h3 className="text-[13px] sm:text-[13px] text-[#C53678] px-2 py-1 mb-1 bg-rose-50 rounded-xl inline-block w-auto max-w-full">
          {categoryName}
        </h3>
        <h2 className="text-base sm:text-base font-semibold text-[#333333] py-1 sm:py-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex items-center mt-0">
          {profileSrc && (
            <img
              src={profileSrc}
              alt={authorName}
              className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover mr-2"
              onError={() => {
                if (!profileError) {
                  setProfileError(true);
                  setProfileSrc(defaultProfile);
                }
              }}
            />
          )}
          <div className="flex text-[13px] sm:text-[13px] gap-2 sm:gap-4">
            <p className="font-medium text-[#97989F]">{authorName}</p>
            <p className="font-normal text-[#97989F]">{timeAgo(post.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;