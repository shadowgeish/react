DB_NAME_URL = 'sqlite:////Users/serge/Documents/discreetincome/react/services/service_db.db'
SERVER_HOST = 'localhost'
EMAIL_SENDER = 'emailsender8080@gmail.com'
SECRET_KEY = 'ngoube'
SERVER_PORT = 27017
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime
# Import smtplib for the actual sending function
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

Base = declarative_base()

def create_bound_engine(echo=False):
    engine = create_engine(DB_NAME_URL, echo=echo)
    Session = sessionmaker(bind=engine)
    Base.metadata.create_all(engine)
    session = Session()
    return session


def get_base():
    return Base


def send_email(to,subject,message):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_SENDER
    msg['To'] = to
    msg['Subject'] = subject
    #message = format(message) + '<BR/><a href="http://localhost:8888/check_user_email?email=ngoube.serge@gmail.com">Validate email<a/>'
    msg.attach(MIMEText(message))
    mailserver = smtplib.SMTP('smtp.gmail.com', 587)
    mailserver.ehlo()
    mailserver.starttls()
    mailserver.ehlo()
    mailserver.login(EMAIL_SENDER, 'azerty8080')
    mailserver.sendmail(EMAIL_SENDER, to, msg.as_string())
    mailserver.quit()