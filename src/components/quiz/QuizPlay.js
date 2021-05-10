import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Spinner, Form, Card } from "react-bootstrap";
import { FaInfoCircle, FaRegLightbulb } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { colors } from "../common/colors";
import quizAPI from "../../services/quizAPI";

export default function QuizPlay(props) {
  const sitting_id = props?.match?.params?.id;

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  const { quizById } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const history = useHistory();

  // Get question
  const getQuestion = async () => {
    setLoading(true);
    const res = await quizAPI.getQuestion(sitting_id);
    setLoading(false);

    if (res?.id) {
      setQuestion(res);
    }
  };

  // Answer submit handler
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getQuestion();
    // eslint-disable-next-line
  }, [sitting_id]);

  return (
    <Row className="mt-3" style={{ color: colors.olive }}>
      <Col md={{ span: 8, offset: 2 }}>
        <div className="text-center">
          <Card>
            <Card.Body>
              <p>{question?.pretext}</p>
            </Card.Body>
          </Card>

          <Card className="my-3">
            <Card.Body>
              <p>{question?.question}</p>
            </Card.Body>
          </Card>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Write your answer</Form.Label>
              <Form.Control
                type="text"
                {...register("answer", { required: true })}
              />
            </Form.Group>
            <div className="d-flex justify-content-around mt-5">
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
              >
                <FaInfoCircle size="20" />
              </button>
              <button
                type="submit"
                className="btn btn-success px-5"
                disabled={loading}
              >
                Submit
                {loading && <Spinner animation="border" size="sm" />}
              </button>
              <button type="button" className="btn btn-info" disabled={loading}>
                <FaRegLightbulb size="20" />
              </button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
