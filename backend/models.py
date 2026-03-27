from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), nullable=False) # 'learner', 'employer', 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Learner(db.Model):
    __tablename__ = 'learners'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(20))
    district = db.Column(db.String(50))
    
    user = db.relationship('User', backref=db.backref('learner_profile', uselist=False))

class Employer(db.Model):
    __tablename__ = 'employers'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    registration_number = db.Column(db.String(50))
    industry = db.Column(db.String(50))
    description = db.Column(db.Text)
    address = db.Column(db.String(200))
    
    user = db.relationship('User', backref=db.backref('employer_profile', uselist=False))

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(100))
    difficulty = db.Column(db.String(50))
    duration_hours = db.Column(db.Integer)
    instructor = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Module(db.Model):
    __tablename__ = 'modules'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    order = db.Column(db.Integer)
    
    course = db.relationship('Course', backref=db.backref('modules', lazy=True))

class JobPosting(db.Model):
    __tablename__ = 'job_postings'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employers.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    employment_type = db.Column(db.String(50))
    location = db.Column(db.String(100))
    salary_range = db.Column(db.String(100))
    description = db.Column(db.Text)
    requirements = db.Column(db.Text)
    deadline = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='Open')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    employer = db.relationship('Employer', backref=db.backref('job_postings', lazy=True))

class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    learner_id = db.Column(db.Integer, db.ForeignKey('learners.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job_postings.id'), nullable=False)
    status = db.Column(db.String(50), default='Submitted') 
    cover_letter = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    learner = db.relationship('Learner', backref=db.backref('applications', lazy=True))
    job = db.relationship('JobPosting', backref=db.backref('applications', lazy=True))
