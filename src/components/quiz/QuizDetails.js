import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getQuizByIdAsync } from "../../redux/quizSlice";

export default function QuizDetails(props) {
  const quiz_id = props?.match?.params?.id;

  const { quizById } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  console.log(quizById);

  useEffect(() => {
    dispatch(getQuizByIdAsync(quiz_id));

    // eslint-disable-next-line
  }, [quiz_id]);
  return <div>Quiz Details</div>;
}
