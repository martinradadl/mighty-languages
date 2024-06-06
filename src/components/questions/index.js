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
import { isAnswerCorrect } from "../../pages/helpers";

export const QuizTab = (props) => {
  const { handleCompleteLesson, isInstructor, isQuizActive } = props;
  const params = useParams();
  const dispatch = useDispatch();
  const { status, questionsList } = useSelector((state) => state.questions);
  const user = useSelector((state) => state.users.selectedUser);
  const quizResults = useSelector((state) => state.quiz_results.quizResults);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersCount, setAnswersCount] = useState();

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

  // Get Questions
  const handleGetQuestions = useCallback(() => {
    dispatch(questionsActions.getQuestions(params.id));
  }, [dispatch, params.id]);

  const debouncedHandleGetQuestions = debounce(handleGetQuestions, 500);

  useEffect(() => {
    debouncedHandleGetQuestions();
  }, [handleGetQuestions]);

  // Get User Answers
  const handleGetUserAnswers = useCallback(() => {
    if (user) {
      console.log("eee");
      dispatch(
        quizResultsActions.getQuizResults({
          lessonId: params.id,
          userId: user._id,
        })
      );
    }
  }, [user]);

  const debouncedHandleGetUserAnswers = debounce(handleGetUserAnswers, 500);

  useEffect(() => {
    debouncedHandleGetUserAnswers();
  }, [handleGetUserAnswers]);

  const handleSetUserResults = () => {
    if (quizResults.userAnswers.length > 0) {
      countCorrectAnswers();
      setIsSubmitted(true);
    }
  };

  const debouncedHandleSetUserResults = debounce(handleSetUserResults, 500);

  useEffect(() => {
    if (answersCount === undefined && quizResults.user) {
      debouncedHandleSetUserResults();
    }
  }, [answersCount, quizResults]);

  //Count Correct Answers
  const countCorrectAnswers = () => {
    let correctAnswers = 0;
    let totalAnswers = 0;

    questionsList.map((question, i) => {
      if (question.type.id === "MULT_CHOICE") {
        if (
          isAnswerCorrect({
            statementIndex: 0,
            statementType: "",
            question,
            userAnswers: quizResults.userAnswers,
            index: i + 1,
          })
        ) {
          correctAnswers++;
        }
        totalAnswers++;
      } else {
        question.statements.map((statement, j) => {
          if (statement.statementType.id !== "TEXT") {
            if (
              isAnswerCorrect({
                statementIndex: j,
                statementType: statement.statementType.id,
                question,
                userAnswers: quizResults.userAnswers,
                index: i + 1,
              })
            ) {
              correctAnswers++;
            }
            totalAnswers++;
          }
        });
      }
      setAnswersCount({ correctAnswers, totalAnswers });
    });
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    countCorrectAnswers();
    setIsSubmitted(true);
    if (user) {
      const currentQuizResults = {
        userId: user._id,
        lessonId: params.id,
        answers: quizResults.userAnswers,
      };
      dispatch(quizResultsActions.addQuizResults(currentQuizResults));
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              className="open-dialog-button"
              onClick={handleRestartQuiz}
            >
              Reiniciar
            </button>
            <p
              style={{ margin: "0px" }}
            >{`Resultado: ${answersCount.correctAnswers}/${answersCount.totalAnswers}`}</p>
          </div>
        ) : null}
      </LoadingWrapper>
    </div>
  );
};
