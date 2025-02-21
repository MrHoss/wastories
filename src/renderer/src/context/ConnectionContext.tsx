import { createContext } from "react";
import useConnection from "../hooks/useConnection";

type Props = {
  children: string | JSX.Element | JSX.Element[];
}

interface ConnectionContextProps {
  loading: boolean;
  sessionData: { id: string, status: string, qrCode: string };
  createSession: () => Promise<void>;
  removeSession: () => Promise<void>;
}

const ConnectionContext = createContext<ConnectionContextProps>({
  loading: false,
  sessionData: { id: '', status: 'close', qrCode: '' },
  createSession: async () => { },
  removeSession: async () => { },
});

const ConnectionProvider = ({ children }: Props) => {
  const { sessionData, loading, createSession, removeSession } = useConnection();

  return (
    <ConnectionContext.Provider
      value={{ sessionData, loading, createSession, removeSession }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export { ConnectionContext, ConnectionProvider };