🧭 Career Navigator
Career Navigator is an AI-powered academic analytics platform designed to help engineering students bridge the gap between university grades and professional career paths. By analyzing semester-wise performance through a Random Forest Classifier, the system predicts the most suitable career role and generates a customized, phase-wise roadmap for placement preparation.

🚀 Key Features
Dynamic Grade Entry: Interactive UI that adapts to different engineering branches (CSE, AI-ML, etc.) and academic years.

AI-Driven Prediction: Uses Machine Learning to map 50+ subjects into 9 core "Technical Pillars."

Skill Proficiency Dashboard: Visualizes strengths in areas like Coding, Systems, Math, and Hardware.

Actionable Roadmaps: Generates a structured 4-phase plan for the predicted role.

PDF Export: Students can download their personalized career guide for offline use.


🛠️ Tech Stack

Frontend:

React.js (Functional Components & Hooks)

Axios (API Communication)

jsPDF (Document Generation)

CSS3 (Modern Dark-themed UI)

Backend:

Python (Flask)

Scikit-Learn (Random Forest Model)

Pandas & NumPy (Data Processing)

Flask-CORS (Cross-Origin Resource Sharing)


📁 Project Structure

Career_Navigator/
├── frontend/                # React.js application
│   ├── src/
│   │   ├── components/      # UI Components (GradeForm, etc.)
│   │   └── App.jsx          # Main application logic
├── backend/                 # Flask API
│   ├── predict_logic.py     # ML Prediction & Pillar Logic
│   └── career_model.pkl     # Trained Random Forest Model
└── README.md