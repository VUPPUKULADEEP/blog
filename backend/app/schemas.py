from pydantic import BaseModel, EmailStr

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

