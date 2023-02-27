import {useEffect} from 'react';
import {useAppContext} from '../providers/AppProvider';
import {supabase} from '../supabase';

export function useAuthStateChange(): void {
  const {setUser, resetUser} = useAppContext();

  useEffect(() => {
    supabase.auth.onAuthStateChange((e, session) => {
      if (e === 'SIGNED_IN') {
        setUser({email: session?.user.email || ''});
      }

      if (e === 'SIGNED_OUT') {
        resetUser();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
