/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { colors } from "../common/colors";

export default function Home() {
  return (
    <div css={styles}>
      <h1>Venari</h1>
      <img src="/logo.png" alt="Venari" />
      <h6>Explore your city.</h6>
    </div>
  );
}

const styles = css`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0px;
    color: ${colors.olive};
  }
  img {
    width: 200px;
  }
  h6 {
    color: ${colors.olive};
    font-size: 18px;
  }
`;
