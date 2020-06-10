import { LitElement, html, css } from "lit-element";

class Projects extends LitElement {
  static get styles() {
    return css`
      .footer {
        padding-top: 1rem;
      }

      .highlight {
        color: var(--orange);
      }

      .tool {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      #site-info h4 {
        margin: 0 0 1em 0;
      }

      .tool h4 {
        margin: 0.5em 1em;
      }

      #noten-icon {
        width: 15rem;
      }

      @media (max-width: 900px) {
        #noten-icon {
          width: 10rem;
        }
      }

      @media (max-width: 450px) {
        #noten-icon {
          width: 7rem;
        }
      }
    `;
  }

  render() {
    return html`
      <project-card
        name="Noten"
        codesrc="https://github.com/navn-r/Noten"
        demosrc="https://ply.gl/com.noten"
        hasdemo="true"
        hasapp="true"
      >
        <p slot="info">
          Noten, meaning 'grades' in German, is a cloud based grade management
          app. (<span class="highlight">2020</span>)
        </p>
        <img
          slot="project-img"
          title="Logo design by Divya Rohit"
          src="https://raw.githubusercontent.com/navn-r/Noten/master/assets/icon-rounded.png"
          id="noten-icon"
        />
        <div slot="text">
          Core Features:
          <ul>
            <li>Basic Semester, Course, Catagory, Grade management</li>
            <li>Grade Prediction Calculator</li>
            <li>Pass/Fail Courses</li>
            <li>Multiple Grade Scales (5.0, 4.33, 4.0)</li>
            <li>Incognito Grades (ignore grade in GPA calculations)</li>
          </ul>
          <div class="tool">
            <fa-icon
              class="fab fa-react highlight"
              style="height: 1.5rem;width: 1.5rem;"
            ></fa-icon>
            <h4>React Native</h4>
          </div>
          <div class="tool">
            <fa-icon
              class="fas fa-database highlight"
              style="height: 1.5rem;width: 1.5rem;"
            ></fa-icon>
            <h4>Firebase Realtime Database</h4>
          </div>
          <div class="tool">
            <fa-icon
              class="fab fa-google highlight"
              style="height: 1.5rem;width: 1.5rem;"
            ></fa-icon>
            <h4>Firebase Auth with Google Sign in</h4>
          </div>
        </div>
      </project-card>
      <project-card
        name="Portfolio Website"
        codesrc="https://github.com/navn-r/navn-r.github.io"
      >
        <fa-icon
          slot="project-img"
          class="fas fa-laptop-code"
          style="height: 7rem;width: 7rem; color: #7F7F7F;"
        ></fa-icon>
        <div slot="info">
          Platform to showcase my projects and experiences. V1.1 (<span
            class="highlight"
            >2020</span
          >) <br /><br />
        </div>
        <div slot="text">
          <fa-icon
            class="fab fa-html5 highlight"
            style="height: 1.5rem;width: 1.5rem; color: #E34C26;"
          ></fa-icon>
          <fa-icon
            class="fas fa-plus"
            style="height: 1.5rem;width: 1.5rem;"
          ></fa-icon>
          <fa-icon
            class="fab fa-css3-alt highlight"
            style="height: 1.5rem;width: 1.5rem; color: #2196F3;"
          ></fa-icon>
          <fa-icon
            class="fas fa-plus"
            style="height: 1.5rem;width: 1.5rem;"
          ></fa-icon>
          <fa-icon
            class="fab fa-js-square highlight"
            style="height: 1.5rem;width: 1.5rem; color: #F0DB4F;"
          ></fa-icon>
          <fa-icon
            class="fas fa-equals"
            style="height: 1.5rem;width: 1.5rem;"
          ></fa-icon>
          <fa-icon
            class="fas fa-heart highlight"
            style="height: 1.5rem;width: 1.5rem;"
          ></fa-icon>
          <br />
          <ul>
            <li>Fully responsive with CSS Grid</li>
            <li>Web components using lit-element, lit-html</li>
            <li>Hosted on Github Pages</li>
          </ul>
        </div>
      </project-card>
      <div class="footer">
        "Before I do anything, I ask myself, 'Would an idiot do that?' And if
        the answer is yes, I do not do that thing."<br /><br />- Dwight K.
        Schrute<br />
      </div>
    `;
  }

  constructor() {
    super();
  }
}
customElements.define("projects-page", Projects);
