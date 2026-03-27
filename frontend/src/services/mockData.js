// SkillBridge Rwanda - Mock Data Layer (Professional English Context)
export const initialCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    description: "Master high-level React design patterns to build scalable and maintainable web applications. Covers hooks, context, and performance.",
    category: "Software Engineering",
    difficulty: "Beginner",
    duration_hours: 12,
    instructor: "Patrick Shyaka"
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Learn to analyze complex datasets using Python, NumPy, Pandas, and Matplotlib. Perfect for aspiring data analysts.",
    category: "Data Science",
    difficulty: "Intermediate",
    duration_hours: 20,
    instructor: "Aline Keza"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Design intuitive and beautiful user interfaces. Focus on user psychology, wireframing, and modern design tools.",
    category: "UI/UX Design",
    difficulty: "Advanced",
    duration_hours: 15,
    instructor: "Eric Nkurunziza"
  },
  {
    id: 4,
    title: "Mobile App Development (Flutter)",
    description: "Build cross-platform mobile apps for Android and iOS using a single codebase with Flutter and Dart.",
    category: "Software Engineering",
    difficulty: "Intermediate",
    duration_hours: 18,
    instructor: "Solange Umutoni"
  }
];

export const initialJobs = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    employer: "Irembo Ltd",
    location: "Kigali (Gasabo)",
    employment_type: "Full-time",
    salary_range: "400k - 600k RWF",
    description: "We are looking for a creative developer with strong React skills and a passion for building user-centric interfaces."
  },
  {
    id: 2,
    title: "Python Data Analyst",
    employer: "Bank of Kigali",
    location: "Kigali (Nyarugenge)",
    employment_type: "Full-time",
    salary_range: "600k - 900k RWF",
    description: "Join our data team to analyze financial trends and provide actionable insights using Python and SQL."
  },
  {
    id: 3,
    title: "UI/UX Intern",
    employer: "Hanga Pitchfest",
    location: "Kigali (Kicukiro)",
    employment_type: "Internship",
    salary_range: "150k - 250k RWF",
    description: "Great opportunity for aspiring designers to gain hands-on experience in the tech ecosystem."
  }
];

export const initialUsers = [
  {
    id: 1,
    name: "Patrick Shyaka",
    email: "shyaka@skillbridge.rw",
    password: "password123",
    role: "learner",
    district: "Nyarugenge"
  },
  {
    id: 2,
    name: "HR Manager - TechRwanda",
    email: "hr@tech.rw",
    password: "password123",
    role: "employer",
    company_name: "TechRwanda",
    industry: "Technology"
  },
  {
    id: 3,
    name: "Platform Admin",
    email: "admin@skillbridge.rw",
    password: "password123",
    role: "admin"
  }
];
