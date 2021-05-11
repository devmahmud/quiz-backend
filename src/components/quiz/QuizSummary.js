import { useEffect, useState } from "react";
import { Row, Col, Spinner, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMap, FaSkull, FaClock } from "react-icons/fa";
import quizAPI from "../../services/quizAPI";
import { colors } from "../common/colors";
import HumanizeDuration from "humanize-duration";

export default function QuizSummary(props) {
  const sitting_id = props?.match?.params?.id;

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({});

  const getSummary = async () => {
    setLoading(true);

    const res = await quizAPI.getSummary(sitting_id);

    if (res?.id) {
      setSummary(res);
    }

    setLoading(false);
  };

  useEffect(() => {
    getSummary();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Row className="mt-3" style={{ color: colors.olive }}>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <Card>
              <Card.Body>
                <Card.Title as="h5">Quiz Summary</Card.Title>

                <div className="row">
                  <div className="col">
                    <FaMap size="25" />
                  </div>
                  <div className="col">
                    <p>{summary?.total_distance} Km</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FaSkull size="25" />
                  </div>
                  <div className="col">
                    <p>
                      {summary?.correct_answer}/{summary?.total_questions}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FaClock size="25" />
                  </div>
                  <div className="col">
                    <p>{HumanizeDuration(summary?.duration)}</p>
                  </div>
                </div>
                <div>
                  <Link to="/quizzes" className="btn btn-primary">
                    Back to Quizzes
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
