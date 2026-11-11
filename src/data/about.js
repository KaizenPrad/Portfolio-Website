import { summary } from './personal'

export const about = {
  heading: 'More Than Just Writing Code.',
  lead: summary,
  paragraphs: [
    'Over the last two years I have shipped complete products on my own — a production streetwear e-commerce store with a Razorpay checkout and an admin command centre, a luxury hotel reservation engine with live availability and pricing, a fine-dining restaurant site with working cart and search, a real-time messaging platform over Socket.io, and a multi-tenant security monitoring platform with explainable risk scoring. Each one is designed, built, tested and deployed end to end.',
    'The day-to-day stack is React.js, Tailwind CSS and Vite on the front end, Node.js and Express.js on the back end, with MongoDB and PostgreSQL for data. I care about applications that stay reliable under real use, not demos that fall apart once a user types something unexpected.',
    'I am currently pursuing my BCA at Jagran College of Arts, Science and Commerce (CSJMU), graduating in 2027, with an 8.0 / 10 CGPA. Alongside my degree I mentor students who are taking their first steps in web development.',
    'Right now I am exploring system design, Redis, Docker, Kubernetes and AI engineering — because the next thing I build should handle more users, more data and more failure modes than the last one.',
  ],
  principles: [
    {
      title: 'Solve the real problem',
      body: 'Every brief starts with the underlying need, not the feature list. The tech stack comes second.',
    },
    {
      title: 'Own the whole system',
      body: 'Schema, API, interface and deployment are one product. I do not hand off half-built pieces.',
    },
    {
      title: 'Ship, then harden',
      body: 'A deployed product with automated QA beats a perfect prototype that only runs on my machine.',
    },
  ],
}
