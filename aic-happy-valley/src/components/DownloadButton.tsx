import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface DownloadButtonProps {
  title: string;
  url?: string;
  content?: string;
  type: 'sermon' | 'image' | 'document' | 'video';
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  title, 
  url, 
  content, 
  type, 
  className = '' 
}) => {
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // Simple toast implementation without external library
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all transform translate-x-full ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  const handleDownload = async () => {
    try {
      if (url) {
        // Download from URL
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${getFileExtension(type)}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} downloaded successfully!`);
      } else if (content) {
        // Download text content
        const blob = new Blob([content], { type: 'text/plain' });
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
        showToast('Content downloaded successfully!');
      }
    } catch (error) {
      console.error('Download failed:', error);
      showToast('Download failed. Please try again.', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share && url) {
      try {
        await navigator.share({
          title: title,
          url: url,
          text: `Check out this ${type} from AIC Happy Valley`
        });
        showToast('Shared successfully!');
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      if (url) {
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!');
      }
    }
  };

  const getFileExtension = (type: string): string => {
    switch (type) {
      case 'image': return 'jpg';
      case 'video': return 'mp4';
      case 'document': return 'pdf';
      case 'sermon': return 'txt';
      default: return 'txt';
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
        title={`Download ${title}`}
      >
        <Download size={16} />
        Download
      </button>
      
      {url && (
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-white font-semibold rounded-lg border border-brand-gold/30 hover:border-brand-gold transition-colors"
          title={`Share ${title}`}
        >
          <Share2 size={16} />
          Share
        </button>
      )}
    </div>
  );
};

export default DownloadButton;
