// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import SignUpPage from "./Pages/SignUpPage.jsx";
import CreateUserPage from "./Pages/CreateUserPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import MainPage from "./Pages/MainPage.jsx";
import "./index.css";
import  store  from "./Store/store.js";
import GetStartedPage from "./Pages/GetStartedPage.jsx"
import AddPostPage from "./Pages/AddPostPage.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/create" element={<CreateUserPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/add" element={<AddPostPage/>}/>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>
);
