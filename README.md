# blog
--backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload


--frontend

npm run dev