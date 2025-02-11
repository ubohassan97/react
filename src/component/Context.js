import { createContext, useState } from "react";

export const User = createContext({});

export default function UserProvider({ children }) {
  const [auth, setauth] = useState({ token: null, userdetails: null });

  return <User.Provider value={{ auth, setauth }}>{children}</User.Provider>;
}
