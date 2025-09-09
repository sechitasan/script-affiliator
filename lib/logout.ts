

import { logoutUser } from './client-auth'

export const performLogout = async (): Promise<boolean> => {
  try {
   
    
    const success = await logoutUser();
    
    if (success) {
      
      return true;
    } else {
      console.error('API logout failed');
      return false;
    }
  } catch (error) {
    console.error('API logout error:', error);
    return false;
  }
}

export const logoutAndRedirect = async (): Promise<void> => {
  const success = await performLogout();
  
  if (success) {
   
  } else {
   
  }
  
  // Force reload untuk memastikan semua state ter-clear
  window.location.href = '/';
}
