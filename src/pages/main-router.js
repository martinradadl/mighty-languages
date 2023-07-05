import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { MainLayout } from "../components/main-layout";
import { PageNotFound } from "../components/page-not-found";
import { AuthContext } from "../context/auth-context";
import { Courses } from "./courses";
import { Course } from "./courses/course";
import { Home } from "./home";
import { Lesson } from "./lesson";
import { Login } from "./login";

export const MainRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/courses/:id" element={<Course />}></Route>
          <Route path="/courses/:courseId/lessons/:id" element={<Lesson />}></Route>
          {isAuthenticated ? (
            null
          ) : null}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
