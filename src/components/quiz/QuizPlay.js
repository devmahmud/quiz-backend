import { useEffect, useState } from "react";
import { Row, Col, Spinner, Form, Card } from "react-bootstrap";
import { FaInfoCircle, FaRegLightbulb } from "react-icons/fa";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { colors } from "../common/colors";
import quizAPI from "../../services/quizAPI";

export default function QuizPlay(props) {
  const sitting_id = props?.match?.params?.id;

  const { register, handleSubmit, formState } = useForm();

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  const history = useHistory();

  // Get question
  const getQuestion = async () => {
    setLoading(true);
    const res = await quizAPI.getQuestion(sitting_id);
    setLoading(false);

    if (/20[0-6]/g.test(res?.status)) {
      if (res?.data?.id) {
        setQuestion(res?.data);
      } else {
        history.push(`/quizzes/${sitting_id}/summary/`);
        // No more question. Show Summary
        console.log(res.status);
      }
    }
  };

  // Answer submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await quizAPI.submitAnswer(sitting_id, data);
    setLoading(false);

    if (res?.answer === "correct") {
      swal("Correct Answer!", "Good job. Congrats !", "success");
    } else if (res?.answer === "incorrect") {
      swal("Incorrect Answer!", "Please try again.", "error");
    }
    getQuestion();
  };

  // Hint click handler
  const onHintClick = () => {
    // Reduce score here
    swal("Hint !", question?.hints || "", "info");
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
                isInvalid={formState?.errors?.answer || false}
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
              <button
                type="button"
                className="btn btn-info"
                onClick={onHintClick}
                disabled={loading}
              >
                <FaRegLightbulb size="20" />
              </button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
