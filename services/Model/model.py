from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,Table,Float
from sqlalchemy.orm import relationship
import datetime
from datetime import datetime
from datetime import timedelta
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from utils import *

Base = get_base()


class GroupMemberList(Base):
    __tablename__ = 'group_member'
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    group_id = Column(Integer, ForeignKey('group.id'), primary_key=True)
    member_type_id = Column(Integer, ForeignKey('member_type.id'))
    member_type = relationship("MemberType")
    last_update_date = Column(DateTime, nullable=True)
    creation_date = Column(DateTime, nullable=True)
    group = relationship("Group", back_populates="members")
    user = relationship("User", back_populates="groups")
    user_position = Column(Integer, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<GroupMemberList(member_type={}, group={}, user={}, user_position={})>".format(self.member_type,self.group, self.user, self.user_position)

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    sur_name = Column(String(50), nullable=True, default="-----")
    gender = Column(String(50), nullable=True)
    password = Column(String(250), nullable=True)
    email = Column(String(250), nullable=True)
    email_validation_status = Column(String(25), nullable=True)
    validation_code = Column(String(250), nullable=True)
    photo_path = Column(String(250), nullable=True)
    id_scan_path = Column(String(250), nullable=True)
    id_scan_expire_date = Column(DateTime, nullable=True)
    credit_score = Column(Integer, nullable=True)
    credit_score_date = Column(DateTime, nullable=True)
    date_creation = Column(DateTime, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    country_of_birth = Column(String(250), nullable=True)
    town_of_birth = Column(String(250), nullable=True)
    address_number = Column(Integer, nullable=True)
    address_street_name = Column(String(250), nullable=True)
    address_post_code = Column(String(250), nullable=True)
    address_town = Column(String(250), nullable=True)
    address_country = Column(String(250), nullable=True)
    contact_home_phone = Column(String(250), nullable=True)
    contact_mobile_phone = Column(String(250), nullable=True)
    groups = relationship("GroupMemberList", back_populates="user")
    bank_accounts = relationship("UserBankAccountList")
    profile_settings = Column(String(250), default="language=en#packName=site#pathPrefix=server/i18n")
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def to_short_json(self):
        return '{"id":"' + format(self.id) + '",' \
                '"first_name":"' + format(self.first_name) + '","sur_name":"' + format(self.sur_name) + '",' \
                '"gender":"' + format(self.gender) + '","email":"' + format(self.email) + '","photo_path":"' + format(self.photo_path) + '"' \
                '}'


    def to_json(self):
        return '{"id":"' + format(self.id) + '",' \
                '"first_name":"' + format(self.first_name) + '","sur_name":"' + format(self.sur_name) + '",' \
                '"gender":"' + format(self.gender) + '","email":"' + format(self.email) + '","photo_path":"' + format(self.photo_path) + '",' \
                '"id_scan_path":"' + format(self.id_scan_path) + '","id_scan_expire_date":"' + format(self.id_scan_expire_date) + '",' \
                '"credit_score":"' + format(self.credit_score) + '","credit_score_date":"' + format(self.credit_score_date) + '",' \
                '"date_creation":"' + format(self.date_creation) + '","date_of_birth":"' + format(len(self.date_of_birth)) + '",' \
                '"address_number":"' + format(self.address_number) + '","address_street_name":"' + format(len(self.address_street_name)) + '",' \
                '"address_post_code":"' + format(self.address_post_code) + '","address_town":"' + format(len(self.address_town)) + '",' \
                '"address_country":"' + format(self.address_country) + '","contact_home_phone":"' + format(len(self.contact_home_phone)) + '",' \
                '"contact_home_phone":"' + format(self.contact_home_phone) + '","contact_mobile_phone":"' + format(len(self.contact_mobile_phone)) + '",' \
                '"country_of_birth":"' + format(self.country_of_birth) + '","town_of_birth":"' + format(len(self.town_of_birth)) + '"}'

    def __repr__(self):
        return "<User(name='%s', first_name='%s', email='%s', validation_code='%s', email_validation_status='%s')>" % (self.name, self.first_name, self.email,self.validation_code, self.email_validation_status)

class UserBankAccountList(Base):
    __tablename__ = 'user_bank_account'
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    bank_account_id = Column(Integer, ForeignKey('bank_account.id'), primary_key=True)
    last_update_date = Column(DateTime, nullable=True)
    creation_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

class BankAccount(Base):
    __tablename__ = 'bank_account'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(5), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<BankAccount(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'

class BankTransfer(Base):
    __tablename__ = 'bank_transfer'
    id = Column(Integer, primary_key=True)
    initiator_id = Column(Integer, ForeignKey('user.id'))
    initiator = relationship("User")
    bank_account_id = Column(Integer, ForeignKey('bank_account.id'))
    bank_account = relationship("BankAccount")
    type_id = Column(Integer, ForeignKey('payment_type.id'))
    type = relationship("PaymentType")
    status_id = Column(Integer, ForeignKey('payment_status.id'))
    status = relationship("PaymentStatus")
    date_transfer = Column(DateTime, nullable=True)
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

class GroupType(Base):
    __tablename__ = 'group_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(5), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<GroupType(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #PRIVATE,PUBLIC

class MemberType(Base):
    __tablename__ = 'member_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(5), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<MemberType(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #ADMIN, REGULAR


class Currency(Base):
    __tablename__ = 'currency'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(5), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<Currency(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'

class Message(Base):
    __tablename__ = 'message'
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User")
    group_id = Column(Integer, ForeignKey('group.id'))
    group = relationship("Group")
    creation_date = Column(DateTime, nullable=True)
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<Message(id={}, sender={}, group={}, creation_date={}, last_update_date={}, is_active={})>".format(self.id,
                                                                                           self.sender,self.group,
                                                                                           self.creation_date,
                                                                                           self.last_update_date, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","date_payment":"' + format(self.date_payment) + '",' \
                '"sender":"' + format(self.sender.email) + '","group":"' + format(self.group.name) + '"}'


class RequestCategory(Base):
    __tablename__ = 'request_category'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(150), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<RequestCategory(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['PAYMENT','MEMBERSHIP']

class RequestType(Base):
    __tablename__ = 'request_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(150), nullable=True)
    category_id = Column(Integer, ForeignKey('request_category.id'))
    category = relationship("RequestCategory")
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<RequestType(id={}, code={}, category={}, is_active={})>".format(self.id,self.code,self.category, self.is_active)


    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '","' + format(self.code) + '":"True"}'

    #['REQUEST_FOR_REGULAR_PAYMENT','REQUEST_FOR_OTHER_PAYMENT','REQUEST_TO_JOIN_GROUP']

class RequestStatus(Base):
    __tablename__ = 'request_status'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(150), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<RequestStatus(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['PENDING','APPROVED','CANCELLED','REJECTED','']

class Request(Base):
    __tablename__ = 'request'
    Base.metadata,
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User", foreign_keys=[sender_id])
    receiver_id = Column(Integer, ForeignKey('user.id'))
    receiver = relationship("User", foreign_keys=[receiver_id])
    group_id = Column(Integer, ForeignKey('group.id'))
    group = relationship("Group")
    request_status_id = Column(Integer, ForeignKey('request_status.id'))
    request_status = relationship("RequestStatus")
    request_type_id = Column(Integer, ForeignKey('request_type.id'))
    request_type = relationship("RequestType")
    request_date = Column(DateTime, nullable=True)
    comments = Column(String(500), nullable=True) # if the reques is rejected, the user needs to provide a comment if he wants.
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<Request(id={},sender={}, last_update_date={}, receiver={}, group={}, request_status={}" \
               ", request_type={}, request_date={}, is_active={})>".format(self.id,self.sender
                                                                           ,self.last_update_date,self.receiver
                                                                           ,self.group,self.request_status
                                                                           ,self.request_type,self.request_date, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","sender":"' + format(self.sender.first_name) + '(' + format(self.sender.email) + ')",' \
                '"receiver":"' + format(self.receiver.first_name) + '(' + format(self.receiver.email) + ')","group":"' + format(self.group.name) + '",' \
                '"request_type":"' + format(self.request_type.code) + '","group_id":"' + format(self.group.id) + '",' \
                '"request_status":"' + format(self.request_status.code) + '","' + format(self.request_type.code) + '":"True",' \
                '"group_rotation_type":"' + format(self.group.position_selection_type.code) + '"}'

class PaymentType(Base):
    __tablename__ = 'payment_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(150), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)
    #['GROUP_REGULAR_PAYMENT_DUE','NON_REGULAR_GROUP_PAYMENT']

    def __repr__(self):
        return "<PaymentType(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'

class PaymentStatus(Base):
    __tablename__ = 'payment_status'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(150), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<PaymentStatus(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['PENDING','DONE','CANCELLED','REJECTED','']


class Payment(Base):
    __tablename__ = 'payment'
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User", foreign_keys=[sender_id])
    receiver_id = Column(Integer, ForeignKey('user.id'))
    receiver = relationship("User", foreign_keys=[receiver_id])
    group_id = Column(Integer, ForeignKey('group.id'))
    group = relationship("Group")
    type_id = Column(Integer, ForeignKey('payment_type.id'))
    type = relationship("PaymentType")
    status_id = Column(Integer, ForeignKey('payment_status.id'))
    status = relationship("PaymentStatus")
    currency_id = Column(Integer, ForeignKey('currency.id'))
    currency = relationship("Currency")
    projected_payment_due_date = Column(DateTime, nullable=True)
    projected_amount_due = Column(Float, nullable=True)
    actual_payment_date = Column(DateTime, nullable=True)
    actual_amount_paid = Column(Float, nullable=True)
    last_update_date = Column(DateTime, nullable=True)
    master_payment_id = Column(Integer, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<Payment(id={}, sender={}, sender={}, receiver={}, receiver={}, type={}, status={}" \
               ", currency={}, projected_payment_due_date={}, projected_amount_due={}, actual_payment_date={}, " \
               "actual_amount_paid={}, last_update_date={}" \
               ", is_active={})>".format(self.id,self.sender,
                                                                  self.receiver,self.receiver,
                                                                  self.type,self.status,
                                                                  self.currency,self.projected_payment_due_date
                                                                  ,self.projected_amount_due,self.actual_payment_date
                                                                  ,self.actual_amount_paid,self.last_update_date
                                                                  , self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","from":"' + format(self.sender.email) + '",' \
                '"to":"' + format(self.receiver.email) + '","group":"' + format(self.group.name) + '"' \
                ',"type":"' + format(self.type.code) + '","status":"' + format(self.status.code) + '"' \
                ',"currency":"' + format(self.currency.code) + '","status":"' + format(self.status.code) + '"' \
                ',"projected_payment_due_date":"' + format(self.projected_payment_due_date) + '","projected_amount_due":"' + format(self.projected_amount_due) + '"' \
                ',"actual_payment_date":"' + format(self.actual_payment_date) + '","actual_amount_paid":"' + format(self.actual_amount_paid) + '"}'

class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    event_type_id = Column(Integer, ForeignKey('event_type.id'))
    event_type = relationship("EventType")
    initiator_id = Column(Integer, ForeignKey('user.id'))
    initiator = relationship("User")
    group_id = Column(Integer, ForeignKey('group.id'))
    group = relationship("Group")
    date_event = Column(DateTime, nullable=True)
    @hybrid_property
    def duration_seconds(self):
        return (self.date_event - datetime.datetime.now()).seconds
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)


    def __repr__(self):
        return "<EventType(id={}, event_type={},initiator={},group={},date_event={},last_update_date={}, is_active={})>".format(self.id,self.event_type,self.initiator,self.group,self.date_event,self.last_update_date, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","event_type":"' + format(self.event_type.code) + '",' \
                '"initiator":"' + format(self.initiator.first_name) + '","group":"' + format(self.group.name) + '"' \
                ',"date_event":"' + format(self.date_event) + '","duration_seconds":"' + format(self.duration_seconds) + '"}'

class EventCategory(Base):
    __tablename__ = 'event_category'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(450), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)
    def __repr__(self):
        return "<EventType(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)
    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['GROUP_STATUS','PAYMENT','MESSAGE','USER_EVENT']

class EventType(Base):
    __tablename__ = 'event_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(450), nullable=True)
    category_id = Column(Integer, ForeignKey('event_category.id'), nullable=True)
    category = relationship("EventCategory")
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<EventType(id={}, code={}, category={}, is_active={})>".format(self.id,self.code,self.category, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['NEW_GROUP_CREATED','USER_REJECTED_REQUEST_TO_JOIN_GROUP','USER_JOIN_GROUP','USER_INVITED_TO_JOIN_A_GROUP',
    # 'GROUP_CANCELLED','GROUP_CLOSED','GROUP_STARTED','NEW_MESSAGE_TO_GROUP','NEW_PAYMENT_TO_GROUP' ]
    # show new payment event and new message only once.: Actually count them like 3 new message, 4 new payements.


class PositionSelectionType(Base):
    __tablename__ = 'position_selection_type'
    id = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=True)
    code = Column(String(450), nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    def __repr__(self):
        return "<PositionSelectionType(id={}, code={}, is_active={})>".format(self.id,self.code, self.is_active)

    def to_json(self):
        return '{"id":"' + format(self.id) + '","code":"' + format(self.code) + '"}'
    #['RANDOM','FIRST_ARRIVED_FIRST_SERVED']

class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(1000), nullable=False)
    date_creation = Column(DateTime, nullable=False)
    amount = Column(Float, nullable=False)
    rate = Column(Float, nullable=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    type_id = Column(Integer, ForeignKey('group_type.id'))
    type = relationship("GroupType")
    due_day = Column(Integer, nullable=False)
    frequency = Column(Integer, nullable=False)
    creator_id = Column(Integer, ForeignKey('user.id'))
    creator = relationship("User")
    currency_id = Column(Integer, ForeignKey('currency.id'))
    currency = relationship("Currency")
    date_first_payment = Column(DateTime, nullable=True) # To beo choosen when starting the group
    start_date = Column(DateTime, nullable=True)
    nb_members = Column(Integer, nullable=False)
    position_selection_type_id = Column(Integer, ForeignKey('position_selection_type.id'))
    position_selection_type = relationship("PositionSelectionType")
    members = relationship("GroupMemberList", back_populates="group")
    allow_prepayment = Column(Integer, default=1)
    delay_penalty_amount = Column(Float, default=0)
    nb_days_delay_before_penalty = Column(Float, default=999)
    last_update_date = Column(DateTime, nullable=True)
    is_active = Column(Integer, nullable=False, default=1)

    @hybrid_property
    def list_members(self):
        list_member =[]
        for asso in self.members:
            list_member.append(asso.user)
        return list_member

    def to_json(self):
        return '{"id":"' + format(self.id) + '","name":"' + format(self.name) + '",' \
                '"description":"' + format(self.description) + '","date_creation":"' + format(self.date_creation) + '",' \
                '"amount":"' + format(self.amount) + '","creator":"' + format(self.creator.first_name) + '","rate":"' + format(self.rate) + '",' \
                '"end_date":"' + format(self.end_date) + '","type":"' + format(self.type.code) + '",' \
                '"due_day":"' + format(self.due_day) + '","frequency":"' + format(self.frequency) + '",' \
                '"position_selection_type":"' + format(self.position_selection_type.code) + '","currency":"' + format(self.currency.code) + '","nb_members":"' + format(len(self.members)) + '",' \
                '"type_code":"' + format(self.type.code) + '","nb_members":"' + format(len(self.members)) + '","allow_prepayment":"' + format(self.allow_prepayment) + '"}'

    def __repr__(self):
        return "<Group(name='%s', description='%s', date_creation='%s', amount='%s', rate='%s', type='%s', start_date='%s' , allow_prepayment='%s')>" % (self.name, self.description, self.date_creation, self.amount,self.rate, self.type_id, self.start_date, self.allow_prepayment)