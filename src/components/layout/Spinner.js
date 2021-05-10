import { Spinner as Loader } from "react-bootstrap";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <Loader animation="border" />
    </div>
  );
}
