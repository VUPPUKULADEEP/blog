from fastapi import FastAPI , Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import Base, get_db, engine
from . import models,schemas
from app.models import Base
app = FastAPI(title='blogs')

Base.metadata.create_all(bind = engine)



@app.post('/auth/login')
def login(data : schemas.Login, db : Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.email == data.email and models.Users.password == data.password).first()
    if not user:
        raise HTTPException(detail='invalid credintials')

    return {
        'message' : 'login successfull',
        'id' : user.user_id,
        'fullname' : user.fullname,
        'email': user.email,
    }

@app.post('/create/user', response_model= schemas.UserResponse)
def create_user(data : schemas.UserCreate , db : Session = Depends(get_db)):
    exist_user = db.query(models.Users).filter(models.Users.email == data.email).first()
    if exist_user:
        return HTTPException(detail='email already exists')

    new_user = models.Users(
        email = data.email,
        password = data.password,
        fullname = data.fullname
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user





