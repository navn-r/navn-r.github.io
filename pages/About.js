import { LitElement, html, css } from "lit-element";

class About extends LitElement {
  static get styles() {
    return css`
      p {
        margin: 0;
      }

      h2 {
        margin: 1rem 0 0 0;
      }

      a {
        text-decoration: none;
        color: var(--purple);
      }

      .highlight {
        color: var(--orange);
      }

      .skills-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1.5rem 0;
        padding-bottom: 1rem;
      }

      .skill {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .skill h4 {
        margin: 0.5rem 1rem;
      }

      .footer {
        padding: 1rem 0;
        margin-top: 0.25rem;
        border-top: 1px var(--orange) dashed;
      }

      .skill fa-icon {
        font-size: 2rem;
      }

      @media (max-width: 600px) {
        .skill fa-icon {
          font-size: 1.75rem;
        }
      }

      @media (max-width: 300px) {
        .skill fa-icon {
          font-size: 1.5rem;
        }
      }
    `;
  }

  render() {
    return html`<p>
        Hi, I'm Navinn!
        <br /><br />
        I am a 2nd year student dev. currently
        <span style="text-decoration: line-through;">surviving</span>
        studying at the <span class="highlight">University of Toronto</span> in Canada.<br />
        You can view my notes <a href="https://navn-r.github.io/notes" target="_blank">here</a> (work in progress)<br /><br />
      </p>
      <h2 class="highlight">Skills:</h2>
      <h3 class="highlight">Programming Languages</h3>
      <div class="skills-container">
        <div class="skill"><fa-icon class="fab fa-html5"></fa-icon><h4>HTML</h4></div>
        <div class="skill"><fa-icon class="fab fa-css3-alt"></fa-icon><h4>CSS</h4></div>
        <div class="skill"><fa-icon class="fab fa-js-square"></fa-icon><h4>JavaScript</h4></div>
        <div class="skill"><fa-icon class="fab fa-java"></fa-icon><h4>Java</h4></div>
        <div class="skill"><fa-icon class="fab fa-python"></fa-icon><h4>Python</h4></div>
        <div class="skill"><fa-icon class="fas fa-copyright"></fa-icon><h4>C</h4></div>
      </div>
      <h3 class="highlight">Frameworks and Technologies</h3>
      <div class="skills-container">
        <div class="skill"><fa-icon class="fab fa-react"></fa-icon><h4>React Native</h4></div>
        <div class="skill"><fa-icon class="fas fa-database"></fa-icon><h4>Firebase</h4></div>
        <div class="skill"><fa-icon class="fas fa-code-branch"></fa-icon><h4>Git</h4></div>
        <div class="skill"><fa-icon class="fas fa-terminal"></fa-icon><h4>Shell (bash)</h4></div>
        <div class="skill"><fa-icon class="fas fa-desktop"></fa-icon><h4>Windows, MacOS, Linux</h4></div>
      </div> 
      <div class="footer">
          "Why waste time say lot word when few word do trick."<br /><br />
          - Kevin J. Malone<br />
      </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("about-page", About);
