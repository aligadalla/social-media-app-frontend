/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function CheckUser() {
    const res = await fetch('http://localhost:3000/auth/login', {
        method: "GET",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Login to access this page");
    }

    const data = await res.json();
    return data;
}

async function Login(email, password) {
    const res = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: "include"
    });

    const message = await res.json();
    if (!res.ok) {
        throw new Error(message);
    }

    return message;
}

async function SignUp(username, email, password) {
    const res = await fetch('http://localhost:3000/auth/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const message = await res.json();
    if (!res.ok) {
        throw new Error(message.message);
    }

    return message;
}

export function useGetUser() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['user'],
        queryFn: CheckUser
    });

    return {data, isLoading, isError, error};
}

export function useLogin() {
    const queryClient = useQueryClient();

    const {mutate: createLogin, isLoading: isLoggingIn} = useMutation({
        mutationFn: async ({email, password}) => {
            return await Login(email, password);
        },
        onSuccess: (message) => {
            console.log(message);
            //queryClient.invalidateQueries('user');
        },
        onError: (err) => console.log(err)
    });

    return {createLogin, isLoggingIn};
}

export function useSignUp() {
    const queryClient = useQueryClient();

    const {mutate: createSignUp, isLoading: isSigningUp} = useMutation({
        mutationFn: async ({username, email, password}) => {
            return await SignUp(username, email, password);
        },
        onSuccess: (message) => {
            console.log(message);
        },
        onError: (err) => console.log(err)
    });

    return {createSignUp, isSigningUp};
}