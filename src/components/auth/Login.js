import { useState } from "react";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { getAuthUserAsync, login } from "../../redux/authSlice";

import authAPI from "../../services/authAPI";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);

    const res = await authAPI.login(data);

    setLoading(false);

    if (res !== undefined && /20[0-6]/g.test(res.status)) {
      dispatch(login(res.data));
      setTimeout(function () {
        setLoading(false);
        dispatch(getAuthUserAsync());
        history.push("/");
      }, 2000);
    } else {
      if (res?.response?.data?.non_field_errors) {
        toast.error(res?.response?.data?.non_field_errors[0]);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Row>
      <Col md={6} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title as="h4" className="text-center">
              Login
            </Card.Title>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Enter your username"
                  isInvalid={errors?.username || false}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.username && "Username is required"}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Enter your password"
                  isInvalid={errors?.password || false}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password && "Password is required"}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="bg-olive" disabled={loading}>
                Login {loading && <Spinner animation="border" size="sm" />}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
