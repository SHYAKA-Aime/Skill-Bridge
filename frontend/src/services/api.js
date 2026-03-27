import axios from 'axios';
import { initialCourses, initialJobs, initialUsers } from './mockData';

// Initialize localStorage with versioning to ensure latest English data
const MOCK_DATA_VERSION = 'en-v3';
const currentVersion = localStorage.getItem('mock_data_version');

if (currentVersion !== MOCK_DATA_VERSION) {
  localStorage.setItem('mock_users', JSON.stringify(initialUsers));
  localStorage.setItem('mock_courses', JSON.stringify(initialCourses));
  localStorage.setItem('mock_jobs', JSON.stringify(initialJobs));
  localStorage.setItem('mock_data_version', MOCK_DATA_VERSION);
  // Clear other related items to prevent mismatch
  localStorage.removeItem('mock_enrollments');
  localStorage.removeItem('mock_applications');
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Mock Implementation Wrapper
const mockResponse = (data, status = 200) => {
  return Promise.resolve({ data, status });
};

const mockError = (message, status = 400) => {
  return Promise.reject({ response: { data: { message, error: message }, status } });
};

// Override core methods to use Mocks if no API URL is provided (Live Demo Mode)
const isLiveDemo = !import.meta.env.VITE_API_URL;

const originalPost = api.post;
api.post = async (url, data, config) => {
  if (!isLiveDemo) return originalPost.call(api, url, data, config);

  console.log(`[Mock API] POST ${url}`, data);

  // AUTH: Login
  if (url === '/auth/login') {
    const users = JSON.parse(localStorage.getItem('mock_users'));
    const user = users.find(u => u.email === data.email && (data.password === 'password123' || u.password === data.password));
    if (user) {
      return mockResponse({
        access_token: 'mock-jwt-token-' + Math.random(),
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    }
    return mockError('Login failed. Please check your email and password.');
  }

  // AUTH: Register
  if (url.startsWith('/auth/register/')) {
    const users = JSON.parse(localStorage.getItem('mock_users'));
    if (users.find(u => u.email === data.email)) {
      return mockError('Email address already in use.');
    }
    const newUser = { ...data, id: users.length + 1, role: url.includes('employer') ? 'employer' : 'learner' };
    users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(users));
    return mockResponse({ message: 'Registration successful!' }, 201);
  }

  // COURSE CRUD (Admin Only)
  if (url === '/courses/' && data) {
    const list = JSON.parse(localStorage.getItem('mock_courses'));
    const newItem = { ...data, id: list.length + 1 };
    list.push(newItem);
    localStorage.setItem('mock_courses', JSON.stringify(list));
    return mockResponse(newItem, 201);
  }

  // JOB CRUD (Employer Only)
  if (url === '/jobs/' && data) {
    const list = JSON.parse(localStorage.getItem('mock_jobs'));
    const newItem = { ...data, id: list.length + 1 };
    list.push(newItem);
    localStorage.setItem('mock_jobs', JSON.stringify(list));
    return mockResponse(newItem, 201);
  }

  // ENROLL: Course (Linked to User)
  if (url.startsWith('/courses/') && url.endsWith('/enroll')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return mockError('Unauthenticated', 401);
    
    const enrollments = JSON.parse(localStorage.getItem(`mock_enrollments_${user.id}`) || '[]');
    const courseId = parseInt(url.split('/')[2]);
    if (!enrollments.includes(courseId)) {
      enrollments.push(courseId);
      localStorage.setItem(`mock_enrollments_${user.id}`, JSON.stringify(enrollments));
    }
    return mockResponse({ message: 'Enrolled successfully!' });
  }

  // APPLY: Job (Include Profile)
  if (url.startsWith('/jobs/') && url.endsWith('/apply')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return mockError('Unauthenticated', 401);

    const enrolledIds = JSON.parse(localStorage.getItem(`mock_enrollments_${user.id}`) || '[]');
    const allCourses = JSON.parse(localStorage.getItem('mock_courses'));
    const studentCourses = allCourses.filter(c => enrolledIds.includes(c.id));

    const applications = JSON.parse(localStorage.getItem('mock_applications') || '[]');
    const jobId = parseInt(url.split('/')[2]);
    
    const newApp = {
      id: Date.now(),
      jobId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      skills: studentCourses.map(c => c.title),
      appliedAt: new Date().toISOString()
    };

    applications.push(newApp);
    localStorage.setItem('mock_applications', JSON.stringify(applications));
    return mockResponse({ message: 'Application submitted successfully!' });
  }

  return originalPost.call(api, url, data, config);
};

const originalPut = api.put;
api.put = async (url, data, config) => {
  if (!isLiveDemo) return originalPut.call(api, url, data, config);
  
  if (url.startsWith('/courses/')) {
    const id = parseInt(url.split('/')[2]);
    let list = JSON.parse(localStorage.getItem('mock_courses'));
    list = list.map(item => item.id === id ? { ...item, ...data } : item);
    localStorage.setItem('mock_courses', JSON.stringify(list));
    return mockResponse({ message: 'Course updated!' });
  }
  
  if (url.startsWith('/jobs/')) {
    const id = parseInt(url.split('/')[2]);
    let list = JSON.parse(localStorage.getItem('mock_jobs'));
    list = list.map(item => item.id === id ? { ...item, ...data } : item);
    localStorage.setItem('mock_jobs', JSON.stringify(list));
    return mockResponse({ message: 'Job updated!' });
  }
  return originalPut.call(api, url, data, config);
};

const originalDelete = api.delete;
api.delete = async (url, config) => {
  if (!isLiveDemo) return originalDelete.call(api, url, config);
  
  if (url.startsWith('/courses/')) {
    const id = parseInt(url.split('/')[2]);
    let list = JSON.parse(localStorage.getItem('mock_courses'));
    list = list.filter(item => item.id !== id);
    localStorage.setItem('mock_courses', JSON.stringify(list));
    return mockResponse({ message: 'Course deleted!' });
  }
  
  if (url.startsWith('/jobs/')) {
    const id = parseInt(url.split('/')[2]);
    let list = JSON.parse(localStorage.getItem('mock_jobs'));
    list = list.filter(item => item.id !== id);
    localStorage.setItem('mock_jobs', JSON.stringify(list));
    return mockResponse({ message: 'Job deleted!' });
  }
  return originalDelete.call(api, url, config);
};

const originalGet = api.get;
api.get = async (url, config) => {
  if (!isLiveDemo) return originalGet.call(api, url, config);

  console.log(`[Mock API] GET ${url}`);

  if (url === '/courses/') {
    return mockResponse(JSON.parse(localStorage.getItem('mock_courses')));
  }
  if (url === '/jobs/') {
    return mockResponse(JSON.parse(localStorage.getItem('mock_jobs')));
  }
  
  // GET Applicant's Profile (Courses)
  if (url.startsWith('/users/') && url.endsWith('/courses')) {
    const userId = url.split('/')[2];
    const enrolledIds = JSON.parse(localStorage.getItem(`mock_enrollments_${userId}`) || '[]');
    const allCourses = JSON.parse(localStorage.getItem('mock_courses'));
    return mockResponse(allCourses.filter(c => enrolledIds.includes(c.id)));
  }

  // GET Job Applications (Employer only)
  if (url === '/employer/applications') {
    return mockResponse(JSON.parse(localStorage.getItem('mock_applications') || '[]'));
  }

  return originalGet.call(api, url, config);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
