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

export const QuizTab = (props) => {
  const { handleCompleteLesson, isInstructor, isQuizActive } = props;
  const params = useParams();
  const dispatch = useDispatch();
  const { status, questionsList } = useSelector((state) => state.questions);
  const user = useSelector((state) => state.users.selectedUser);
  const [userAnswers, setUserAnswers] = useState([]);

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
                isInstructor: isInstructor,
                isAdmin: user?.type === "admin",
                userAnswers,
                setUserAnswers,
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
        ) : !isInstructor ? (
          <button
            type="button"
            className="open-dialog-button"
            style={{ marginTop: "10px" }}
            onClick={(event) => {
              handleCompleteLesson();
              console.log(userAnswers);
            }}
          >
            Terminar
          </button>
        ) : null}
      </LoadingWrapper>
    </div>
  );
};
