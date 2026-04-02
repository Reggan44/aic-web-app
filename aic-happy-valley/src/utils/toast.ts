type ToastType = 'success' | 'error' | 'info';

export const showToast = (message: string, type: ToastType = 'success') => {
  // Remove existing toasts to prevent stacking
  const existingToasts = document.querySelectorAll('.app-toast');
  existingToasts.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `app-toast fixed top-24 right-6 px-6 py-4 rounded-2xl text-white font-bold z-[100] shadow-2xl transition-all duration-500 transform translate-x-full border-b-4 ${
    type === 'success' ? 'bg-emerald-600 border-emerald-800' : 
    type === 'error' ? 'bg-rose-600 border-rose-800' : 
    'bg-brand-sage border-brand-darkGrey/20'
  }`;
  
  toast.style.backdropFilter = 'blur(12px)';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full');
  });

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 500);
  }, 4000);
};
