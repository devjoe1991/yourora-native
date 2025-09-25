/**
 * Media utility functions for handling mixed content (images and videos)
 */

/**
 * Detects the content type of a post
 * @param {Object} post - The post object
 * @returns {string} - 'image' or 'video'
 */
export const getContentType = (post) => {
  // Check for explicit type field first
  if (post.type) {
    return post.type;
  }
  
  // Check fileType field
  if (post.fileType) {
    return post.fileType;
  }
  
  // Check if mediaUrl exists and has video extension
  if (post.mediaUrl) {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'];
    const hasVideoExtension = videoExtensions.some(ext => 
      post.mediaUrl.toLowerCase().includes(ext)
    );
    return hasVideoExtension ? 'video' : 'image';
  }
  
  // Default to image if no clear indication
  return 'image';
};

/**
 * Gets the appropriate media URL for a post
 * @param {Object} post - The post object
 * @returns {string} - The media URL
 */
export const getMediaUrl = (post) => {
  // For videos, prefer mediaUrl, fallback to picturePath
  if (getContentType(post) === 'video') {
    return post.mediaUrl || post.picturePath;
  }
  
  // For images, prefer mediaUrl, fallback to picturePath
  return post.mediaUrl || post.picturePath;
};

/**
 * Gets the thumbnail URL for a post (for videos)
 * @param {Object} post - The post object
 * @returns {string|null} - The thumbnail URL or null
 */
export const getThumbnailUrl = (post) => {
  if (getContentType(post) === 'video') {
    return post.thumbnailUrl || post.picturePath || null;
  }
  return null;
};

/**
 * Gets the duration of a video post
 * @param {Object} post - The post object
 * @returns {number|null} - Duration in seconds or null
 */
export const getVideoDuration = (post) => {
  if (getContentType(post) === 'video') {
    return post.duration || null;
  }
  return null;
};

/**
 * Checks if a post is a video
 * @param {Object} post - The post object
 * @returns {boolean} - True if the post is a video
 */
export const isVideoPost = (post) => {
  return getContentType(post) === 'video';
};

/**
 * Checks if a post is an image
 * @param {Object} post - The post object
 * @returns {boolean} - True if the post is an image
 */
export const isImagePost = (post) => {
  return getContentType(post) === 'image';
};

/**
 * Gets the aspect ratio for a post based on its content type and dimensions
 * @param {Object} post - The post object
 * @returns {number} - The aspect ratio (width/height)
 */
export const getAspectRatio = (post) => {
  if (isVideoPost(post) && post.dimensions) {
    return post.dimensions.width / post.dimensions.height;
  }
  
  // Default aspect ratios based on content type
  if (isVideoPost(post)) {
    return 9 / 16; // Vertical video (TikTok/Instagram style)
  }
  
  return 1; // Square image default
};

/**
 * Formats video duration for display
 * @param {number} duration - Duration in seconds
 * @returns {string} - Formatted duration (e.g., "1:23")
 */
export const formatDuration = (duration) => {
  if (!duration) return '0:00';
  
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Gets the appropriate resize mode for an image
 * @param {Object} post - The post object
 * @returns {string} - Resize mode ('cover', 'contain', etc.)
 */
export const getImageResizeMode = (post) => {
  if (isVideoPost(post)) {
    return 'cover'; // Videos should always cover
  }
  
  // For images, determine based on aspect ratio
  const aspectRatio = getAspectRatio(post);
  
  if (aspectRatio >= 1.8) {
    return 'cover'; // Landscape images
  } else if (aspectRatio <= 0.8) {
    return 'cover'; // Portrait images
  }
  
  return 'cover'; // Square images
};

/**
 * Validates if a post has valid media content
 * @param {Object} post - The post object
 * @returns {boolean} - True if the post has valid media
 */
export const hasValidMedia = (post) => {
  const mediaUrl = getMediaUrl(post);
  return mediaUrl && mediaUrl.trim() !== '';
};

/**
 * Gets the file size in a human-readable format
 * @param {number} fileSize - File size in MB
 * @returns {string} - Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (fileSize) => {
  if (!fileSize) return '';
  
  if (fileSize < 1) {
    return `${Math.round(fileSize * 1024)} KB`;
  }
  
  return `${fileSize.toFixed(1)} MB`;
};

/**
 * Validates if a video duration is within the allowed range (3-30 seconds)
 * @param {number} duration - Duration in seconds
 * @returns {boolean} - True if duration is valid
 */
export const isValidVideoDuration = (duration) => {
  return duration >= 3 && duration <= 30;
};

/**
 * Gets video duration validation message
 * @param {number} duration - Duration in seconds
 * @returns {string} - Validation message
 */
export const getVideoDurationMessage = (duration) => {
  if (duration < 3) {
    return 'Video must be at least 3 seconds long';
  }
  if (duration > 30) {
    return 'Video must be no longer than 30 seconds';
  }
  return null;
};
