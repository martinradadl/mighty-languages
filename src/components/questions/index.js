import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../loading";
import { AddQuestionDialog } from "./question-dialogs/add-question-dialog";
import { Question } from "./question";
import debounce from "lodash.debounce";
import questionsActions from "../../redux/actions/questions";
import { Switch } from "@headlessui/react";
import lessonsActions from "../../redux/actions/lessons";
import "../../styles/questions.css";
import quizResultsActions from "../../redux/actions/quiz-results";

export const QuizTab = (props) => {
  const { handleCompleteLesson, isInstructor, isQuizActive } = props;
  const params = useParams();
  const dispatch = useDispatch();
  const { status, questionsList } = useSelector((state) => state.questions);
  const user = useSelector((state) => state.users.selectedUser);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userAnswers = useSelector((state) => state.quiz_results.userAnswers);

  const handleChangeIsQuizActive = () => {
    dispatch(
      lessonsActions.editLesson({
        updatedLesson: {
          _id: params.id,
          isQuizActive: !isQuizActive,
        },
        changeQuizActiveness: true,
      })
    );
  };

  const handleGetQuestions = useCallback(() => {
    dispatch(questionsActions.getQuestions(params.id));
  }, [dispatch, params.id]);

  const debouncedHandleGetQuestions = debounce(handleGetQuestions, 500);

  useEffect(() => {
    debouncedHandleGetQuestions();
  }, [handleGetQuestions]);

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    let totalAnswers = 0;
    setIsSubmitted(true);

    // questionsList.map((question, i) => {
    //   if (question.type.id === "MULT_CHOICE") {
    //     if (checkAnswerMultQuestion(question, i + 1)) correctAnswers++;
    //     totalAnswers++;
    //   } else {
    //     question.statements.map((statement, j) => {
    //       if (statement.statementType.id !== "TEXT") {
    //         if (checkAnswerFillingQuestion(question, i + 1, j))
    //           correctAnswers++;
    //         totalAnswers++;
    //       }
    //     });
    //   }
    // });
  };

  const checkAnswerMultQuestion = (question, index) => {
    const userAnswer = userAnswers.find((elem) => elem.questionIndex === index);
    return question.statements[0].options.find(
      (elem) => elem.value === userAnswer.answers[0].value
    )?.isAnswer;
  };

  const checkAnswerFillingQuestion = (
    question,
    questionIndex,
    statementIndex
  ) => {
    const userQuestionAnswer = userAnswers.find(
      (elem) => elem.questionIndex === questionIndex
    );
    const userStatementAnswer = userQuestionAnswer.answers.find(
      (elem) => elem.statementIndex === statementIndex
    );

    if (question.statements[statementIndex].statementType.id === "SELECT") {
      return question.statements[statementIndex].options.find(
        (elem) =>
          elem.value ===
          userQuestionAnswer.answers[userStatementAnswer.statementIndex].value
      )?.isAnswer;
    } else {
      return (
        userQuestionAnswer.answers[userStatementAnswer.statementIndex].value ===
        question.statements[statementIndex].value
      );
    }
  };

  const handleRestartQuiz = () => {
    dispatch(quizResultsActions.setUserAnswers([]));
    setIsSubmitted(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <LoadingWrapper
        isLoading={questionsList === null || status === "loading"}
      >
        {user?.type === "instructor" || user?.type === "admin" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <AddQuestionDialog />
            {questionsList.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: "0px" }}>Activar Quiz:</p>
                <Switch
                  checked={isQuizActive}
                  onChange={handleChangeIsQuizActive}
                  className={isQuizActive ? "switch active" : "switch"}
                >
                  <div
                    className={
                      isQuizActive ? "switch-ball active" : "switch-ball"
                    }
                  />
                </Switch>
              </div>
            ) : null}
          </div>
        ) : null}

        {questionsList.map((question, i) => {
          return (
            <Question
              {...{
                key: i,
                question,
                index: i + 1,
                isSubmitted,
                isInstructor: isInstructor,
                isAdmin: user?.type === "admin",
              }}
            />
          );
        })}
        {questionsList.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
          >
            <h4 style={{ margin: "0px" }}>
              Por el momento no hay preguntas disponibles
            </h4>
          </div>
        ) : !(isInstructor || isSubmitted) ? (
          <button
            type="button"
            className="open-dialog-button"
            style={{ marginTop: "10px" }}
            onClick={handleSubmitQuiz}
          >
            Terminar
          </button>
        ) : !isInstructor && isSubmitted ? (
          <button
            type="button"
            className="open-dialog-button"
            style={{ marginTop: "10px" }}
            onClick={handleRestartQuiz}
          >
            Reiniciar
          </button>
        ) : null}
      </LoadingWrapper>
    </div>
  );
};
