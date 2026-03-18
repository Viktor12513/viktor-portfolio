import type { PortfolioContent } from '../types';

// Update this file to personalize the portfolio quickly.
export const portfolioContent: PortfolioContent = {
  name: 'Viktor Hagman',
  title: 'Junior Fullstack Developer',
  intro:
    'I build simple, practical web applications while learning how frontend and backend work together. My focus is on writing readable code, understanding the basics well, and improving through hands-on projects.',
  about:
    'I am learning fullstack development by building projects with React, TypeScript, Node.js, and Express. A lot of my recent work has focused on CRUD apps, working with APIs, and strengthening my backend fundamentals like routing, validation, and application structure.',
  email: 'viktor@example.com',
  github: 'https://github.com/your-github',
  linkedin: 'https://www.linkedin.com/in/your-linkedin',
  location: 'Based in Sweden',
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
      github: 'https://github.com/your-github/task-manager',
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
      liveDemo: 'https://example.com/blog-platform',
      github: 'https://github.com/your-github/blog-platform'
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
      github: 'https://github.com/your-github/expense-tracker',
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
      github: 'https://github.com/your-github/url-shortener',
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
      liveDemo: 'https://example.com/notes-app',
      github: 'https://github.com/your-github/notes-app'
    }
  ]
};
