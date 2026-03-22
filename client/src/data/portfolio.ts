import type { PortfolioContent } from '../types';

// Update this file to personalize the portfolio quickly.
export const portfolioContent: PortfolioContent = {
  name: 'Viktor Hagman',
  title: 'Junior Fullstack Developer',
  intro:
    'I am a junior developer building practical fullstack projects to strengthen my frontend and backend skills. My main focus is learning by building, writing clean and readable code, and understanding how real applications are structured end to end.',
  about:
    'I have been learning fullstack development by building projects with React, TypeScript, Node.js, Express, and MongoDB. A lot of my recent work has focused on CRUD applications, API integration, backend structure, and improving my understanding of validation, routing, and data flow. I enjoy turning ideas into simple, useful applications and improving a little with each project.',
  email: 'Viktorhagmanbusiness@gmail.com',
  github: 'https://github.com/Viktor12513',
  linkedin: 'https://www.linkedin.com/in/viktor-hagman-065bb0254/',
  location: 'Helsingborg, Sweden',
  heroStats: [
    { label: 'Projects Built', value: '5' },
    { label: 'Current Focus', value: 'React + Node.js' },
    { label: 'Goal', value: 'Internship / Entry-level role' }
  ],
  skills: [
    {
      title: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs']
    },
    {
      title: 'Database',
      items: ['MongoDB', 'Mongoose basics', 'In-memory data modeling']
    },
    {
      title: 'Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Postman']
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Task Manager App',
      description:
        'A beginner-friendly fullstack task manager where users can create, edit, complete, delete, and filter tasks. I built it to practice CRUD operations and connecting a React frontend to an Express API.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
      features: ['Create, edit, and delete tasks', 'Mark tasks as complete', 'Filter by all, active, and completed'],
      role:
        'Built the full frontend UI, created the REST API, handled validation, and connected the app end to end.',
      liveDemo: '#task-manager-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/task-manager',
      note: 'Local source included in this workspace under projects/task-manager.',
      internalDemo: true
    },
    {
      id: 2,
      name: 'Blog Platform',
      description:
        'A simple blog app where users can create, edit, and delete posts. This project helped me practice forms, reusable components, and REST API basics.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      features: ['Create and edit blog posts', 'Delete existing posts', 'Basic content management flow'],
      role:
        'Worked on the post creation flow, connected the frontend to API routes, and structured the UI for readability.',
      liveDemo: '#blog-platform-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/blog-platform',
      note: 'Local source included in this workspace under projects/blog-platform, with an embedded demo in the portfolio.',
      internalDemo: true
    },
    {
      id: 3,
      name: 'Expense Tracker',
      description:
        'An expense tracker for logging income and expenses with simple summaries. I used it to practice handling form input, categories, and displaying totals clearly.',
      techStack: ['React', 'TypeScript', 'Express', 'MongoDB'],
      features: ['Track income and expenses', 'View basic summaries', 'Store entries through an API'],
      role:
        'Created the forms, summary cards, and backend endpoints for saving and reading expense data.',
      liveDemo: '#expense-tracker-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/expense-tracker',
      note: 'Local source included in this workspace under projects/expense-tracker.',
      internalDemo: true
    },
    {
      id: 4,
      name: 'URL Shortener with Analytics',
      description:
        'A backend-focused fullstack app that shortens URLs, redirects visitors, and tracks click analytics. I built it to practice API design, data modeling, and request handling in Express.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      features: ['Generate unique short URLs', 'Redirect visitors to original links', 'Track click counts and visit timestamps'],
      role:
        'Built the frontend dashboard, designed the backend routes, modeled the link data, and added analytics tracking.',
      liveDemo: '#url-shortener-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/url-shortener',
      note: 'Local source included in this workspace under projects/url-shortener.',
      internalDemo: true
    },
    {
      id: 5,
      name: 'Notes App',
      description:
        'A lightweight notes app for writing, editing, and organizing short notes. It was useful for reinforcing state updates and reusable components in React.',
      techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      features: ['Add and delete notes', 'Edit note content', 'Simple search'],
      role:
        'Designed the layout, implemented note editing features, and built a straightforward backend for storing notes.',
      liveDemo: 'https://github.com/Viktor12513',
      github: 'https://github.com/Viktor12513',
      primaryActionLabel: 'View GitHub',
      note: 'This is a supporting project idea in the portfolio and does not have a separate published demo yet.'
    }
  ]
};
