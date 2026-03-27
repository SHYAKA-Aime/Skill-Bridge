from flask import Blueprint, jsonify
from models import JobPosting

job_bp = Blueprint('job', __name__)

@job_bp.route('/', methods=['GET'])
def get_jobs():
    jobs = JobPosting.query.all()
    result = [{
        "id": j.id, 
        "title": j.title, 
        "employer": j.employer.company_name if j.employer else "Unknown",
        "location": j.location,
        "salary_range": j.salary_range,
        "employment_type": j.employment_type
    } for j in jobs]
    return jsonify(result), 200
