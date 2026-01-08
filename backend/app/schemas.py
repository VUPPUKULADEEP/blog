from pydantic import BaseModel, EmailStr
from typing import Any


class UserCreate(BaseModel):
    email : EmailStr
    password : str
    fullname : str
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    user_id : int
    fullname : str
    email : EmailStr

class Login(BaseModel):
    email : EmailStr
    password : str


class blog_create(BaseModel):
    title : str
    description : Any
    author : int

class blogs_put(BaseModel):
    title : str
    description : Any

class blog_response(blog_create):
    blog_id :int

    class Config:
        from_attributes = True
