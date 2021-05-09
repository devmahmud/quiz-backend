import { useState, useRef } from "react";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import authAPI from "../../services/authAPI";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);

    const res = await authAPI.register(data);

    if (res !== undefined && /20[0-6]/g.test(res.status)) {
      toast.success("Registration Successfull. You can login now.");
      history.push("/login");
    } else {
      setLoading(false);
      if (res?.response?.data) {
        toast.error(res?.response?.data?.username[0]);
        toast.error(res?.response?.data?.email[0]);
        toast.error(res?.response?.data?.password[0]);
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
              Register
            </Card.Title>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Row>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid Email",
                        },
                      })}
                      type="email"
                      placeholder="email@domain.com"
                      isInvalid={errors?.email || false}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.email && errors?.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      {...register("first_name", {
                        required: "First Name is required",
                      })}
                      type="text"
                      placeholder="Enter your First Name"
                      isInvalid={errors?.first_name || false}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.first_name && errors?.first_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      {...register("last_name", {
                        required: "Last Name is required",
                      })}
                      type="text"
                      placeholder="Enter your Last Name"
                      isInvalid={errors?.last_name || false}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.last_name && errors?.last_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

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

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  {...register("password_repeat", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                  placeholder="Enter your password"
                  isInvalid={errors?.password_repeat || false}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password_repeat && errors?.password_repeat?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="bg-olive" disabled={loading}>
                Register {loading && <Spinner animation="border" size="sm" />}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
