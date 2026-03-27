from app import create_app
from models import db, User, Learner, Employer, Course, Module, JobPosting
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

app = create_app()

def seed_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # 1. Create Employer
        emp_user = User(
            name="Tech Rwanda Ltd", 
            email="hr@techrw.com", 
            password_hash=generate_password_hash("password123"), 
            role="employer"
        )
        db.session.add(emp_user)
        db.session.flush()
        
        emp = Employer(
            id=emp_user.id,
            company_name="Tech Rwanda Ltd",
            industry="Technology",
            description="Leading software development firm in Kigali."
        )
        db.session.add(emp)
        
        # 2. Create Learner
        learn_user = User(
            name="Alice Mukamana", 
            email="alice@example.com", 
            password_hash=generate_password_hash("password123"), 
            role="learner"
        )
        db.session.add(learn_user)
        db.session.flush()
        
        learner = Learner(id=learn_user.id, district="Gasabo")
        db.session.add(learner)
        
        # 3. Create Course
        course1 = Course(
            title="Introduction to React JS",
            description="Learn the basics of React for modern web development.",
            category="Web Development",
            difficulty="Beginner",
            duration_hours=10,
            instructor="John Doe"
        )
        db.session.add(course1)
        db.session.flush()
        
        mod1 = Module(course_id=course1.id, title="React Components", order=1)
        db.session.add(mod1)
        
        # 4. Create Job Posting
        job1 = JobPosting(
            employer_id=emp.id,
            title="Junior Frontend Developer",
            employment_type="Full-time",
            location="Kigali",
            salary_range="300k - 500k RWF",
            description="Looking for an enthusiastic React developer.",
            requirements="Basic knowledge of React, HTML, CSS.",
            deadline=datetime.utcnow() + timedelta(days=30)
        )
        db.session.add(job1)
        
        db.session.commit()
        print("Database seeded successfully with initial data.")

if __name__ == "__main__":
    seed_data()
