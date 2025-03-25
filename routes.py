from datetime import datetime
from flask import render_template, url_for, flash, redirect, request
from flask_login import login_user, current_user, logout_user, login_required
from flask_mail import Message
from urllib.parse import urlparse

from app import db, mail
from models import User, PasswordReset
from forms import LoginForm, SignupForm, RequestResetForm, ResetPasswordForm


def register_routes(app):
    @app.route('/')
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        
        form = LoginForm()
        if form.validate_on_submit():
            email = form.email.data
            if email:
                email = email.lower()
            user = User.query.filter_by(email=email).first()
            
            if user and user.check_password(form.password.data):
                login_user(user, remember=form.remember.data)
                
                # Update last login
                user.last_login = datetime.utcnow()
                db.session.commit()
                
                next_page = request.args.get('next')
                if not next_page or urlparse(next_page).netloc != '':
                    next_page = url_for('home')
                    
                flash('Login successful. Welcome back!', 'success')
                return redirect(next_page)
            else:
                flash('Login failed. Please check your email and password.', 'danger')
        
        return render_template('login.html', title='Login', form=form)

    @app.route('/signup', methods=['GET', 'POST'])
    def signup():
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        
        form = SignupForm()
        if form.validate_on_submit():
            email = form.email.data
            if email:
                email = email.lower()
            
            user = User(
                username=form.username.data,
                email=email
            )
            user.set_password(form.password.data)
            
            db.session.add(user)
            db.session.commit()
            
            flash('Your account has been created! You can now log in.', 'success')
            return redirect(url_for('login'))
        
        return render_template('signup.html', title='Sign Up', form=form)

    @app.route('/logout')
    def logout():
        logout_user()
        flash('You have been logged out.', 'info')
        return redirect(url_for('login'))

    @app.route('/home', methods=['GET', 'POST'])
    @login_required
    def home():
        # Update last login time if not already set during this session
        if current_user.is_authenticated and not getattr(current_user, '_login_time_updated', False):
            current_user.last_login = datetime.utcnow()
            db.session.commit()
            setattr(current_user, '_login_time_updated', True)
        
        return render_template('home.html', title='Home', user=current_user)
    
    def send_reset_email(user, token):
        msg = Message(
            'GeoGuard Password Reset Request',
            recipients=[user.email]
        )
        msg.body = f'''To reset your password, visit the following link:
{url_for('reset_password', token=token, _external=True)}

If you did not make this request, please ignore this email and no changes will be made.
'''
        mail.send(msg)

    @app.route('/reset_password', methods=['GET', 'POST'])
    def reset_request():
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        
        form = RequestResetForm()
        if form.validate_on_submit():
            email = form.email.data
            if email:
                email = email.lower()
            user = User.query.filter_by(email=email).first()
            
            if user:
                # Generate token
                token = PasswordReset.generate_token()
                reset_token = PasswordReset(user_id=user.id, token=token)
                
                db.session.add(reset_token)
                db.session.commit()
                
                # Send email
                send_reset_email(user, token)
                
                flash('An email has been sent with instructions to reset your password.', 'info')
            else:
                # Don't tell the user if the email exists or not for security
                flash('If that email exists in our system, a password reset link will be sent.', 'info')
                
            return redirect(url_for('login'))
        
        return render_template('reset_request.html', title='Reset Password', form=form)

    @app.route('/reset_password/<token>', methods=['GET', 'POST'])
    def reset_password(token):
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        
        reset_token = PasswordReset.get_valid_token(token)
        
        if reset_token is None:
            flash('That is an invalid or expired token', 'warning')
            return redirect(url_for('reset_request'))
        
        form = ResetPasswordForm()
        if form.validate_on_submit():
            user = User.query.get(reset_token.user_id)
            user.set_password(form.password.data)
            
            # Expire the token
            reset_token.expire()
            
            db.session.commit()
            flash('Your password has been updated! You can now log in.', 'success')
            return redirect(url_for('login'))
        
        return render_template('reset_password.html', title='Reset Password', form=form)
