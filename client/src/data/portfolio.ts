import type { PortfolioContent } from '../types';

// Update this file to personalize the portfolio quickly.
export const portfolioContent: PortfolioContent = {
  name: 'Viktor Hagman',
  title: 'Junior Fullstack Developer',
  intro:
    'I am a junior fullstack developer focused on building practical, readable applications with React, TypeScript, Node.js, and Express. I enjoy learning by building real projects and improving my understanding of how frontend and backend pieces work together.',
  about:
    'I have been learning fullstack development by building projects with React, TypeScript, Node.js, Express, and MongoDB. Much of my recent work has focused on CRUD applications, API integration, backend structure, and understanding concepts like validation, routing, and data flow more clearly. I like turning ideas into simple, useful applications and using each project as a way to keep improving both technically and practically.',
  email: 'Viktorhagmanbusiness@gmail.com',
  github: 'https://github.com/Viktor12513',
  linkedin: 'https://www.linkedin.com/in/viktor-hagman-065bb0254/',
  location: 'Helsingborg, Sweden',
  heroStats: [
    { label: 'Projects Built', value: '5' },
    { label: 'Current Focus', value: 'Frontend + API Integration' },
    { label: 'Goal', value: 'Internship / Junior role' }
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
        'A beginner-friendly task management app where users can create, edit, complete, delete, and filter tasks. I built it to practice full CRUD operations and connect a React frontend to an Express backend in a clean, understandable way.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
      features: [
        'Create, edit, and delete tasks',
        'Mark tasks as complete and update status',
        'Filter between all, active, and completed tasks'
      ],
      role:
        'Built the full user interface, created the REST API routes, handled basic validation, and connected the frontend and backend end to end.',
      liveDemo: '#task-manager-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/task-manager',
      note: 'This project is available as both an embedded demo in the portfolio and a standalone app under projects/task-manager.',
      internalDemo: true
    },
    {
      id: 2,
      name: 'Blog Platform',
      description:
        'A simple blog platform where users can write, edit, publish, and delete posts. I used this project to practice form handling, reusable components, and the basics of a content management workflow.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express'],
      features: [
        'Create, edit, and delete blog posts',
        'Save posts as published entries or drafts',
        'Manage content through a simple REST API flow'
      ],
      role:
        'Built the post creation and editing flow, connected the frontend to backend routes, and structured the interface so the content dashboard feels easy to follow.',
      liveDemo: '#blog-platform-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/blog-platform',
      note: 'This project is available as both an embedded demo in the portfolio and a standalone app under projects/blog-platform.',
      internalDemo: true
    },
    {
      id: 3,
      name: 'Expense Tracker',
      description:
        'An expense tracker for logging income and expenses with clear summaries and category totals. I built it to practice handling form input, organizing entries, and presenting financial data in a simple way.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express'],
      features: [
        'Add income and expense entries',
        'View total balance and category summaries',
        'Delete entries and keep the dashboard updated'
      ],
      role:
        'Created the entry form, summary cards, and API endpoints for saving, reading, and removing expense data.',
      liveDemo: '#expense-tracker-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/expense-tracker',
      note: 'This project is available as both an embedded demo in the portfolio and a standalone app under projects/expense-tracker.',
      internalDemo: true
    },
    {
      id: 4,
      name: 'URL Shortener with Analytics',
      description:
        'A backend-focused project that shortens URLs, redirects visitors, and tracks click analytics. I built it to practice API design, data modeling, and request handling with a stronger backend focus than my other projects.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      features: [
        'Generate unique short URLs',
        'Redirect visitors to the original links',
        'Track click counts and basic visit analytics'
      ],
      role:
        'Built the frontend dashboard, designed the backend routes, modeled the link data, and added analytics tracking for clicks and visits.',
      liveDemo: '#url-shortener-demo',
      github: 'https://github.com/Viktor12513/viktor-portfolio/tree/main/projects/url-shortener',
      note: 'This project is available as both an embedded demo in the portfolio and a standalone app under projects/url-shortener.',
      internalDemo: true
    },
    {
      id: 5,
      name: 'Notes App',
      description:
        'A lightweight notes app concept for writing, editing, and organizing short notes. It helped me reinforce state updates, simple UI structure, and reusable React components.',
      techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      features: ['Add and remove notes', 'Edit note content', 'Simple search and organization flow'],
      role:
        'Designed the layout, implemented the note editing flow, and planned a straightforward backend structure for storing notes.',
      liveDemo: 'https://github.com/Viktor12513',
      github: 'https://github.com/Viktor12513',
      primaryActionLabel: 'View GitHub',
      note: 'This is a smaller supporting project idea in the portfolio and does not have a separate published demo yet.'
    }
  ]
};
