import { createContext, useContext, useState } from "react";
import { ChildProps, IAccount, IContext, IUser } from "../types";

const Context = createContext<IContext | null>(null);

export const Provider = ({ children }: ChildProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);

  return (
    <Context.Provider value={{ user, account, setAccount, setUser }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useGlobalContext must be used within a Provider");
  return context;
};
