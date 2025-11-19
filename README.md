# Commands used

mkdir frontend
cd frontend

now, Create package.json Manually
Create this file: C:\Users\User\Desktop\n8n\frontend\package.json

npm install

Create Configuration Files

vite.config.ts
tsconfig.json
tsconfig.node.json
tailwind.config.js
postcss.config.js


now, Create Source Files

mkdir src
mkdir src\components
mkdir public

and make other files not mantioned before and paste the codes. 


NOW BACKEND:

cd C:\Users\User\Desktop\n8n\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt



# Step RUNNNNN: 

Extra commands
exit venv: deactivate
1 back: cd ..

# Run Both Servers
Terminal 1 - Backend:
bash
cd C:\Users\User\Desktop\n8n\backend

cd backend
venv\Scripts\activate
python main.py

#for swagger: uvicorn main:app --reload


Terminal 2 - Frontend:
bash
cd C:\Users\User\Desktop\n8n\frontend
npm run dev





