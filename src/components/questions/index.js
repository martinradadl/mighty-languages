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
        _id: params.id,
        isQuizActive: !isQuizActive,
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
    <div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          margin: "10px 0px",
        }}
      >
        <AddQuestionDialog />
        <Switch
          checked={isQuizActive}
          onChange={handleChangeIsQuizActive}
          className={isQuizActive ? "switch switch-active" : "switch"}
        >
          <span
            aria-hidden="true"
            className={isQuizActive ? "switch-ball switch-ball-active" : "switch-ball"}
          />
        </Switch>
      </div>
      <LoadingWrapper
        isLoading={questionsList === null || status === "loading"}
      >
        {questionsList.map((question, i) => {
          return (
            <Question
              {...{
                key: i,
                question,
                index: i + 1,
                isInstructor: isInstructor,
                userAnswers,
                setUserAnswers,
              }}
            />
          );
        })}
        {questionsList.length > 0 && !isInstructor ? (
          <button
            type="button"
            className="open-dialog-button"
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
