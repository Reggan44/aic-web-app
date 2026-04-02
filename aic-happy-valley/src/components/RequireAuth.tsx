import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
  }>({
    isAuthenticated: false,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check admin status exclusively from the secure 'admins' collection
        try {
          const adminRef = doc(db, 'admins', user.email || '');
          const adminSnap = await getDoc(adminRef);
          
          setAuthState({ 
            isAuthenticated: true, 
            isAdmin: adminSnap.exists(), 
            loading: false 
          });
        } catch (error) {
          console.error("Error checking admin status:", error);
          setAuthState({ isAuthenticated: true, isAdmin: false, loading: false });
        }
      } else {
        setAuthState({ isAuthenticated: false, isAdmin: false, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  if (authState.loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-brand-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!authState.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-brand-cream p-4 text-center">
        <h2 className="text-2xl font-black text-brand-darkGrey mb-4 font-sans">Not Authorized</h2>
        <p className="text-brand-darkGrey/60 mb-8 font-medium">Your account does not have permission to access the dashboard.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
};

