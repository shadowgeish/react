import tornado.web
import datetime
# Import smtplib for the actual sending function
import smtplib
import random
import string
from Model.model import *
from utils import *
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
import sys



class UserInfosHandler(tornado.web.RequestHandler):
    def initialize(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Origin', self.request.headers.get('Origin', '*'))
        self.set_header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def get(self):
        print('get')
        self.request_handler()

    def post(self):
        print('post')
        self.request_handler()

    def request_handler(self):
        session = create_bound_engine()
        str_write = '{"user_exist":"no"}'
        try:
            token = self.get_argument('token', True)
            import jwt
            tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            id = tokenData['id']
            users = session.query(User).filter(User.id == id).all()
            if len(users) == 0:
                str_write = '{"user_exist":"no"}'
            else:
                user = users[0]
                str_write = '{"user_exist":"yes","first_name":"' + format(user.first_name) + \
                            '","sur_name":"' + format(user.sur_name) + \
                            '","gender":"' + format(user.gender) + \
                            '","photo_path":"' + format(user.photo_path) + \
                            '","id_scan_path":"' + format(user.id_scan_path) + \
                            '","id_scan_expire_date":"' + format(user.id_scan_expire_date) + \
                            '","credit_score":"' + format(user.credit_score) + \
                            '","credit_score_date":"' + format(user.credit_score_date) + \
                            '","date_creation":"' + format(user.date_creation) + \
                            '","date_of_birth":"' + format(user.date_of_birth) + \
                            '","country_of_birth":"' + format(user.country_of_birth) + \
                            '","town_of_birth":"' + format(user.town_of_birth) + \
                            '","address_number":"' + format(user.address_number) + \
                            '","address_street_name":"' + format(user.address_street_name) + \
                            '","address_post_code":"' + format(user.address_post_code) + \
                            '","address_town":"' + format(user.address_town) + \
                            '","address_country":"' + format(user.address_country) + \
                            '","contact_home_phone":"' + format(user.contact_home_phone) + \
                            '","contact_mobile_phone":"' + format(user.contact_mobile_phone) + \
                            '","email":"' + format(user.email) + '"}'
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()


class LogUserHandler(tornado.web.RequestHandler):
    def initialize(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Origin', self.request.headers.get('Origin', '*'))
        self.set_header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def get(self):
        print('get')
        self.request_handler()

    def post(self):
        print('post')
        self.request_handler()

    def request_handler(self):
        session = create_bound_engine()
        str_write = '{"user_exist":"no","login":"no","token":"no"}'
        try:
            email = self.get_argument('email', True)
            password = self.get_argument('password', True)
            users = session.query(User).filter(User.email == email, User.password == password, User.email_validation_status == 'VALIDATED').all()
            if len(users) == 0:
                str_write = '{"user_exist":"no","login":"no","token":"no"}'
            else:
                user = users[0]
                import jwt
                token = jwt.encode({'id': user.id,'email': user.email}, SECRET_KEY, algorithm='HS256')
                str_write = '{"user_exist":"yes","login":"yes","token":"' + format(token.decode("utf-8")) + '"}'
                print(' token = ' +  format(token) + ' and ' + format(token))
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()


class CheckUserEmailHandler(tornado.web.RequestHandler):
    def initialize(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Origin', self.request.headers.get('Origin', '*'))
        self.set_header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def get(self):
        print('get')
        self.request_handler()

    def post(self):
        print('post')
        self.request_handler()

    def request_handler(self):
        session = create_bound_engine()
        str_write = '{"existing_email":"no","email_validated":"no","code_check":"no","token":"no"}'

        try:
            email = self.get_argument('email', True)
            validation_code = self.get_argument('valicationCode', True)
            users = session.query(User).filter(User.email == email, User.email_validation_status == 'NOT_VALIDATED').all()
            if len(users) == 0:
                str_write = '{"existing_email":"no","email_validated":"no","code_check":"no","token":"no"}'
            else:
                uvalidation_code = users[0].validation_code
                print(' compararing ' +  format(uvalidation_code) + ' and ' + format(validation_code))
                if uvalidation_code == validation_code:
                    session.query(User).filter(User.email == email). \
                        update({User.email_validation_status: 'VALIDATED'}, synchronize_session=False)
                    session.commit()
                    import jwt
                    token = jwt.encode({'email': email}, SECRET_KEY, algorithm='HS256')
                    print(' token = ' +  format(token) + ' and ' + format(token))
                    str_write = '{"existing_email":"yes","email_validated":"yes","code_check":"yes","token":"' + format(token.decode("utf-8")) + '"}'
                else:
                    str_write = '{"existing_email":"yes","email_validated":"yes","code_check":"no","token":"no"}'
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            self.write(str_write)
            session.close()

def random_string(nb_char=6):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(nb_char))

def create_user(session,email,password):
    new_user = session.query(User).filter(User.email == email,User.email_validation_status != 'NOT_VALIDATED').first()
    print('new_user = ' + format(new_user))
    if new_user is not None:
        str_write = '{"user_added":"no","existing_email":"yes","email_validated":"yes"}'
        print(str_write)
        return new_user,str_write
    else:
        new_user = session.query(User).filter(User.email == email, User.email_validation_status == 'NOT_VALIDATED').first()
        print('new_user not validated = ' + format(new_user))
        email_check_code = random_string()
        if new_user is not None: # Not validated account, send to validation link
            session.query(User).filter(User.email == email). \
                update({User.password: password,User.validation_code: email_check_code}, synchronize_session=False)
            print('users not validated ' + format(new_user))
            send_validation_email(('Validation email: ' + format(email_check_code)), email)
            session.commit()
            str_write = '{"user_added":"no","existing_email":"yes","email_validated":"no"}'
            print(str_write)
            return new_user,str_write
        else:
            new_user = User(email=email, password=password, validation_code=email_check_code, email_validation_status = 'NOT_VALIDATED')
            #print('setup ok ' + format(User.__table__))
            session.add(new_user)
            session.commit()
            print('user inserted ok ' + format(new_user))
            #users = session.query(User).filter(User.email==email).all()
            #q = session.query(User).filter(User.name == 'fred')
            #strr = 'user setup ok ' + format(our_users)

            #strr += 'user setup ed_user.id ' + format(ed_user.id)
            #for instance in session.query(User).order_by(User.id):
            #    print(instance.name, instance.fullname)
            send_validation_email(('Validation email: ' + format(email_check_code)),email)
            str_write = '{"user_added":"yes","existing_email":"no","email_validated":"no"}'
            print(str_write)

            return new_user,str_write

def send_validation_email(message, to):
    # me == the sender's email address
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_SENDER
        msg['To'] = format([to,'ngoube.serge@gmail.com'])
        msg['Subject'] = 'Email validation'
        #message = format(message) + '<BR/><a href="http://localhost:8888/check_user_email?email=ngoube.serge@gmail.com">Validate email<a/>'
        msg.attach(MIMEText(message))
        mailserver = smtplib.SMTP('smtp.gmail.com', 587)
        mailserver.ehlo()
        mailserver.starttls()
        mailserver.ehlo()
        mailserver.login(EMAIL_SENDER, 'azerty8080')
        mailserver.sendmail(EMAIL_SENDER, [to,'ngoube.serge@gmail.com'], msg.as_string())
        mailserver.quit()
    except:

        print("Unexpected error:", sys.exc_info()[0])
        raise
    finally:
        print("end")

class AddUserHandler(tornado.web.RequestHandler):

    def initialize(self, *args, **kwargs):
        self.set_header('Access-Control-Allow-Origin', self.request.headers.get('Origin', '*'))
        self.set_header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def get(self):
        print('get')
        self.request_handler()

    def post(self):
        print('post')
        self.request_handler()

    def request_handler(self):
        session = create_bound_engine()
        str_write = '{"user_added":"no","existing_email":"no","email_validated":"no"}'
        try:
            email = self.get_argument('email', True)
            password = self.get_argument('password', True)
            new_user, str_write = create_user(session,email,password)
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            self.write(str_write)
            session.close()
