import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class Experiences extends LitElement {
  static get styles() {
    return [
      css`
        #experience-container {
          margin-bottom: 6rem;
        }

        ul {
          padding-left: 2rem;
        }

        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
          margin-bottom: -2rem;
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
    <div class="title">What I do.</div>
    <div id="experience-container">
        <experience-card name="Software Developer Co-op" location="@caseware">
          <div slot="body">
            Sept. 2020 - Present
            <ul>
                <li>Working in an <span class="highlight">Agile Scrum</span> on the <span class="highlight">CaseWare Cloud</span> product</li>
                <li>Converting manual tests to unit tests using <span class="highlight">Karma and Jasmine</span></li>
                <li>Developing bug fixes and features using <span class="highlight">Angular and AngularJS</span></li>
            </ul>
          </div>
        </experience-card>
        <experience-card name="HBSc. Computer Science" location="@uoft">
          <div slot="body">
            2019 - Present (Co-op)
            <ul>
                <li>cGPA: <span class="highlight">3.75</span>/4.0</li>
                <li>Dean's List (<span class="highlight">2020-21</span>)</li>
                <li>UofT Scholar (<span class="highlight">Sept 2019</span>)</li>
            </ul>
          </div>
        </experience-card>
    </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("experiences-section", Experiences);
