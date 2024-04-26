import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../loading";
import { AddQuestionDialog } from "./question-dialogs/add-question-dialog";
import { Question } from "./question";
import debounce from "lodash.debounce";
import questionsActions from "../../redux/actions/questions";

export const QuizTab = (props) => {
  const { handleCompleteLesson, isInstructor } = props;
  const params = useParams();
  const dispatch = useDispatch();
  const { status, questionsList } = useSelector((state) => state.questions);
  const user = useSelector((state) => state.users.selectedUser);

  // Get Questions
  const handleGetQuestions = useCallback(() => {
    dispatch(questionsActions.getQuestions(params.id));
  }, [dispatch, params.id]);

  const debouncedHandleGetQuestions = debounce(handleGetQuestions, 500);

  useEffect(() => {
    debouncedHandleGetQuestions();
  }, [handleGetQuestions]);

  return (
    <div>
      <AddQuestionDialog />
      <LoadingWrapper
        isLoading={questionsList === null || status === "loading"}
      >
        {questionsList.map((question, i) => {
          return (
            <Question
              key={i}
              selectedQuestion={question}
              index={i + 1}
              isInstructor={isInstructor}
            />
          );
        })}
        {questionsList.length > 0 && !isInstructor ? (
          <button
            type="button"
            className="open-dialog-button"
            onClick={(event) => {
              handleCompleteLesson();
            }}
          >
            Terminar
          </button>
        ) : null}
      </LoadingWrapper>
    </div>
  );
};

// [
//   {
//     _id:gfhgfghfgh,
//     results:[
//       {
//         answer: "fsdgdsgsdg",statementIndex:1
//       }
//     ]
//   }
// ]
