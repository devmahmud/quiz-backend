import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuizAsync } from "../../redux/quizSlice";
import Spinner from "../layout/Spinner";

export default function QuizList() {
  const { quizzes, quizzesRequestStatus } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuizAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="mt-3">Available Quizzes</h1>

      {quizzesRequestStatus === "pending" ? (
        <Spinner />
      ) : (
        <ul className="list-group">
          {quizzes?.map((quiz, i) => (
            <li key={i} className="list-group-item mb-2">
              <a href="#!">{quiz.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
