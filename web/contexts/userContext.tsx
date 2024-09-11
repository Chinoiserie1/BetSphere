"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { BrowserProvider } from "ethers";
import { jwtDecode } from "jwt-decode";

import fetchUser from "@/utils/fetchUser";
import createUser from "@/utils/createUser";
import getUserJWT from "@/utils/getUserJWT";

type User = {
  id: number;
  address: string;
  points: string;
  role: string;
};

type UserContextProps = {
  user: User | null;
  jwt: string | null;
};

type GetUserJwtParams = {
  address: `0x${string}`;
  message: string;
  signature: string;
};

type JwtPayload = {
  exp: number;
};

const isJwtExpired = (token: string | null) => {
  if (!token) return true;
  const decoded: JwtPayload = jwtDecode(token);
  return decoded.exp * 1000 < new Date().getTime();
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  jwt: null,
});

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { walletProvider } = useWeb3ModalProvider();
  const queryClient = new QueryClient();
  const { address } = useWeb3ModalAccount();
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const signInCalledRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
      setJwt(localStorage.getItem("jwt"));
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (address) {
        return fetchUser(address);
      }
      throw new Error("No address provided");
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (address: `0x${string}`) => createUser(address),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const getJwtMutation = useMutation({
    mutationFn: async ({ address, message, signature }: GetUserJwtParams) => {
      const response = await getUserJWT(address, message, signature);
      return response.access_token;
    },
    onSuccess: (accessToken) => {
      setJwt(accessToken);
      localStorage.setItem("jwt", accessToken);
      signInCalledRef.current = false;
    },
    onError: (error) => {
      console.error("Error logging in:", error);
      signInCalledRef.current = false;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["logIn"] });
    },
  });

  useEffect(() => {
    if (data && user === null) {
      const { message } = data;
      if (message === "No user found" && address) {
        createUserMutation.mutate(address);
        return;
      }
      setUser(data);
    }
  }, [data, address, createUserMutation, user]);

  const signIn = useCallback(async () => {
    if (!address || walletProvider === undefined) return;
    if (signInCalledRef.current) return;
    signInCalledRef.current = true;

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const timestamp = new Date().getTime();
      const message = `Better: sign to access functionalities ${timestamp}`;
      const signature = await signer?.signMessage(message);
      if (signature) {
        getJwtMutation.mutate({ address, message, signature });
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }, [address, walletProvider, getJwtMutation]);

  useEffect(() => {
    if (!jwt || isJwtExpired(jwt)) {
      signIn();
    }
  }, [signIn, jwt]);

  const value = { user, jwt };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
