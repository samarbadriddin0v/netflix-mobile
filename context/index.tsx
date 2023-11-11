import { createContext, useContext, useEffect, useState } from "react";
import { ChildProps, IAccount, IContext, IUser } from "../types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "expo-router";

const Context = createContext<IContext | null>(null);

export const Provider = ({ children }: ChildProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const data = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        };
        setUser(data as IUser);
        router.push("/");
      } else {
        router.push("/auth");
      }
    });
  }, []);

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
