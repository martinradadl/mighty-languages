import courseEnrollmentActions from "../redux/actions/course-enrollment";
import coursesActions from "../redux/actions/courses";

export const handleEnrollInCourse = ({
  userId,
  courseId,
  currentLessonId,
  dispatch,
}) => {
  const newCourseEnrollment = {
    userId,
    courseId,
    lessonId: currentLessonId,
  };
  dispatch(courseEnrollmentActions.addCourseEnrollment(newCourseEnrollment))
    .unwrap()
    .then(() => {
      dispatch(coursesActions.changeUserEnrollment());
    })
    .catch((e) => {
      alert(e.message);
    });
};
