from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    password = Column(String(250))

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (self.name, self.fullname, self.password)

def setup_db():
    engine = create_engine('sqlite:///service_db.db', echo=True)
    Session = sessionmaker(bind=engine)
    Base.metadata.create_all(engine)
    print('setup ok ' +  format(User.__table__))
    ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
    print('user setup ok ' + format(ed_user))
    session = Session()
    session.add(ed_user)
    our_user = session.query(User).filter_by(name='ed').first()
    print('user setup ok ' + format(our_user))
    session.commit()
    print('user setup ed_user.id ' + format(ed_user.id))
    for instance in session.query(User).order_by(User.id):
        print(instance.name, instance.fullname)



if __name__ == '__main__':
    setup_db()
