import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class Projects extends LitElement {
  static get styles() {
    return [
      css`
        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
        }

        ul {
          margin-top: 0.5rem;
        }

        li {
          margin-top: 0.5rem;
        }

        blockquote {
          border-left: 1rem solid var(--dark-gray);
          background-color: var(--light-dark-gray);
          margin: 0;
          padding: 1rem;
          width: 45rem;
        }

        .code {
          font-family: var(--code);
          font-size: 1.25rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          user-select: none;
          -moz-user-select: none;
          width: 45rem;
        }

        .tag {
          font-family: var(--code);
          font-size: 1rem;
          background: var(--dark-gray);
          padding: 0.75rem;
          margin: 0.25rem;
          border-radius: 0.5rem;
          width: max-content;
        }

        .project {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          justify-content: space-around;
        }

        @media (max-width: 500px) {
          blockquote {
            width: calc(100% - 5rem);
          }

          ul {
            padding-left: 2rem;
          }

          .tags-container {
            width: calc(100% - 3rem);
          }
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
      <span class="title">What I've made.</span>
      <div id="projects-container">
        <project-card
          name="Ritrovo"
          github="https://github.com/navn-r/ritrovo"
          demo="https://ritrovo.herokuapp.com"
        >
          <blockquote slot="description">
            Meaning 'meeting place' in Italian, is a social platform.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Single page, single community based design</li>
              <li>View all posts by other users</li>
              <li>Create, edit, and delete posts written in Markdown</li>
              <li>Built on the MEAN stack</li>
            </ul>
            <div class="tags-container">
              <div class="tag">MongoDB</div>
              <div class="tag">ExpressJS</div>
              <div class="tag">Angular</div>
              <div class="tag">Node.js</div>
              <div class="tag">TypeScript</div>
              <div class="tag">Markdown</div>
              <div class="tag">Bootstrap</div>
              <div class="tag">Heroku</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Standup Bot"
          github="https://github.com/navn-r/standup-bot"
        >
          <blockquote slot="description">
            A Discord bot used for Scrum daily standup meetings.
          </blockquote>
          <div slot="body">
            <ul>
              <li>
                Creates and faciliates a
                <span class="code">#daily-standups</span> text channel upon
                joining
              </li>
              <li>View, add and remove members in the standup</li>
              <li>Private DM triggering a standup prompt and response</li>
              <li>Present all member responses in a formatted message</li>
              <li>
                Be in multiple standups in different servers simultaneously
              </li>
            </ul>
            <div class="tags-container">
              <div class="tag">discord.js</div>
              <div class="tag">MongoDB</div>
              <div class="tag">Heroku</div>
              <div class="tag">Node.js</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Noten"
          github="https://github.com/navn-r/standup-bot"
          demo="https://ply.gl/com.noten"
        >
          <blockquote slot="description">
            Meaning 'grades' in German, is a cloud based grade management app.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Basic Semester, Course, Catagory, Grade management</li>
              <li>Grade Prediction Calculator</li>
              <li>Pass/Fail Courses</li>
              <li>Multiple Grade Scales (5.0, 4.33, 4.0)</li>
              <li>Incognito Grades (ignored in GPA calculations)</li>
            </ul>
            <div class="tags-container">
              <div class="tag">React Native</div>
              <div class="tag">Google Sign-in</div>
              <div class="tag">Firebase Realtime Database</div>
            </div>
          </div>
        </project-card>
        <project-card name="Portfolio Website">
          <blockquote slot="description">
            Platform to showcase my projects and experiences.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Fully responsive with CSS Grid</li>
              <li>Web components using lit-element, lit-html</li>
              <li>Automated build and deployment with TravisCI</li>
              <li>Purposefully built without a front-end framework</li>
            </ul>
            <div class="tags-container">
              <div class="tag">Web Components</div>
              <div class="tag">HTML</div>
              <div class="tag">CSS</div>
              <div class="tag">JavaScript</div>
            </div>
          </div></project-card
        >
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("projects-section", Projects);
