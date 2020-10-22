import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class Experiences extends LitElement {
  static get styles() {
    return [
      css`
        #experience-container {
          margin-bottom: 5rem;
        }
        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
    <span class="title">What I do.</span>
    <div id="experience-container">
        <experience-card title="Software Developer" location="@caseware"></experience-card>
        <experience-card title="HBSc. Computer Science" location="@uoft"></experience-card>
    </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("experiences-section", Experiences);
