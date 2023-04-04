import React from "react";
import Home from "./pages/Home/Home";
import "./utils/reset.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
