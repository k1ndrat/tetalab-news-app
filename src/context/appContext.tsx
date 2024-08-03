import { createContext, useContext, useState } from "react";

interface IAppContext {
  bookmarks: string[];
  setBookmarks: (value: string[]) => void;
}

const AppContext = createContext<IAppContext>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const value = {
    bookmarks,
    setBookmarks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
