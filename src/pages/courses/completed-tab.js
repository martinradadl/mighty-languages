import React from "react";
import { LoadingWrapper } from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { useSelector } from "react-redux";

export const CompletedTab = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const navigate = useNavigate();

  return (
    <div>
      <LoadingWrapper
        isLoading={status === "loading" || enrollmentsList === null}
      >
        {enrollmentsList?.map((enrollment, i) => {
          if (enrollment.isCompleted) {
            return (
              <div
                key={i}
                onClick={() => {
                  navigate(`/courses/${enrollment.course._id}`);
                }}
              >
                <CoursePreview
                  {...{
                    course: enrollment.course,
                    user,
                    enrollment,
                  }}
                />
              </div>
            );
          }
        })}
      </LoadingWrapper>
    </div>
  );
};
