import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaClipboardList,
  FaMap,
  FaArrowLeft,
  FaPlay,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getQuizByIdAsync } from "../../redux/quizSlice";
import { colors } from "../common/colors";

export default function QuizDetails(props) {
  const quiz_id = props?.match?.params?.id;

  const { quizById } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizByIdAsync(quiz_id));

    // eslint-disable-next-line
  }, [quiz_id]);
  return (
    <Row className="mt-3" style={{ color: colors.olive }}>
      <Col md={{ span: 8, offset: 2 }}>
        <div className="text-center">
          <h3>{quizById?.name}</h3>
          <p>{quizById?.description}</p>

          <div className="d-flex justify-content-around mt-5">
            <div>
              <FaMapMarkerAlt size="25" />
              <p>{quizById?.total_question} Mystery</p>
            </div>
            <div>
              <FaClipboardList size="25" />
              <p>{quizById?.category}</p>
            </div>
            <div>
              <FaMap size="25" />
              <p>{quizById?.total_distance} km</p>
            </div>
          </div>

          <div className="d-flex justify-content-around mt-5">
            <Link to="/quizzes" className="btn btn-primary px-5">
              <FaArrowLeft /> Back
            </Link>
            <button className="btn btn-success px-5">
              Play <FaPlay />{" "}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
