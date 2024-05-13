"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  
    useEffect(() => {
      if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/pages/login');
      }
    }, [isAuthenticated]);
  
    return isAuthenticated ? children : null;
  };
  
  export default PrivateRoute;
