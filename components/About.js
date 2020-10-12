import { LitElement, html, css } from "lit-element";

class About extends LitElement {
  static get styles() {
    return css`
      #about {
        margin-bottom: 1rem;
      }

      .subtitle {
        font-size: var(--subtitle);
      }

      #logo {
        width: 5rem;
      }

      p {
        margin-top: 0;
      }

      .title {
        font-size: var(--title);
        font-family: var(--main);
      }

    `;
  }

  render() {
    return html`
      <div id="about">
        <span class="title">Hello.</span><br /><br />
        <p>
          I am a 2nd year student developer studying at the University of
          Toronto in Canada. <br />
          Currently, I am working as a Software Developer at CaseWare
          International for my co-op term.
        </p>
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("about-section", About);
