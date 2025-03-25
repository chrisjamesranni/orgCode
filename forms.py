from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError, Regexp
from models import User


class LoginForm(FlaskForm):
    """Login form."""
    email = StringField('Email', validators=[
        DataRequired(), 
        Email()
    ])
    password = PasswordField('Password', validators=[
        DataRequired()
    ])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')


class SignupForm(FlaskForm):
    """Registration form."""
    username = StringField('Username', validators=[
        DataRequired(),
        Length(min=3, max=25),
        Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
               'Usernames must start with a letter and can only contain '
               'letters, numbers, dots or underscores')
    ])
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
    ])
    password = PasswordField('Password', validators=[
        DataRequired(),
        Length(min=8, message='Password must be at least 8 characters long'),
        Regexp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', 0,
               'Password must include at least one uppercase letter, '
               'one lowercase letter, and one number')
    ])
    confirm_password = PasswordField('Confirm Password', validators=[
        DataRequired(),
        EqualTo('password', message='Passwords must match')
    ])
    submit = SubmitField('Sign Up')
    
    def validate_username(self, username):
        """Check if username is already in use."""
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Username already taken. Please choose a different one.')
            
    def validate_email(self, email):
        """Check if email is already registered."""
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Email already registered. Please use a different one or login.')


class RequestResetForm(FlaskForm):
    """Form for requesting a password reset."""
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
    ])
    submit = SubmitField('Request Password Reset')
    
    def validate_email(self, email):
        """Check if email exists in the database."""
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with that email. You must register first.')


class ResetPasswordForm(FlaskForm):
    """Form for resetting a password."""
    password = PasswordField('New Password', validators=[
        DataRequired(),
        Length(min=8, message='Password must be at least 8 characters long'),
        Regexp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', 0,
               'Password must include at least one uppercase letter, '
               'one lowercase letter, and one number')
    ])
    confirm_password = PasswordField('Confirm Password', validators=[
        DataRequired(),
        EqualTo('password', message='Passwords must match')
    ])
    submit = SubmitField('Reset Password')
