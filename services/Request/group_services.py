import tornado.web
import datetime
# Import smtplib for the actual sending function
import smtplib
import random
import string
from utils import *
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from Model.model import *
from Request.user_services import *
from sqlalchemy import or_
import random

class GroupRequestHandler(tornado.web.RequestHandler):
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
        print("Starting:GroupRequestHandler")
        session = create_bound_engine()
        str_write = '{"status":"nok","missing_email":""}'
        try:
            token = self.get_argument('token', None)
            import jwt
            tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = tokenData['id']
            sender_user = session.query(User).filter_by(id=user_id).first()
            if token is not None:
                print('toket =' + format(token))
                request_type = self.get_argument('requestType', None)
                if request_type == 'joinGroupRequest':
                    email_list = self.get_argument('emailList', None)
                    group_id = self.get_argument('groupId', None)
                    missing_email = list()
                    list_email_request = email_list.split(',')
                    for email in list_email_request:
                        users = session.query(User).filter(email=email).all()
                        if len(users) == 1:
                            request_type = session.query(RequestType).filter_by(code='REQUEST_FOR_REGULAR_PAYMENT').first()
                            group = session.query(Group).filter_by(id=group_id).first()
                            request_status = session.query(RequestStatus).filter_by(code='PENDING').first()
                            new_request = Request(sender=sender_user, receiver=users[0], group=group,
                                                    request_type=request_type, request_date=datetime.datetime.now()
                                                  ,request_status=request_status, last_update_date=datetime.datetime.now())
                            session.add(new_request)


                            missing_email.append(email)
                    session.commit()
                    str_write = '{"status":"ok","missing_email":"' + ",".join(missing_email) + '"}'

                if request_type == 'joinGroupRequestAnswer':
                    request_answer_id = self.get_argument('RequestAnswerId', None)
                    request_id = self.get_argument('RequestId', None)
                    request_status = session.query(RequestStatus).filter_by(id=request_answer_id).first()
                    request = session.query(Request).filter_by(id = request_id).first()
                    session.query(Request).filter_by(id = request_id). \
                        update({Request.last_update_date: datetime.datetime.now(),Request.request_status: request_status}, synchronize_session=False)

                    if request_status.code == 'APPROVED':
                        event_type = session.query(EventType).filter_by(code='USER_JOIN_GROUP').first()
                        new_event = Event(initiator=sender_user, group=request.group, date_event=datetime.datetime.now(),
                                                    last_update_date=datetime.datetime.now(), event_type=event_type)
                        session.add(new_event)
                    session.commit()
                    str_write = '{"status":"ok"}'

                if request_type == 'userRequestList':
                    requests = session.query(Request).filter_by(receiver_id=user_id).all()
                    list_request = list()
                    for request in requests:
                        list_request.append(request.to_json())
                    session.commit()
                    str_write = '{"status":"ok","data":[' + ','.join(list_request) + ']}'


        except:
            print("GroupRequestHandler:Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()



class LangHandler(tornado.web.RequestHandler):
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
        str_write = '{"user_exist":"no"}'
        data_list_param = self.get_argument('list', None)
        try:
            str_write = """{
              "WELCOME": "Welcome to ",
              "RANDOM":"TEST",
              "header": {
                "SEARCH": "Search.."
              }
            }"""

        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)


class ListHandler(tornado.web.RequestHandler):
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
        print("Starting:ListHandler")
        session = create_bound_engine()
        str_write = '{"user_exist":"no"}'
        data_list_param = self.get_argument('list', None)
        try:
            data_list_requests = data_list_param.split('-')
            list_request_data = list()
            if 'ccy' in data_list_requests:
                list_ccy = list()
                for ccy in session.query(Currency).order_by(Currency.id):
                    list_ccy.append('{"id":"' + format(ccy.id) + '","description":"' + format(ccy.description) + '","code":"' + format(ccy.code) + '"}')
                list_request_data.append('"ccy":[' + ','.join(list_ccy) + ']')
            if 'listGroupType' in data_list_requests:
                list_grouptype = list()
                for grouptype in session.query(GroupType).order_by(GroupType.id):
                    list_grouptype.append('{"id":"' + format(grouptype.id) + '","code":"' + format(grouptype.code) + '"}')
                list_request_data.append('"groupType":[' + ','.join(list_grouptype) + ']')
            if 'listGroupRotation' in data_list_requests:
                list_grouptype_rotation = list()
                for grouptyperotation in session.query(PositionSelectionType).order_by(PositionSelectionType.id):
                    list_grouptype_rotation.append('{"id":"' + format(grouptyperotation.id) + '","code":"' + format(grouptyperotation.code) + '"}')
                list_request_data.append('"groupRotationType":[' + ','.join(list_grouptype_rotation) + ']')

            str_write = '{' + ','.join(list_request_data) + '}'

        except:
            print("ListHandler:Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()


class DashBoardHandler(tornado.web.RequestHandler):
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
        print("Starting:DashBoardHandler")
        session = create_bound_engine()
        str_write = '{"status":"nok"}'
        try:
            token = self.get_argument('token', None)
            request_id = self.get_argument('request_id', None)
            action = self.get_argument('action', None)
            position = self.get_argument('position', None)

            import jwt
            tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = tokenData['id']

            if action is None:
                list_events, count_event = getListEvent(sess=session, user_id=user_id, event_type='userEvents')
                list_payments, count_payment = getListPayment(sess=session, user_id=user_id, event_type='userPaymentToSend')
                list_requests, count_request = getListRequest(sess=session, receiver_id=user_id, event_type='userRequests')
                str_write = '{"permission":"ok","payments_data_count":"' + format(count_payment) + '","requests_data_count":"' + format(count_request) + '","events_data_count":"' + format(count_event) + '","events_data":[' + ','.join(list_events) + '],"payments_data":[' + ','.join(list_payments) + '],"requests_data":[' + ','.join(list_requests) + ']}'
            elif action == 'joinGroup':

                request_status = session.query(RequestStatus).filter(RequestStatus.code == 'APPROVED').one()
                request = session.query(Request).filter(Request.id == request_id).one()
                group = session.query(Group).filter(Group.id == request.group_id).one()
                new_member = session.query(User).filter(User.id == user_id).one()
                member_type = session.query(MemberType).filter_by(code='REGULAR').one()
                request.request_status = request_status
                request.last_update_date = datetime.datetime.now()

                group_member_list = GroupMemberList(last_update_date = datetime.datetime.now(),
                                                    member_type= member_type,user =new_member,
                                                    creation_date= datetime.datetime.now(), group= group, user_position=position)
                group.members.append(group_member_list)
                session.flush()
                #session.add(group_member_list)

                event_type = session.query(EventType).filter_by(code='USER_JOIN_GROUP').first()
                new_event = Event(initiator=new_member, group=request.group, date_event=datetime.datetime.now(),
                                            last_update_date=datetime.datetime.now(), event_type=event_type)
                session.add(new_event)

                session.commit()
                str_write = '{"status":"ok"}'

            elif action == 'acceptRequestWindow':
                request = session.query(Request).filter(Request.id == request_id).one()
                group = session.query(Group).filter(Group.id == request.group_id).one()
                all_initial_position_available = list()
                all_taken_position = list()
                all_available_position = list()
                for i in range(1,group.nb_members):
                    all_initial_position_available.append(str(i))

                for asso in group.members:
                    all_taken_position.append(str(asso.user_position))

                for i in all_initial_position_available:
                    if i not in all_taken_position:
                        all_available_position.append(str(i))

                if group.position_selection_type.code =='RANDOM':
                    all_available_position = random.sample(all_available_position,1)

                all_available_position_json = list()
                for i in all_available_position:
                    all_available_position_json.append('{"code":"' + str(i) + '","value":"' + str(i) + '"}')

                str_write = '{"permission":"ok","available_rotation_positions":[' + ','.join(all_available_position_json) + '],"position_selection_type":"' + group.position_selection_type.code + '",' \
                            '"group":"' + group.name + '"}'

        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)


def getListRequest(sess=None, receiver_id=None, event_type='userRequests', page = 1, max = 6):
    print("Starting:getListRequest")
    if not sess:
        session = create_bound_engine(True)
    else:
        session = sess
    list_requests = None
    try:
        if event_type == 'userRequests':
            print("Starting query")
            #events = session.query(Event).join(GroupMemberList,GroupMemberList.group_id==Event.group_id).filter((Event.initiator_id==user_id) | (GroupMemberList.user_id==user_id))
            status = session.query(RequestStatus).filter(RequestStatus.code == 'PENDING').first()
            requests = session.query(Request).filter(Request.receiver_id==receiver_id,Request.request_status==status)
            list_requests = list()
            count = requests.count()
            if max:
                requests = requests.limit(max)
            if page:
                requests = requests.offset(max * (page-1))

            for request in requests:
                list_requests.append(request.to_json())
    except:
        print("getListRequest:Unexpected error:", sys.exc_info()[0])
        raise
    finally:
        print(format(list_requests))
        if not sess:
            session.close()
        return list_requests, count


def getListPayment(sess=None, user_id=None, event_type='userPaymentToSend', page = 1, max = 6):
    print("Starting:getListPayment")
    if not sess:
        session = create_bound_engine(False)
    else:
        session = sess
    list_payments = None
    count = 0
    try:
        if event_type == 'userPaymentToSend':
            print("Starting query")
            #events = session.query(Event).join(GroupMemberList,GroupMemberList.group_id==Event.group_id).filter((Event.initiator_id==user_id) | (GroupMemberList.user_id==user_id))
            status = session.query(PaymentStatus).filter(PaymentStatus.code == 'PENDING').first()
            payments = session.query(Payment).filter(Payment.sender_id==user_id,Payment.status==status)
            count = payments.count()
            if max:
                payments = payments.limit(max)
            if page:
                payments = payments.offset(max * (page-1))

            list_payments = list()
            for payment in payments:
                list_payments.append(payment.to_json())
    except:
        print("getListPayment:Unexpected error:", sys.exc_info()[0])
        raise
    finally:
        print(format(list_payments))
        if not sess:
            session.close()
        return list_payments, count


def getListEvent(sess=None, user_id=None, event_type='userEvents', group_id=None, page = 1, max = 6):
    print("Starting:getListEvent")
    if not sess:
        session = create_bound_engine(True)
    else:
        session = sess
    list_events = None
    count = 0
    try:
        if event_type == 'userEvents':
            print("Starting query")
            #events = session.query(Event).join(GroupMemberList,GroupMemberList.group_id==Event.group_id).filter((Event.initiator_id==user_id) | (GroupMemberList.user_id==user_id))
            if not group_id:
                events = session.query(Event).filter(Event.initiator_id==user_id)
            else:
                events = session.query(Event).filter(Event.initiator_id==user_id, Event.group_id==group_id)
            count = events.count()
            if max:
                events = events.limit(max)
            if page:
                events = events.offset(max * (page-1))

            list_events = list()
            for event in events:
                list_events.append(event.to_json())
    except:
        print("getListEvent:Unexpected error:", sys.exc_info()[0])
        raise
    finally:
        print(format(list_events))
        if not sess:
            session.close()
        return list_events, count


class AddGroupMemberHandler(tornado.web.RequestHandler):
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
        print("Starting:GroupsHandler")
        session = create_bound_engine(True)
        str_write = '{"permission":"nok","user_exist":"nok","request_added":"nok"}'
        try:
            group_id = self.get_argument('id', None)
            pemail_list = self.get_argument('email_list', None)
            token = self.get_argument('token', None)
            if group_id is not None and token is not None:
                print('toket =' + format(token))
                import jwt
                tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                user_id = tokenData['id']

                #group = session.query(Group).filter(Group.id == group_id, Group.members.any(user_id=user_id)).first()
                member_type = session.query(MemberType).filter(MemberType.code == 'ADMIN').first()
                group = session.query(Group).filter(Group.id == group_id, Group.members.any(user_id=user_id,member_type=member_type)).first()
                if group is not None: # Only admin can add members
                    email_list = pemail_list.split(';')
                    for email in email_list:
                        new_user = session.query(User).filter(User.email == email).first()
                        user_sender = session.query(User).filter(User.id == user_id).first()
                        request_status=session.query(RequestStatus).filter(RequestStatus.code == 'PENDING').first()
                        request_type=session.query(RequestType).filter(RequestType.code == 'REQUEST_TO_JOIN_GROUP').first()
                        request_date=datetime.datetime.now()
                        last_update_date=datetime.datetime.now()
                        if new_user is None: #user doesn't exits => create it, and him a email, then add the request to this user.
                            print('user doesn t exits => create it, and him a email, then add the request to this user.')
                            new_user, str_write = create_user(session,email,random_string())
                            new_request = Request(sender=user_sender,receiver=new_user,group=group,request_type=request_type,
                                           request_status=request_status,request_date=request_date,
                                           last_update_date=last_update_date)
                            session.add(new_request)
                            session.commit()
                            str_write = '{"permission":"ok","user_exist":"nok","request_added":"ok","already_member":"nok"}'
                        else: #User exist, check if he is already member of the group, if not add the request to this user.
                            print('User exist, check if he is already member of the group, if not add the request to this user.')
                            user_group = session.query(Group).filter(Group.id == group_id, Group.members.any(user_id=new_user.id)).first()
                            if user_group is None:
                                new_request = Request(sender=user_sender,receiver=new_user,group=group,request_type=request_type,
                                           request_status=request_status,request_date=request_date,
                                           last_update_date=last_update_date)
                                session.add(new_request)
                                session.commit()
                                str_write = '{"permission":"ok","user_exist":"ok","request_added":"ok","already_member":"nok"}'
                            else:
                                str_write = '{"permission":"ok","user_exist":"ok","request_added":"nok","already_member":"ok"}'


        except:
            print("GroupsHandler:Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()


class GroupsHandler(tornado.web.RequestHandler):
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
        print("Starting:GroupsHandler")
        session = create_bound_engine(True)
        str_write = "{\"permission\":\"nok\",\"data\":[]}"
        try:
            group_id = self.get_argument('id', None)
            token = self.get_argument('token', None)
            if group_id is not None and token is not None:
                print('toket =' + format(token))
                import jwt
                tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                user_id = tokenData['id']
                if group_id == 'all':
                    list_group = list()
                    user_groups = session.query(Group).filter(Group.members.any(user_id=user_id)).order_by(Group.type_id).all()

                    if len(user_groups) > 0:
                        for group in user_groups:
                            list_group.append(group.to_json())
                        str_write = '{"permission":"ok","groups":[' + ','.join(list_group) + ']}'
                    else:
                        str_write = '{"permission":"nok","groups":[]}'
                else:
                    group = session.query(Group).filter(Group.id == group_id, Group.members.any(user_id=user_id)).first()
                    if group:
                        list_member = list()
                        for asso in group.members:
                            list_member.append(asso.user.to_short_json())
                        list_events,count = getListEvent(sess = session, user_id=user_id,event_type='userEvents',group_id=group_id)
                        print(' group_info = {}'.format(group.to_json()))
                        print(' members_data = {}'.format(','.join(list_member) ))
                        print(' list_events = {}'.format(','.join(list_events) ))
                        str_write = '{"permission":"ok","group_info":' + group.to_json() + ',"members_data":['+ ','.join(list_member) +'],"events_data":[' + ','.join(list_events) + ']}'
                    else:
                        str_write = '{"permission":"nok","group_info":[],"members_data":[],"events_data":[]}'

        except:
            print("GroupsHandler:Unexpected error:", sys.exc_info()[0])
            raise
        finally:
            print(str_write)
            self.write(str_write)
            session.close()



class StartGroupHandler(tornado.web.RequestHandler):

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

    def add_months(sourcedate ,months):
        month = sourcedate.month - 1 + months
        year = int(sourcedate.year + month / 12 )
        month = month % 12 + 1
        day = min(sourcedate.day,calendar.monthrange(year,month)[1])
        return datetime.date(year,month,day)

    def request_handler(self):
        print("Starting:StartGroupHandler")
        session = create_bound_engine()
        str_write = '{"started":"nok"}'
        try:

            # !! Need to check that only the admin can start

            group_id = self.get_argument('id', None)
            token = self.get_argument('token', None)
            first_payment_date = self.get_argument('FirstPaymentDate', None)
            print('toket =' + format(token))
            import jwt
            tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = tokenData['id']
            group = session.query(Group).filter(Group.id == group_id, Group.creator_id == user_id).first()
            user = session.query(User).filter(User.id == user_id).first()
            session.query(Group).filter_by(id = group_id). \
                        update({Group.start_date: datetime.datetime.now(),Group.last_update_date: datetime.datetime.now(),
                                Group.date_first_payment:first_payment_date}, synchronize_session=False)

            event_type = session.query(EventType).filter_by(code="GROUP_CREATED").first()

            new_event = Event(initiator=user, group=group, date_event=datetime.datetime.now(),
                                            last_update_date=datetime.datetime.now(), event_type=event_type)
            session.add(new_event)

            type = session.query(PaymentType).filter(PaymentType.code == 'GROUP_REGULAR_PAYMENT_DUE').first()
            type_interest = session.query(PaymentType).filter(PaymentType.code == 'GROUP_REGULAR_INTEREST_PAYMENT_DUE').first()
            status = session.query(PaymentStatus).filter(PaymentStatus.code == 'PENDING').first()
            group_members = group.members
            payment_date = first_payment_date
            amount = group.amount
            dict_member_date_reception = dict()
            frequency = group.frequency
            for asso in group_members:
                dict_member_date_reception[asso.user.id] = dict()
                for asso2 in group_members:
                    if asso.user != asso2.user:
                        if asso2.user.id in dict_member_date_reception.keys() and group.rate > 0:
                            #he is paying back the
                            delta = payment_date - dict_member_date_reception[asso.user.id][asso2.user.id]
                            amount_due = amount * (delta.days/365)
                        else:
                            amount_due = amount
                        dict_received = dict_member_date_reception[asso.user.id]
                        dict_received[asso2.user.id] = payment_date
                        new_payment = Payment(sender=asso2.user, receiver=asso.user, group=group,
                                                type=type, projected_payment_due_date=payment_date,status=status,
                                                last_update_date=datetime.datetime.now(), projected_amount_due =amount_due )
                        session.add(new_payment)
                payment_date = add_months(payment_date,frequency)
            session.commit()
            str_write = '{"started":"ok"}'

        except:
            print("StartGroupHandler:Unexpected error:", format(sys.exc_info()))
            raise
        finally:
            self.write(str_write)
            session.close()



class AddGroupHandler(tornado.web.RequestHandler):

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
        print("Starting:AddGroupHandler")
        session = create_bound_engine()
        str_write = '{"added_added":"no","new_group_id":"-1"}'
        try:

            newGroupName = self.get_argument('newGroupName', None)
            new_group_type_id = self.get_argument('newGroupType', None)
            newGroupDescription = self.get_argument('newGroupDescription', None)
            newGroupAmount = self.get_argument('newGroupAmount', None)
            newGroupFrequency = self.get_argument('newGroupFrequency', None)
            newGroupRate = self.get_argument('newGroupRate', None)
            newGroupDueDay = self.get_argument('newGroupDueDay', None)
            newGroupCurrency_id = self.get_argument('newGroupCurrency', None)
            nb_members = self.get_argument('newGroupNbMembers', None)
            position_selection_type_id = self.get_argument('newGroupRotationType', None)

            delayPenaltyAmount = self.get_argument('delayPenaltyAmount', None)
            allowEarlyPrepayment = self.get_argument('allowEarlyPrepayment', None)
            nbDaysBeforePenalty = self.get_argument('nbDaysBeforePenalty', None)

            token = self.get_argument('token', None)
            print('toket =' + format(token))
            import jwt
            tokenData = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = tokenData['id']

            groups = session.query(Group).filter(Group.name == newGroupName,Group.creator_id == user_id ).all()
            print('groups  = ' + format(groups))

            if len(groups) != 0:
                str_write = '{"group_added":"no","existing_group:"yes","new_group_id":"-1"}'
                print(str_write)
            else:

                type = session.query(GroupType).filter_by(id=new_group_type_id).first()
                our_user = session.query(User).filter_by(id=user_id).first()
                member_type = session.query(MemberType).filter_by(code='ADMIN').first()
                currency = session.query(Currency).filter_by(id=newGroupCurrency_id).first()
                position_selection_type = session.query(PositionSelectionType).filter_by(id=position_selection_type_id).first()
                new_group = Group(name=newGroupName, description=newGroupDescription, date_creation=datetime.datetime.now(),
                                  amount=newGroupAmount, rate=newGroupRate,type=type,creator=our_user,
                                  due_day=newGroupDueDay, frequency=newGroupFrequency,currency=currency,
                                  position_selection_type=position_selection_type,nb_members=nb_members,
                                  allow_prepayment=allowEarlyPrepayment, delay_penalty_amount=delayPenaltyAmount,
                                  nb_days_delay_before_penalty=nbDaysBeforePenalty)

                #session.commit()
                #print('setup ok ' + format(User.__table__))
                group_member_list = GroupMemberList(last_update_date = datetime.datetime.now(),
                                                    member_type= member_type,user =our_user,
                                                    creation_date= datetime.datetime.now())
                new_group.members.append(group_member_list)
                session.add(new_group)


                event_type = session.query(EventType).filter_by(code='GROUP_CREATED').first()
                new_event = Event(initiator=our_user, group=new_group, date_event=datetime.datetime.now(),
                                            last_update_date=datetime.datetime.now(), event_type=event_type)
                session.add(new_event)

                session.commit()
                print('New group inserted ok ' + format(new_group))
                str_write = '{"group_added":"yes","existing_group":"no","new_group_id":"' + format(new_group.id) + '"}'
                print(str_write)
        except:
            print("AddGroupHandler:Unexpected error:", format(sys.exc_info()))
            raise
        finally:
            self.write(str_write)
            session.close()