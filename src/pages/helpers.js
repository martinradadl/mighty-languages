import courseEnrollmentActions from "../redux/actions/course-enrollment";
import coursesActions from "../redux/actions/courses";

export const handleEnrollInCourse = async ({
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
  let enrollment = null;
  try {
    enrollment = await dispatch(
      courseEnrollmentActions.addCourseEnrollment(newCourseEnrollment)
    );
  } catch (e) {
    return e.message;
  }
  return enrollment.payload;
};
