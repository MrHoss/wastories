import { useEffect, useState } from "react";
/* import { useNavigate } from "react-router-dom"
import api from "../../services/api"; */
/**
 * Custom React hook for user authentication
 *
 * This hook provides functionality related to user authentication,
 * including redirect to login page if user is not authenticated.
 *
 * @returns An object with authentication-related values.
 */

const useAuth = () => {
  const initialState = { id: '', status: 'close', qrCode: '' };
  const [sessionData, setSessionData] = useState<{ id: string, status: string, qrCode: string }>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.on('session-update', (_event, data) => {
      if (data) {
        if (data.status == 'close') {
          setSessionData(initialState);
        } else {
          setSessionData(data);
        }
      };
    });
  }, []);
  const createSession = async ():Promise<void> => {
    setLoading(true);
    if (!sessionData.id) {
      await window.electron.ipcRenderer.invoke('create-session');
    } else {
      await window.electron.ipcRenderer.invoke('remove-session', sessionData.id);
      await createSession();
    };
    setLoading(false);
  };

  const removeSession = async (): Promise<void> =>{
    if (sessionData.id){
      await window.electron.ipcRenderer.invoke('remove-session', sessionData.id);
    }

  }

  return { sessionData, loading, createSession, removeSession };
}
export default useAuth;