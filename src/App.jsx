import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import Login from "./features/Auth/Login";
import SignUp from "./features/Auth/SignUp";
import FeedData from "./features/Feed/FeedData";
import ProtectedRoute from "./features/Auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 0,
      retry: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route index element = {<Navigate replace to="login"/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="feed" element={
            <ProtectedRoute>
              <FeedData/>
            </ProtectedRoute>
          }/>
        </Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
