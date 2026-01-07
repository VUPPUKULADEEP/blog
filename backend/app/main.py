from fastapi import FastAPI , Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import Base, get_db, engine
from . import models,schemas
from app.models import Base
from fastapi.middleware.cors import CORSMiddleware
import json


app = FastAPI(title='blogs')
origins = ["http://localhost:5173", 'http://127.0.0.1:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    
    allow_methods = ["*"],
    allow_headers = ["*"],
)


Base.metadata.create_all(bind = engine)

@app.get('/users', response_model=list[schemas.UserResponse])
def get_users(db : Session = Depends(get_db)):
    users = db.query(models.Users).all()
    return users

@app.get('/users/{user_id}', response_model=schemas.UserResponse)
def get_user_by_id(user_id:int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.user_id == user_id ).first()
    if not user:
        return HTTPException(status_code=404, detail='user not found')
    return user


@app.post('/auth/login')
def login(data : schemas.Login, db : Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.email == data.email and models.Users.password == data.password).first()
    if not user:
        raise HTTPException(detail='invalid credintials')

    return {
        'id' : user.user_id,
        'fullname' : user.fullname,
        'email': user.email,
        'loginStatus' : True
    }

@app.post('/create/user', response_model= schemas.UserResponse)
def create_user(data : schemas.UserCreate , db : Session = Depends(get_db)):
    exist_user = db.query(models.Users).filter(models.Users.email == data.email).first()
    if exist_user:
        return HTTPException(status_code=400,detail='email already exists')

    new_user = models.Users(
        email = data.email,
        password = data.password,
        fullname = data.fullname
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.get('/blogs/', response_model=list[schemas.blog_response])
def get_blog(db : Session = Depends(get_db)):
    blogs = db.query(models.Blogs).all()
    return blogs

@app.get('/blogs/{blog_id}')
def get_blog_by_id(blog_id : int ,db : Session = Depends(get_db)):
    blog = db.query(models.Blogs).filter(models.Blogs.blog_id == blog_id).first()
    if not blog:
        return HTTPException(status_code=404, detail = 'blog not found')
    return {
        "blog_id" : blog.blog_id,
        "title" : blog.title,
        "description" : json.loads(blog.description) if blog.description else []
    }

@app.get('/blogs/users/{user_id}', response_model=list[schemas.blog_response])
def get_blog_by_user(user_id :int,db : Session = Depends(get_db)):
    blogs = db.query(models.Blogs).filter(models.Blogs.author == user_id).all()
    return blogs

@app.post('/blog/create', response_model= schemas.blog_response)
def post_blog(data : schemas.blog_create , db : Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.user_id == data.author).first()
    if not user:
        return HTTPException(status_code = 400, detail='author not exists')
    new_blog = models.Blogs(
        title = data.title,
        description = data.description,
        author = data.author
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog


@app.put('/blogs/modify/{blog_id}', response_model= schemas.blog_response)
def modify_blog(blog_id : int, data : schemas.blogs_put, db : Session = Depends(get_db)):
    blog = db.query(models.Blogs).filter(models.Blogs.blog_id == blog_id).first()
    if not blog:
        raise HTTPException (status_code= 404, detail ='blog not found')
    blog.title = data.title
    blog.description = json.dumps(data.description)
    db.commit()
    db.refresh(blog)
    return blog



@app.delete('/blogs/delete/{blog_id}')
def delete_blog_by_id(blog_id : int , db : Session = Depends(get_db) ):
    blog = db.query(models.Blogs).filter(models.Blogs.blog_id == blog_id).first()
    if not blog:
        return HTTPException(status_code=404, detail = 'blog not found')
    db.delete(blog)
    db.commit()

    return {'message' : 'blog deleted'}


