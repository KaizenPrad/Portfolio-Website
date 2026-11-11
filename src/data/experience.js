import { certifications } from './personal.js'

/**
 * Timeline — taken directly from the résumé.
 */
export const timeline = [
  {
    id: 'freelance-2025-now',
    period: '2025 — Present',
    role: 'Freelance Full Stack Developer',
    org: 'Self-Employed · Remote',
    type: 'Work',
    summary:
      'Building and deploying production-ready web applications for clients — design system, React front end, Node/Express APIs, database schema and hosting.',
    points: [
      'Developed and delivered a scalable full-stack e-commerce platform for a client with secure authentication, product management and a responsive UI.',
      'Built a dedicated admin dashboard to manage products, orders, inventory and customer workflows efficiently.',
      'Integrated the Razorpay Payment Gateway for secure online transactions and implemented optimised media handling using Cloudinary.',
      'Designed backend APIs and database workflows using Node.js, Express.js, MongoDB and Supabase to ensure scalability and smooth performance.',
      'Deployed and hosted the application on Hostinger, delivering the project with production-ready functionality.',
    ],
    stack: 'MERN Stack · Razorpay · Supabase · Cloudinary',
  },
  {
    id: 'teaching',
    period: '2024 — Present',
    role: 'Development Instructor / Mentor',
    org: 'Freelance Teaching',
    type: 'Work',
    summary:
      'Teaching web development — HTML, CSS, JavaScript and the fundamentals of building for the browser — to students starting from scratch.',
    points: [
      'Explain the fundamentals of JavaScript, the DOM and responsive layout in a way that beginners can actually apply.',
      'Mentor students through their first real projects, from file structure to deployment.',
    ],
  },
  {
    id: 'education',
    period: '2024 — 2027',
    role: 'BCA — Bachelor of Computer Applications',
    org: 'Jagran College of Arts, Science and Commerce JUHI, Kanpur',
    type: 'Education',
    summary:
      'Undergraduate degree in computer applications covering programming fundamentals, data structures, database management systems, operating systems and computer networks.',
    points: [
      'Curriculum includes Java Programming, Dynamic Webpage Design, Knowledge Management, Computer Networks and Numerical Methods.',
      'Consistent academic performance with an 8.0 / 10 CGPA.',
    ],
  },
  {
    id: 'certification',
    period: 'Completed',
    role: certifications[0].name,
    org: certifications[0].issuer,
    type: 'Certification',
    summary: certifications[0].note,
    points: [],
  },
]

export const education = {
  degree: 'BCA — Bachelor of Computer Applications',
  college: 'Jagran College of Arts, Science and Commerce JUHI, Kanpur',
  university: 'Chhatrapati Shahu Ji Maharaj University (CSJMU)',
  graduationYear: '2027',
  cgpa: '8.0 / 10',
}
