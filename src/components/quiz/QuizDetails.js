import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaClipboardList,
  FaMap,
  FaArrowLeft,
  FaPlay,
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { getQuizByIdAsync } from "../../redux/quizSlice";
import { colors } from "../common/colors";
import quizAPI from "../../services/quizAPI";

export default function QuizDetails(props) {
  const quiz_id = props?.match?.params?.id;

  const [loading, setLoading] = useState(false);

  const { quizById } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const history = useHistory();

  // Quiz start handler
  const onQuizStart = async () => {
    setLoading(true);
    const res = await quizAPI.newSitting(quizById.id);

    if (res?.id) {
      history.push(`/quizzes/${res.id}/play/`);
    }
  };

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
            <button
              className="btn btn-success px-5"
              onClick={onQuizStart}
              disabled={loading}
            >
              Play <FaPlay />
              {loading && <Spinner animation="border" size="sm" />}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
