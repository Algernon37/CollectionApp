import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./componets/AppRouter/AppRouter";
import { auth, signOut } from './firebaseConfig';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      try {
        await signOut(auth);
        console.log('User signed out successfully');
      } catch (error) {
        console.error('Error signing out:', error);
      }
      event.preventDefault();
      event.returnValue = ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AppRouter />
  );
}

export default App;