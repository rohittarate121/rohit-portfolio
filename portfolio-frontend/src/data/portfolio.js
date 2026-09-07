// ---------------------------------------------------------------------------
// Single source of truth for portfolio content.
// Edit this file to update the site — no other file should hardcode content.
// Items marked isPlaceholder: true are NOT real and must be replaced.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Rohit Tarate",
  title: "Full Stack Developer",
  subtitle: "Java & Spring Boot Developer",
  tagline:
    "Building scalable, secure and user-focused web applications using Java, Spring Boot, React and modern technologies.",
  email: "rohit.tarate123@gmail.com",
  phone: "7020863430",
  github: "https://github.com/rohittarate121",
  linkedin: "https://www.linkedin.com/in/rohit-tarate09",
  location: "India — open to relocation",
  resumeUrl: "/resume/Rohit_Tarate_Resume.pdf", // place actual PDF at public/resume/
  objective:
    "PG-DAC graduate from CDAC with a B.E. in Computer Science Engineering, with hands-on experience designing and developing full-stack web applications, backend services, and RESTful APIs through internships and real-world projects. Strong foundation in software engineering principles, object-oriented design, data structures, and modern application development.",
};

export const education = [
  {
    degree: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
    school: "Centre for Development of Advanced Computing (CDAC)",
    period: "2026",
  },
  {
    degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
    school: "Trinity Academy of Engineering, Savitribai Phule Pune University",
    period: "2025",
    detail: "CGPA: 6.75 / 10",
  },
];

export const timeline = [
  { label: "B.Tech / B.E. — Computer Science Engineering" },
  { label: "Data Intern — Weekday (YC W21)" },
  { label: "Web Development Intern — Wisdom Sprouts" },
  { label: "PG-DAC — CDAC" },
  { label: "Full-Stack Projects & Software Development" },
];

// ---------------------------------------------------------------------------
// Skills — grouped, no fake percentages. Levels: "Primary" | "Strong" | "Working Knowledge"
// ---------------------------------------------------------------------------
export const skillCategories = [
  {
    category: "Programming",
    endpoint: "GET /skills/programming",
    skills: [
      { name: "Java", level: "Primary" },
      { name: "JavaScript", level: "Strong" },
      { name: "C++", level: "Working Knowledge" },
      { name: "C#", level: "Working Knowledge" },
      { name: "SQL", level: "Strong" },
    ],
  },
  {
    category: "Backend",
    endpoint: "GET /skills/backend",
    skills: [
      { name: "Spring Boot", level: "Primary" },
      { name: "Spring Security", level: "Strong" },
      { name: "Spring MVC", level: "Strong" },
      { name: "Hibernate / JPA", level: "Strong" },
      { name: "Node.js", level: "Strong" },
      { name: "Express.js", level: "Strong" },
      { name: "REST API Design", level: "Primary" },
      { name: "Microservices", level: "Working Knowledge" },
      { name: "JWT Authentication", level: "Strong" },
    ],
  },
  {
    category: "Frontend",
    endpoint: "GET /skills/frontend",
    skills: [
      { name: "React.js", level: "Primary" },
      { name: "Redux Toolkit", level: "Strong" },
      { name: "React Router", level: "Strong" },
      { name: "Tailwind CSS", level: "Strong" },
      { name: "HTML5 / CSS3", level: "Strong" },
      { name: "Bootstrap", level: "Working Knowledge" },
    ],
  },
  {
    category: "Database",
    endpoint: "GET /skills/database",
    skills: [
      { name: "MySQL", level: "Primary" },
      { name: "Oracle SQL / PL-SQL", level: "Strong" },
      { name: "MongoDB", level: "Strong" },
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    endpoint: "GET /skills/tools",
    skills: [
      { name: "Docker", level: "Strong" },
      { name: "Kubernetes", level: "Working Knowledge" },
      { name: "Jenkins", level: "Working Knowledge" },
      { name: "Microsoft Azure", level: "Working Knowledge" },
      { name: "Git & GitHub", level: "Primary" },
      { name: "Postman / Swagger", level: "Strong" },
      { name: "Maven", level: "Strong" },
    ],
  },
  {
    category: "Testing & QA",
    endpoint: "GET /skills/testing",
    skills: [
      { name: "JUnit / Mockito", level: "Working Knowledge" },
      { name: "Selenium WebDriver", level: "Working Knowledge" },
    ],
  },
  {
    category: "Computer Science",
    endpoint: "GET /skills/foundations",
    skills: [
      { name: "Data Structures & Algorithms", level: "Strong" },
      { name: "Object-Oriented Programming", level: "Primary" },
      { name: "DBMS", level: "Strong" },
      { name: "Operating Systems", level: "Working Knowledge" },
      { name: "Computer Networks", level: "Working Knowledge" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
export const experience = [
  {
    role: "Web Development Intern",
    org: "Wisdom Sprouts",
    duration: "3 months",
    points: [
      "Developed and maintained responsive web applications.",
      "Assisted in backend development and database integration.",
      "Fixed bugs and improved application functionality.",
    ],
    tech: ["JavaScript", "HTML", "CSS", "Backend Integration"],
  },
  {
    role: "Data Intern",
    org: "Weekday (YC W21)",
    duration: "1 year 2 months",
    points: [
      "Performed data entry and maintained accurate records.",
      "Assisted in candidate sourcing and onboarding activities.",
      "Supported day-to-day operational tasks.",
    ],
    tech: ["Data Operations"],
  },
];

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------
export const certifications = [
  {
    name: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
    org: "Centre for Development of Advanced Computing (CDAC)",
    date: "2026",
    credentialId: null,
    verifyUrl: null,
    isPlaceholder: false,
  },
];

// ---------------------------------------------------------------------------
// Coding profiles — links only, no fabricated stats
// ---------------------------------------------------------------------------
export const codingProfiles = [
  { platform: "GitHub", url: "https://github.com/rohittarate121", handle: "rohittarate121" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/rohit-tarate09", handle: "rohit-tarate09" },
  { platform: "LeetCode", url: null, handle: null, isPlaceholder: true },
  { platform: "HackerRank", url: null, handle: null, isPlaceholder: true },
  { platform: "GeeksforGeeks", url: null, handle: null, isPlaceholder: true },
  { platform: "CodeChef", url: null, handle: null, isPlaceholder: true },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projects = [
  {
    slug: "smart-healthcare-management-system",
    name: "Smart Healthcare Management System",
    shortName: "Healthcare Management System",
    tagline: "AI-powered Electronic Health Records platform",
    description:
      "A microservices-based full-stack application for managing patients, doctors, and appointments, with secure authentication and modern DevOps deployment practices.",
    stack: ["Java", "Spring Boot", "React.js", "Microservices", "Docker", "Kubernetes", "Jenkins", "MySQL"],
    features: [
      "Microservices-based architecture using Spring Boot and React.js",
      "Secure RESTful APIs with JWT authentication and role-based access control",
      "Containerized services with Docker, deployed via Kubernetes",
      "CI/CD pipelines built with Jenkins",
      "Redis integration for performance optimization",
      "Deployed on Microsoft Azure",
    ],
    architecture: "Browser → REST API Gateway → Spring Boot Microservices → MySQL",
    endpoints: [
      { method: "POST", path: "/api/auth/login" },
      { method: "GET", path: "/api/patients" },
      { method: "POST", path: "/api/appointments" },
      { method: "GET", path: "/api/doctors/{id}" },
    ],
    github: "https://github.com/rohittarate121/Smart-Healthcare-Management-System",
    demo: "https://smart-healthcare-management-system-weld.vercel.app/",
    challenges: "Placeholder — add the specific technical challenges you solved (e.g. service-to-service auth, data consistency across microservices).",
    learnings: "Placeholder — add what this project taught you.",
    future: "Placeholder — add planned improvements.",
    isPlaceholderDetail: true,
  },
  {
    slug: "stockflow",
    name: "StockFlow",
    shortName: "StockFlow",
    tagline: "B2B Inventory Management System",
    description:
      "An inventory management system for B2B use cases — product management, stock tracking, and low-stock alerting, built on a REST API backend.",
    stack: ["Node.js", "Express.js", "MySQL", "REST APIs"],
    features: [
      "Inventory and product management",
      "Stock tracking with low-stock alerts",
      "REST API architecture",
    ],
    architecture: "Browser → REST API → Express.js → MySQL",
    endpoints: [
      { method: "GET", path: "/api/products" },
      { method: "POST", path: "/api/products" },
      { method: "PUT", path: "/api/products/{id}" },
      { method: "DELETE", path: "/api/products/{id}" },
    ],
    github: null,
    demo: null,
    challenges: "Placeholder — add once repo link is available.",
    learnings: "Placeholder — add once repo link is available.",
    future: "Placeholder.",
    isPlaceholderDetail: true,
    isPlaceholderLinks: true,
  },
  {
    slug: "quickshow",
    name: "QuickShow",
    shortName: "QuickShow",
    tagline: "Full-Stack Movie Ticket Booking App",
    description:
      "A responsive movie ticket booking platform built on the MERN stack, with seat selection, authentication, and payment integration.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "TMDB API", "Stripe"],
    features: [
      "JWT-based authentication and role-based access control",
      "RESTful APIs for movie booking, seat selection, and user management",
      "TMDB API integration for movie data",
      "Stripe integration for payments",
      "Responsive UI with efficient state management",
    ],
    architecture: "Browser (React) → REST API → Express.js → MongoDB",
    endpoints: [
      { method: "POST", path: "/api/auth/login" },
      { method: "GET", path: "/api/movies" },
      { method: "POST", path: "/api/bookings" },
      { method: "GET", path: "/api/bookings/{userId}" },
    ],
    github: "https://github.com/rohittarate121/Quickshow",
    demo: "https://quickshow-sand.vercel.app/",
    challenges: "Placeholder — add the specific technical challenges you solved (e.g. seat-locking during concurrent bookings, payment webhook handling).",
    learnings: "Placeholder — add what this project taught you.",
    future: "Placeholder — add planned improvements.",
    isPlaceholderDetail: true,
  },
];
