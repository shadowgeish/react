from sqlalchemy import Column, Integer, String, ForeignKey,Table
from Model.model import *
from utils import *
from sqlalchemy.orm import relationship
import datetime

def init_data():
    session = create_bound_engine()
    #print('setup ok ' + format(User.__table__))
    session.add(GroupType(code="PRIVATE"))
    session.add(GroupType(code="PUBLIC"))

    session.add(MemberType(code="ADMIN"))
    session.add(MemberType(code="REGULAR"))

    session.add(Currency(code="XAF"))
    session.add(Currency(code="GBP"))
    session.add(Currency(code="EUR"))

    session.add(EventCategory(code="GROUP_RELATED_EVENT"))
    session.add(EventCategory(code="PAYMENT"))
    session.add(EventCategory(code="MESSAGE"))
    session.add(EventCategory(code="USER_EVENT"))

    session.add(EventType(description="New group has been created", code="GROUP_CREATED",
                          category = session.query(EventCategory).filter_by(code="GROUP_RELATED_EVENT").first() ))
    session.add(EventType(description="Group has been closed", code="GROUP_CLOSED",
                          category = session.query(EventCategory).filter_by(code="GROUP_RELATED_EVENT").first()))
    session.add(EventType(description="Group has been deleted", code="GROUP_DELETED",
                          category = session.query(EventCategory).filter_by(code="GROUP_RELATED_EVENT").first()))
    session.add(EventType(description="Group has been cancelled", code="GROUP_CANCELLED",
                          category = session.query(EventCategory).filter_by(code="GROUP_RELATED_EVENT").first()))
    session.add(EventType(description="Group has been cancelled", code="NEW_JOINER",
                          category = session.query(EventCategory).filter_by(code="GROUP_RELATED_EVENT").first()))



    session.add(RequestCategory(code="PAYMENT"))
    session.add(RequestCategory(code="MEMBERSHIP"))

    session.add(RequestType(code="REQUEST_FOR_REGULAR_PAYMENT",
                            category=session.query(RequestCategory).filter_by(code="PAYMENT").first()))
    session.add(RequestType(code="REQUEST_FOR_OTHER_PAYMENT",
                            category=session.query(RequestCategory).filter_by(code="PAYMENT").first()))
    session.add(RequestType(code="REQUEST_TO_JOIN_GROUP",
                            category=session.query(RequestCategory).filter_by(code="MEMBERSHIP").first()))

    session.add(RequestStatus(code="PENDING"))
    session.add(RequestStatus(code="APPROVED"))
    session.add(RequestStatus(code="CANCELLED"))
    session.add(RequestStatus(code="REJECTED"))


    session.add(PaymentType(code="GROUP_REGULAR_PAYMENT_DUE"))
    session.add(PaymentType(code="NON_REGULAR_GROUP_PAYMENT"))
    session.add(PaymentType(code="GROUP_REGULAR_INTEREST_PAYMENT_DUE"))


    session.add(PaymentStatus(code="PENDING"))
    session.add(PaymentStatus(code="DONE"))
    session.add(PaymentStatus(code="CANCELLED"))
    session.add(PaymentStatus(code="REJECTED"))

    session.add(PositionSelectionType(code="RANDOM"))
    session.add(PositionSelectionType(code="FIRST_ARRIVED_FIRST_SERVED"))


    new_user = User(first_name='Serge',email='test@gmail.com', password='test', validation_code='test', email_validation_status = 'VALIDATED')
    new_user2 = User(first_name='Serge',email='test2@gmail.com', password='test', validation_code='test', email_validation_status = 'VALIDATED')
    #print('setup ok ' + format(User.__table__))
    session.add(new_user)
    session.add(new_user2)



    session.commit()

if __name__ == "__main__":
    init_data()
