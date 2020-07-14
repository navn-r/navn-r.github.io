import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";
import "./ProjectCard";

const Projects = [
  {
    name: "UImpactify",
    color: "#a78ec3",
    github: "https://github.com/navn-r/uimpactify",
    demo: "https://uimpactify.herokuapp.com",
    description:
      "The E-Learning website dedicated to serve the social purpose sector.",
    features: [
      "Multiple User Types (Impact Learner, Impact Consultant, Social Initiatives)",
      "Course Creation and Enrollment",
      "Recorded Lectures and Graded Assessments",
      "Course Surveys & Ratings",
      "Student Analytics",
      "Realtime Chat",
      "Volunteer & Employment Opportunities",
      "Community Driven Donation System (Giving Garden)",
    ],
    tags: [
      "MongoDB",
      "ExpressJS",
      "Angular",
      "Node.js",
      "Socket.io",
      "Chart.js",
      "Multer",
      "GridFS",
      "Figma",
      "Jira",
      "Heroku",
    ],
  },
  {
    name: "Spotify API Clone",
    color: "#1DB954",
    icon: "far fa-file-alt",
    github: "https://github.com/navn-r/spotify-api-clone",
    demo: "https://navn.me/spotify-api-clone",
    description:
      "A REST API for a social-centric music player using microservices.",
    features: [
      "Create and follow/unfollow user profiles",
      "Upload and like/unlike songs",
      "Playlist generation based on liked songs",
      "Query liked songs based on followers",
    ],
    tags: ["Java", "Spring Boot", "MongoDB", "Neo4j"],
  },
  {
    name: "Ritrovo",
    color: "#F596D1",
    github: "https://github.com/navn-r/ritrovo",
    demo: "https://ritrovo.vercel.app",
    description: "Meaning 'meeting place' in Italian, is a social platform.",
    features: [
      "Single page, single community based design",
      "View all posts by other users",
      "Create, edit, and delete posts written in Markdown",
      "Used GraphQL Code Generator for shared schemas and interfaces",
    ],
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Apollo",
      "MongoDB",
      "Mongoose",
      "JSON Web Tokens",
      "Vercel",
    ],
  },
  {
    name: "Standup Bot",
    color: "#7289da",
    github: "https://github.com/navn-r/standup-bot",
    description: "A Discord bot used for Scrum daily standup meetings.",
    features: [
      html`Creates and facilitates a
        <span class="code">#daily-standups</span> text channel upon joining`,
      "View, add and remove members in the standup",
      "Private DM triggering a standup prompt and response",
      "Present all member responses in a formatted message",
      "Be in multiple standups in different servers simultaneously",
    ],
    tags: ["discord.js", "MongoDB", "Heroku", "Node.js"],
  },
  {
    name: "Noten",
    color: "#F90",
    icon: "fab fa-google-play",
    github: "https://github.com/navn-r/noten",
    demo: "https://play.google.com/store/apps/details?id=com.noten",
    description:
      "Meaning 'grades' in German, is a cloud based grade management app.",
    features: [
      "Basic Semester, Course, Category, Grade management",
      "Grade Prediction Calculator",
      "Pass/Fail Courses",
      "Multiple Grade Scales (5.0, 4.33, 4.0)",
      "Incognito Grades (ignored in GPA calculations)",
    ],
    tags: ["React Native", "Google Sign-in", "Firebase Realtime Database"],
  },
  {
    name: "Portfolio Website",
    color: "var(--red)",
    github: "https://github.com/navn-r/navn-r.github.io",
    description: "Platform to showcase my projects and experiences.",
    features: [
      "Fully responsive with CSS Grid",
      "Modular encapsulated components using lit-element, lit-html",
      "Automated build and deployment with TravisCI",
      "Purposefully built without a front-end framework",
    ],
    tags: ["Web Components", "HTML", "CSS", "JavaScript"],
  },
];

class ProjectsSection extends LitElement {
  static get styles() {
    return [
      css`
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
      <div class="title">What I've made.</div>
      <div id="projects-container">
        ${Projects.map(
          (p) => html`<project-card .project="${p}"></project-card>`
        )}
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("projects-section", ProjectsSection);
