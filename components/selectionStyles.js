import { css } from "lit-element";

export const selectionStyles = css`
  ::-moz-selection {
    color: var(--dark-gray);
    background: var(--aqua);
  }

  ::selection {
    color: var(--dark-gray);
    background: var(--aqua);
  }
`;
