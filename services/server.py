import tornado.ioloop
import tornado.web
from sqlalchemy.ext.declarative import declarative_base
from Request.user_services import *
from Request.group_services import *

Base = declarative_base()

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/add_user", AddUserHandler),
        (r"/check_user_email", CheckUserEmailHandler),
        (r"/log_user", LogUserHandler),
        (r"/get_user_infos",UserInfosHandler),
        (r"/add_group",AddGroupHandler),
        (r"/get_list",ListHandler),
        (r"/get_groups",GroupsHandler),
        (r"/dashboard",DashBoardHandler),
        (r"/site-en.json",LangHandler),


        (r"/", MainHandler)
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    print("Server started")
    tornado.ioloop.IOLoop.current().start()
