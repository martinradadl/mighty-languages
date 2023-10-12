import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/main-layout";
import { PageNotFound } from "../components/page-not-found";
import { Courses } from "./courses";
import { Course } from "./courses/course";
import { Home } from "./home";
import { Lesson } from "./lesson";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/users";

export const MainRouter = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (cookie.user) {
      dispatch(usersActions.setUser(cookie.user));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [cookie]);
  if (loading) {
    return <h3>Cargando...</h3>;
  }
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/courses/:id" element={<Course />}></Route>
          <Route path="/lessons/:id" element={<Lesson />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
