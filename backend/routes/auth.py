from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import db, User, Learner, Employer

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register/learner', methods=['POST'])
def register_learner():
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"message": "User already exists"}), 400
    
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password,
        role='learner',
        phone=data.get('phone')
    )
    db.session.add(new_user)
    db.session.flush() # To get new_user.id
    
    new_learner = Learner(id=new_user.id, district=data.get('district'))
    db.session.add(new_learner)
    db.session.commit()
    
    return jsonify({"message": "Learner registered successfully"}), 201

@auth_bp.route('/register/employer', methods=['POST'])
def register_employer():
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"message": "User already exists"}), 400
    
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password,
        role='employer',
        phone=data.get('phone')
    )
    db.session.add(new_user)
    db.session.flush()
    
    new_employer = Employer(
        id=new_user.id, 
        company_name=data['company_name'],
        industry=data.get('industry')
    )
    db.session.add(new_employer)
    db.session.commit()
    
    return jsonify({"message": "Employer registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and check_password_hash(user.password_hash, data.get('password')):
        access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }), 200
        
    return jsonify({"message": "Invalid email or password"}), 401
