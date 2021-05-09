/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Button } from "react-bootstrap";
import "./app.css";

function App() {
  return (
    <div className="App" css={styles}>
      <Button variant="primary" className="my">
        Hello Bootstrap
      </Button>
    </div>
  );
}

const styles = css`
  button {
    background-color: red;
  }
`;

export default App;
