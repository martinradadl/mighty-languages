import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/main-layout";
import { PageNotFound } from "../components/page-not-found";
import { Courses } from "./courses";
import { Course } from "./courses/course";
import { Home } from "./home";
import { Lesson } from "./lesson";
import { MyCourses } from "./courses/my-courses";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../redux/actions/users";
import { LoadingWrapper } from "../components/loading";
import courseEnrollmentActions from "../redux/actions/course-enrollment";
import questionsActions from "../redux/actions/questions";
import debounce from "lodash.debounce";

export const MainRouter = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users.selectedUser);

  const handleLogin = useCallback(() => {
    if (cookie.user) {
      dispatch(usersActions.setUser(cookie.user));
    } else {
      setLoading(false);
    }
  }, [cookie, dispatch]);

  const debouncedHandleLogin = debounce(handleLogin, 500);

  useEffect(() => {
    debouncedHandleLogin();
  }, [handleLogin]);

  const handleGetQuestionHelpers = useCallback(() => {
    dispatch(questionsActions.getQuestionTypes());
    dispatch(questionsActions.getStatementTypes());
  }, []);

  const debouncedHandleGetQuestionHelpers = debounce(
    handleGetQuestionHelpers,
    500
  );

  useEffect(() => {
    debouncedHandleGetQuestionHelpers();
  }, [handleGetQuestionHelpers]);

  const handleGetCourseEnrollments = useCallback(() => {
    dispatch(courseEnrollmentActions.getCourseEnrollments(user._id))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        alert(e.message);
        setLoading(false);
      });
  }, [user, dispatch]);

  const debouncedHandleGetCourseEnrollments = debounce(
    handleGetCourseEnrollments,
    500
  );

  useEffect(() => {
    if (user) {
      debouncedHandleGetCourseEnrollments();
    }
  }, [user, handleGetCourseEnrollments]);

  return (
    <LoadingWrapper isLoading={loading}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            {user !== null ? (
              <Route path="/my-courses" element={<MyCourses />}></Route>
            ) : null}
            <Route path="/courses/:id" element={<Course />}></Route>
            <Route path="/lessons/:id" element={<Lesson />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </LoadingWrapper>
  );
};
