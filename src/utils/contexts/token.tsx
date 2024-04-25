import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { toast } from "sonner";

import axiosWithConfig, { setAxiosConfig } from "../apis/axiosWithConfig";
import { IProfile } from "../apis/user/type";
import { getProfile } from "../apis/user/api";

type Theme = "dark" | "light" | "system";

interface Props {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface Context {
  token: string;
  user: IProfile | undefined;
  changeToken: (token?: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialValue: Context = {
  token: "",
  user: undefined,
  changeToken: () => {},
  theme: "system",
  setTheme: () => null,
};

const TokenContext = createContext<Context>(initialValue);

export const TokenProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: Props) => {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [user, setUser] = useState<IProfile>();
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchProfile();

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [token, theme]);

  axiosWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        changeToken();
      }

      return Promise.reject(error);
    }
  );

  async function fetchProfile() {
    try {
      const result = await getProfile();

      setUser(result.payload);
    } catch (error) {
      toast((error as Error).message);
    }
  }

  const changeToken = useCallback(
    (token?: string) => {
      const newToken = token ?? "";
      setToken(newToken);

      if (newToken !== "") {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
        setUser(undefined);
      }
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      changeToken,
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [token, user, changeToken, theme, setTheme]
  );

  return (
    <TokenContext.Provider {...props} value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("ERROR, useToken must be used within TokenContext");
  }

  return context;
}
