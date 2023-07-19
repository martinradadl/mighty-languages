import React, { useContext, useEffect, useState } from "react";
import { Comment } from "../../components/comment";
import { CommentInput } from "../../components/comment-input";
import { Form } from "../../components/questionnaire/form";
import "../../styles/lessons/lesson.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

function openLessonTab(evt, selectedLink) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("lesson-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("lesson-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(selectedLink).style.display = "block";
  evt.currentTarget.className += " active";
}

export const Lesson = () => {
  const params = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/courses/${params.courseId}/lessons/${params.id}`
      )
      .then((res) => {
        setLesson(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/lessons/${params.id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (lesson === null) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ margin: "5px 20px" }}>
      <h1>{lesson.title}</h1>
      <div
        style={{ width: "500px", height: "300px", border: "4px solid black" }}
      />
      <div class="lesson-tab">
        <button
          className="lesson-tablinks"
          onClick={(event) => {
            openLessonTab(event, "quiz");
          }}
        >
          Quiz
        </button>
        <button
          className="lesson-tablinks"
          onClick={(event) => {
            openLessonTab(event, "comments");
          }}
        >
          Comentarios
        </button>
      </div>

      <div id="quiz" class="lesson-tabcontent">
        <Form />
      </div>
      <div id="comments" class="lesson-tabcontent">
        {user !== null ? (
          <CommentInput />
        ) : (
          <span>Si quieres comentar por favor inicia sesión</span>
        )}
        {comments === null
          ? null
          : comments.map((comment) => {
              return <Comment comment={comment} />;
            })}
      </div>
    </div>
  );
};
