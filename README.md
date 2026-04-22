
# 🧭 Career Navigator

Career Navigator is an AI-powered academic analytics platform designed to help engineering students bridge the gap between university grades and professional career paths. By analyzing semester-wise performance through a Random Forest Classifier, the system predicts the most suitable career role and generates a customized, phase-wise roadmap for placement preparation.


# 🚀 Key Features

Dynamic Grade Entry: Interactive UI that adapts to different engineering branches (CSE, AI-ML, etc.) and academic years.

AI-Driven Prediction: Uses Machine Learning to map 50+ subjects into 9 core "Technical Pillars."

Skill Proficiency Dashboard: Visualizes strengths in areas like Coding, Systems, Math, and Hardware.

Actionable Roadmaps: Generates a structured 4-phase plan for the predicted role.

PDF Export: Students can download their personalized career guide for offline use.



# 🛠️ Tech Stack

## Frontend:

React.js (Functional Components & Hooks)

Axios (API Communication)

jsPDF (Document Generation)

CSS3 (Modern Dark-themed UI)

## Backend:

Python (Flask)

Scikit-Learn (Random Forest Model)

Pandas & NumPy (Data Processing)

Flask-CORS (Cross-Origin Resource Sharing)



# 📁 Project Structure


```
Career_Navigator/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── GradeForm.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── ml_engine/
│   ├── predict_logic.py
│   ├── model/
│   │   └── career_model.pkl
│   └── requirements.txt
│
├── .gitignore
└── README.md
```


⚙️ Installation & Setup



1. Backend Setup


# Navigate to backend folder
cd backend


# Install dependencies
pip install flask flask-cors pandas scikit-learn


# Run the Flask server
python predict_logic.py


2. Frontend Setup


# Navigate to frontend folder
cd frontend


# Install dependencies
npm install


# Start the React development server
npm run dev



🧠 How It Works (The Logic)


Data Ingestion: The user selects their branch and inputs grades for completed semesters.

Feature Engineering: The Backend maps every subject to a specific "Pillar" (e.g., Operating Systems → Systems).

Machine Learning: The Random Forest Classifier analyzes the average score of each pillar to identify patterns.

Inference: The model predicts a role (e.g., Data Scientist, Full Stack Developer) based on the highest-weighted skill clusters.



<h1>OUTPUT</h1>

![Specialization and Semester Selection Interface](<Screenshot 2026-03-28 013321.png>)

![Core Subject Grade Entry Interface](<Screenshot 2026-03-28 013506.png>)

![Practical Laboratory Grade Entry Form ](<Screenshot 2026-03-28 013537.png>)

![Additional Laboratory and Workshop Entry](<Screenshot 2026-03-28 013548.png>)

![Final Transcript Submission and API Trigger ](<Screenshot 2026-03-28 013602.png>)

![AI-Predicted Career Role and Skill Proficiency Dashboard](<Screenshot 2026-03-28 013617.png>)

![Actionable Phase-Wise Career Guidance Roadmap (Phases 0-2)](<Screenshot 2026-03-28 013632.png>)

![Advanced Roadmap Milestones and PDF Export Interface](<Screenshot 2026-03-28 013640.png>)
