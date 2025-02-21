import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Login from "./features/Auth/Login";
import SignUp from "./features/Auth/SignUp";
import FeedData from "./features/Feed/FeedData";
import ProtectedRoute from "./features/Auth/ProtectedRoute";
import Profile from "./features/Profile/Profile";
import ChatLayout from "./features/Chat/ChatLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // retry: false
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<AppLayout />}>
            <Route
              path="feed"
              element={
                <ProtectedRoute>
                  <FeedData />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="chat" element={<ProtectedRoute><ChatLayout />
              </ProtectedRoute>}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
