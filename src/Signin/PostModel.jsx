import { useState, useEffect } from 'react';

const PostModal = ({ show, onClose, userName, profileImageUrl, loadingImage, categories, onPostSubmit, postTitle, setPostTitle, postText, setPostText, postImagePreview, setPostImagePreview, postImageFile, setPostImageFile }) => {
  const [localPostTitle, setLocalPostTitle] = useState(postTitle || '');
  const [localPostText, setLocalPostText] = useState(postText || '');
  const [localCategory, setLocalCategory] = useState('');
  const [localPostImageFile, setLocalPostImageFile] = useState(postImageFile || null);
  const [localPostImagePreview, setLocalPostImagePreview] = useState(postImagePreview || null);

  useEffect(() => {
    setLocalPostTitle(postTitle || '');
    setLocalPostText(postText || '');
    setLocalCategory('');
    setLocalPostImageFile(postImageFile || null);
    setLocalPostImagePreview(postImagePreview || null);
  }, [show, postTitle, postText, postImageFile, postImagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ไฟล์ภาพใหญ่เกินไป (สูงสุด 5MB)');
        setLocalPostImageFile(null);
        setLocalPostImagePreview(null);
        return;
      }
      setLocalPostImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setLocalPostImagePreview(fileUrl);
      console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type); // Debug
    } else {
      alert('กรุณาเลือกไฟล์ที่เป็นภาพ (เช่น .jpg, .png)');
      setLocalPostImageFile(null);
      setLocalPostImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localPostTitle || !localPostText) {
      alert('กรุณากรอกหัวข้อและเนื้อหาโพสต์');
      return;
    }
    if (!localCategory) {
      alert('กรุณาเลือกหมวดหมู่');
      return;
    }

    const formData = new FormData();
    formData.append('title', localPostTitle);
    formData.append('text', localPostText);
    const selectedCat = categories.find((cat) => cat.name.toLowerCase() === localCategory);
    if (selectedCat && selectedCat.id !== null) {
      formData.append('categoryId', selectedCat.id);
    } else {
      alert('หมวดหมู่ไม่ถูกต้องหรือเลือก "All" ซึ่งไม่สามารถใช้ได้');
      return;
    }
    // if (localPostImageFile) {
    //   formData.append('images', localPostImageFile);
    // }

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      await onPostSubmit(formData, localPostTitle, localPostText, localCategory, localPostImageFile);
      setLocalPostTitle('');
      setLocalPostText('');
      setLocalCategory('');
      setLocalPostImageFile(null);
      setLocalPostImagePreview(null);
      onClose();
    } catch (error) {
      console.error('Post submission error:', error.message);
      alert('เกิดข้อผิดพลาดในการโพสต์: ' + error.message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 bg-[#4A4A4A4D] flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative">
        <button
          className="absolute no-style top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex items-center mb-8">
          <div className="w-13 h-13 mr-2 border-4 border-[#FF6250] rounded-full flex items-center justify-center">
            {loadingImage ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span>Loading...</span>
              </div>
            ) : profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full ml-1 mr-1"
                onError={(e) => console.error('Profile image load error:', e)}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <span>No Image</span>
              </div>
            )}
          </div>
          <h3 className="font-medium text-[20px] poppins-font text-[#333333]">{userName}</h3>
        </div>
        <div className="w-full mb-6 rounded-2xl overflow-hidden bg-[#F3F3F3] border border-[#E8E8EA]">
          <div className="px-4 py-4">
            <input
              type="text"
              value={localPostTitle}
              onChange={(e) => setLocalPostTitle(e.target.value)}
              placeholder="Post title"
              className="w-full bg-transparent outline-none text-[#333333] text-base font-semibold poppins-font"
            />
          </div>
          <hr className="border-t-2 border-[#E8E8EA] mx-4" />
          <div className="px-4 py-4">
            <textarea
              className="w-full h-48 p-2 bg-[#F3F3F3] rounded-none border-0 text-base font-normal poppins-font focus:outline-none focus:ring-2 focus:ring-[#C53678]"
              placeholder="Write something..."
              value={localPostText}
              onChange={(e) => setLocalPostText(e.target.value)}
            />
          </div>
          {localPostImagePreview && localPostImageFile && (
            <div className="px-4 py-4 max-h-[300px] overflow-auto">
              <img
                src={localPostImagePreview}
                alt="Post Preview"
                className="max-w-[200px] h-auto object-contain rounded-lg"
                onError={(e) => console.error('Post preview image load error:', e)}
              />
            </div>
          )}
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className="add-media-button no-style px-2 py-2 bg-[#FEF4F4] text-[#333333] text-[14px] font-normal rounded-lg flex items-center poppins-font"
            onClick={() => document.getElementById('modalFileInput').click()}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add media
          </button>
          <input
            type="file"
            id="modalFileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <select
            value={localCategory}
            onChange={(e) => setLocalCategory(e.target.value)}
            className="px-2 py-2 bg-[#FEF4F4] text-[#333333] rounded-lg poppins-font text-[14px] font-normal w-1/4 pr-8 relative"
          >
            <option value="">Add Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name.toLowerCase()}>{cat.name}</option>
            ))}
          </select>
        </div>
        <hr className="border-t-2 border-[#F3F3F3] mx-1 my-4" />
        <button
          type="submit"
          className="px-16 py-2 ml-115 bg-[#C53678] text-white rounded-3xl font-medium poppins-font text-base"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostModal;