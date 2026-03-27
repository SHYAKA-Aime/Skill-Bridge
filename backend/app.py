import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from dotenv import load_dotenv

from routes.auth import auth_bp
from routes.course import course_bp
from routes.job import job_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Using SQLite as default fallback for easy development, 
    # but uses MySQL if DATABASE_URL is set as requested in the plan
    database_url = os.getenv("DATABASE_URL", "sqlite:///skillbridge.db")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default-key-for-dev-change-in-prod')
    
    db.init_app(app)
    jwt = JWTManager(app)
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(course_bp, url_prefix='/api/courses')
    app.register_blueprint(job_bp, url_prefix='/api/jobs')
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "SkillBridge API is running"}), 200

    with app.app_context():
        # Auto-create tables for local rapid development base
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))
