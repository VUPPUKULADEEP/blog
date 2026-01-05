from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = 'sqlite:///../test.db'

engine = create_engine(db_url, connect_args={'check_same_thread':False})

Base = declarative_base()

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit = False,
    bind = engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

