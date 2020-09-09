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

      .resume-container {
        margin-bottom: 1rem;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        color: var(--orange);
        user-select: none;
      }


      .highlight {
        color: var(--orange);
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

      h3 {
        color: var(--orange);
        user-select: none;
        margin: 0;
        -webkit-user-select: none;
      }

      #uni {
        display: flex;
        flex-direction: row;
      }

      #uni-logo-container {
        padding-right: 2rem;
      }

      #uni-logo {
        width: 4rem;
        user-select: none;
        moz-user-select: none;
      }

      #caseware-logo {
        width: 7rem;
      }

      #uni-details-container {
        display: grid;
        grid-template-rows: 1fr 1.5fr;
      }

      @media(max-width: 350px) {
        #uni-details-container {
          grid-template-rows: 1fr 2fr;
        }
      }
    `;
  }

  render() {
    return html` <div class="resume-container">
        <a target="_blank" href="https://go.aws/30Gv8LP">[Download Resume]</a>
      </div>
      <h2>Education</h2>
      <div id="uni">
        <div id="uni-logo-container">
          <img src="../Assets/uoft.png" id="uni-logo"/>
        </div>
        <div id="uni-details-container">
          <h3 class="title">
            University of Toronto
          </h3>
          <p>
          Scarborough Campus&#160;(<span class="highlight"
            >2019 - Present</span
          >)<br />
          HBSc. Computer Science Specialist - Soft. Eng Stream (<span
            class="highlight"
            >Co-op</span
          >)<br />
          - UofT Scholar Entrance Award (<span class="highlight">$7500</span>)
        </p>
        </div>
        </div>
      </div>
      <br />
      <h2 class="subtitle">Experiences</h2>
      <work-card name="CaseWare International">
        <img id="caseware-logo" slot="work-logo-img" src="../Assets/Caseware.png"/>
        <p slot="work-body">
          Remote (<span class="highlight">Sept. 2020 - Present</span>)  <br />
          Software Developer Co-op, Cloud Engagements.
        </p>
      </work-card>
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
