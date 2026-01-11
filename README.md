# blog
--backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

--production
gunicorn app.main:app \
  -k uvicorn.workers.UvicornWorker \
  --workers 4 \
  --bind 0.0.0.0:8000

--frontend

npm run dev