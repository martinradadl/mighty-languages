import courseEnrollmentActions from "../redux/actions/course-enrollment";

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

export const isAnswerCorrect = ({
  statementIndex,
  statementType,
  question,
  userAnswers,
  index,
}) => {
  const userQuestionAnswer = userAnswers.find(
    (elem) => elem.questionIndex === index
  );
  const userStatementAnswer = userQuestionAnswer?.answers.find(
    (elem) => elem.statementIndex === statementIndex
  );
  if (statementType === "FILL") {
    return (
      userStatementAnswer?.value === question.statements[statementIndex].value
    );
  } else {
    return question.statements[statementIndex].options.find(
      (elem) => elem.value === userStatementAnswer?.value
    )?.isAnswer;
  }
};
