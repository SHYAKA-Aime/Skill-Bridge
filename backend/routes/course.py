from flask import Blueprint, jsonify
from models import Course

course_bp = Blueprint('course', __name__)

@course_bp.route('/', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    result = [{
        "id": c.id, 
        "title": c.title, 
        "category": c.category,
        "difficulty": c.difficulty,
        "duration_hours": c.duration_hours
    } for c in courses]
    return jsonify(result), 200
