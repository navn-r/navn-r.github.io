import { LitElement, html, css } from "lit-element";

class Resume extends LitElement {
  static get styles() {
    return css`
      ::selection {
        background: var(--orange-trans);
      }

      p {
        margin: 0 0 1rem 0;
      }

      .resume-container  {
        margin-bottom: 1rem;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        color: var(--orange);
        user-select: none;
      }

      a {
        text-decoration: none;
        color: var(--purple);
      }

      .highlight {
        color: var(--orange);
      }

      .footer {
        margin-top: 2rem;
        padding: 1rem 0;
        border-top: 1px var(--orange) dashed;
      }
    `;
  }

  render() {
    return html` <div class="resume-container">
        <a target="_blank" href="https://go.aws/30Gv8LP">[Download Resume]</a>
      </div>
      <h2>Education</h2>
      <p>
        University of Toronto&#160;(<span class="highlight">2019 - Present</span
        >)<br />
        HBSc. Computer Science Specialist - Soft. Eng Stream (<span
          class="highlight"
          >Co-op</span
        >)<br />
        - UofT Scholar Entrance Award (<span class="highlight">$7500</span>)
      </p>
      <h2 class="subtitle">Experiences</h2>
      <p>
        Error 404: There's nothing here yet.<br />
        Want to say hi?
        <a target="_blank" href="mailto:me@navn.me">Email me.</a> ( me [at] navn
        [dot] me )
      </p>
      <div class="footer">
        "Sometimes I'll start a sentence and I don't even know where it's going.
        I just hope I find it along the way."<br /><br />- Michael G. Scott<br />
      </div>`;
  }

  constructor() {
    super();
  }
}
customElements.define("resume-page", Resume);
