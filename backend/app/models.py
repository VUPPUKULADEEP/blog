from sqlalchemy import Column, Integer, String, Boolean
from .database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Users(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable = False)
    password = Column(String, nullable = False)
    fullname = Column(String, nullable=False)

    blogs = relationship('Blogs', back_populates='user')


class Blogs(Base):
    __tablename__ = 'blogs'

    blog_id = Column(Integer, primary_key=True, index=True)
    title = Column(String , nullable=False)
    description = Column(String, nullable=False)
    author = Column(Integer, ForeignKey('users.user_id'))

    user = relationship('Users', back_populates='blogs')

