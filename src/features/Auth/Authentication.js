/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function CheckUser() {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "GET",
    credentials: "include",
  });
  // console.log('res', res);
  if (!res.ok) {
    throw new Error("Login to access this page");
  }

  const data = await res.json();
  console.log("checkuser data", data);
  return data;
}

export async function signIn(email, password) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    console.log(err);
    throw err;
  }

  const message = await res.json();
  return message.message;
}

async function Logout() {
  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const message = await res.json();
  return message;
}

async function SignUp(username, email, password) {
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const message = await res.json();
  if (!res.ok) {
    throw message;
  }

  return message;
}

export function useGetUser() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: CheckUser,
  });
  console.log("usegetuser data", data);
  return { data, isLoading, isError, error };
}

export function useSignUp() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createSignUp,
    isLoading: isSigningUp,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, email, password }) => {
      return await SignUp(username, email, password);
    },
    onSuccess: (message) => {
      console.log(message);
    },
  });

  return { createSignUp, isSigningUp, isError, error };
}

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createLogout,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      return await Logout();
    },
    onSuccess: async (message) => {
      console.log(message);
      console.log("inside logout");
      await queryClient.invalidateQueries("user");
      queryClient.refetchQueries("user");
    },
    onError: (err) => console.log("errrrr", err),
  });

  return { createLogout, isError, error };
}
