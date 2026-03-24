import React, { useState } from 'react';
import axios from 'axios';
import GradeForm from './components/GradeForm';

const YEAR_SEMESTER_MAP = {
  "1-1": [], 
  "1-2": ["Sem 1"],
  "2-1": ["Sem 1", "Sem 2"],
  "2-2": ["Sem 1", "Sem 2", "Sem 3"],
  "3-1": ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
  "3-2": ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
  "4-1": ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"],
  "4-2": ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"]
};


const BRANCH_SYLLABUS = {
    "CSE": {
        "Sem 1": ["Matrices and Calculus", "Engineering Chemistry", "Programming for Problem Solving", "Basic Electrical Engineering", "Computer Aided Engineering Graphics", "Elements of Computer Science & Engineering", "Engineering Chemistry Laboratory", "Programming for Problem Solving Laboratory", "Basic Electrical Engineering Laboratory"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Applied Physics", "Engineering Workshop", "English for Skill Enhancement", "Electronic Devices and Circuits", "Applied Physics Laboratory", "Python Programming Laboratory", "English Language and Communication Skills Laboratory", "IT Workshop"],
        "Sem 3": ["Digital Logic Design", "Data Structures", "Computer Oriented Statistical Methods", "Business Economics & Financial Analysis", "Object Oriented Programming through Java", "Data Structures Lab", "Object Oriented Programming through Java Lab", "Gender Sensitization Lab", "Skill Development Course (Data visualization- R Programming/ Power BI)"],
        "Sem 4": ["Discrete Mathematics", "Computer Organization and Architecture", "Operating Systems", "Database Management Systems", "Software Engineering", "Operating Systems Lab", "Database Management Systems Lab", "Real-time Research Project / Societal Related Project", "Constitution of India", "Skill Development Course (Node JS / React JS / Django)"],
        "Sem 5": ["Design and Analysis of Algorithms", "Computer Networks", "DevOps", "Professional Elective-I", "Professional Elective-II", "Computer Networks Lab", "DevOps Lab", "Advanced English Communication Skills Lab", "Intellectual Property Rights", "Skill Development Course"],
        "Sem 6": ["Machine Learning", "Formal Languages and Automata Theory", "Artificial Intelligence", "Professional Elective – III", "Open Elective-I", "Machine Learning Lab", "Artificial Intelligence Lab", "Professional Elective-III Lab", "Industrial Oriented Mini Project/ Internship/ Skill Development Course", "Environmental Science"],
        "Sem 7": ["Cryptography and Network Security", "Compiler Design", "Professional Elective -IV", "Professional Elective -V", "Open Elective - II", "Cryptography and Network Security Lab", "Compiler Design Lab", "Project Stage - I"]
    },
    "CSE AI-ML": {
        "Sem 1": ["Matrices and Calculus", "Applied Physics", "Programming for Problem Solving", "Engineering Workshop", "English for Skill Enhancement", "Elements of Computer Science & Engineering", "Applied Physics Laboratory", "Programming for Problem Solving Laboratory", "English Language and Communication Skills Laboratory"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Engineering Chemistry", "Computer Aided Engineering Graphics", "Basic Electrical Engineering", "Electronic Devices and Circuits", "Engineering Chemistry Laboratory", "Python Programming Laboratory", "Basic Electrical Engineering Laboratory", "IT Workshop"],
        "Sem 3": ["Discrete Mathematics", "Data Structures", "Operating Systems", "Computer Organization and Architecture", "Software Engineering", "Data Structures Lab", "Operating Systems Lab", "Software Engineering Lab", "Constitution of India", "Skill Development Course (Node JS / React JS / Django)"],
        "Sem 4": ["Mathematical and Statistical Foundations", "Automata Theory and Compiler Design", "Introduction to Artificial Intelligence", "Database Management Systems", "Object Oriented Programming through Java", "Java Programming Lab", "Database Management Systems Lab", "Real-time Research Project/Field-Based Research Project", "Gender Sensitization Lab", "Skill Development Course (Prolog/ Lisp/ Pyswip)"],
        "Sem 5": ["Design and Analysis of Algorithms", "Computer Networks", "Machine Learning", "Business Economics & Financial Analysis", "Professional Elective-I", "Computer Networks Lab", "Machine Learning Lab", "Advanced English Communication Skills lab", "Intellectual Property Rights", "Skill Development Course"],
        "Sem 6": ["Knowledge Representation and Reasoning", "Data Analytics", "Natural Language Processing", "Professional Elective – II", "Open Elective-I", "Natural Language Processing Lab", "Data Analytics Lab", "Industrial Oriented Mini Project/ Internship/ Skill Development Course", "Environmental Science"],
        "Sem 7": ["Deep Learning", "Nature Inspired Computing", "Professional Elective -III", "Professional Elective -IV", "Open Elective - II", "Professional Practice, Law & Ethics", "Professional Elective - III Lab", "Project Stage - I"]
    },
    "CSE IT": {
        "Sem 1": ["Matrices and Calculus", "Engineering Chemistry", "Programming for Problem Solving", "Basic Electrical Engineering", "Computer Aided Engineering Graphics", "Elements of Computer Science & Engineering", "Engineering Chemistry Laboratory", "Programming for Problem Solving Laboratory", "Basic Electrical Engineering Laboratory"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Applied Physics", "Engineering Workshop", "English for Skill Enhancement", "Electronic Devices and Circuits", "Applied Physics Laboratory", "Python Programming Laboratory", "English Language and Communication Skills Laboratory", "IT Workshop"],
        "Sem 3": ["Digital Logic Design", "Data Structures", "Computer Oriented Statistical Methods", "Computer Organization and Microprocessor", "Introduction to IoT", "Digital Logic Design Lab", "Data Structures Lab", "Internet of Things Lab", "Gender Sensitization Lab", "Skill Development Course (Data visualization- R Programming/ Power BI)"],
        "Sem 4": ["Discrete Mathematics", "Business Economics & Financial Analysis", "Operating Systems", "Database Management Systems", "Java Programming", "Operating Systems Lab", "Database Management Systems Lab", "Java Programming Lab", "Real-time Research Project/ Societal Related Project", "Constitution of India", "Skill Development Course (Node JS/ React JS/ Django)"],
        "Sem 5": ["Software Engineering", "Data Communications and Computer Networks", "Machine Learning", "Professional Elective – I", "Professional Elective – II", "Software Engineering & Computer Networks Lab", "Machine Learning Lab", "Advanced Communication Skills Lab", "Intellectual Property Rights", "Skill Development Course (UI design- Flutter)"],
        "Sem 6": ["Automata Theory and Compiler Design", "Algorithm Design and Analysis", "Embedded Systems", "Compiler Design Lab", "Professional Elective – III", "Open Elective-I", "Embedded Systems Lab", "Professional Elective-III Lab", "Industrial Oriented Mini Project/ Internship/ Skill Development Course (Big data-Spark)", "Environmental Science"],
        "Sem 7": ["Information Security", "Cloud Computing", "Professional Elective - IV", "Professional Elective - V", "Open Elective-II", "Information Security Lab", "Cloud Computing Lab", "Project Stage - I"]
    },
    "CSE Data Science": {
        "Sem 1": ["Matrices and Calculus", "Engineering Chemistry", "Programming for Problem Solving", "Basic Electrical Engineering", "Computer Aided Engineering Graphics", "Elements of Computer Science & Engineering", "Engineering Chemistry Laboratory", "Programming for Problem Solving Laboratory", "Basic Electrical Engineering Laboratory"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Applied Physics", "Engineering Workshop", "English for Skill Enhancement", "Electronic Devices and Circuits", "Applied Physics Laboratory", "Python Programming Laboratory", "English Language and Communication Skills Laboratory", "IT Workshop"],
        "Sem 3": ["Digital Logic Design", "Data Structures", "Computer Oriented Statistical Methods", "Computer Organization and Architecture", "Object Oriented Programming through Java", "Data Structures Lab", "Object Oriented Programming through Java Lab", "Gender Sensitization Lab", "Skill Development Course (Data visualization- R Programming/ Power BI)"],
        "Sem 4": ["Discrete Mathematics", "Business Economics & Financial Analysis", "Operating Systems", "Database Management Systems", "Software Engineering", "Operating Systems Lab", "Database Management Systems Lab", "Real-time Research Project/ Societal Related Project", "Constitution of India", "Skill Development Course (Node JS/ React JS/ Django)"],
        "Sem 5": ["Machine Learning", "Introduction to Data Science", "Computer Networks", "Professional Elective - I", "Professional Elective - II", "Machine Learning Lab", "R Programming Lab", "Computer Networks Lab", "Intellectual Property Rights", "Skill Development Course"],
        "Sem 6": ["Automata Theory and Compiler Design", "Algorithm Design and Analysis", "Big Data Analytics", "Professional Elective – III", "Open Elective - I", "Big Data Analytics Lab", "Professional Elective - III Lab", "Advanced English Communication Skills Lab", "Environmental Science", "Industrial Oriented Mini Project/ Summer Internship/ Skill Development Course"],
        "Sem 7": ["Predictive Analytics", "Web and Social Media Analytics", "Professional Elective – IV", "Professional Elective – V", "Open Elective – II", "Predictive Analytics Lab", "Web and Social Media Analytics Lab", "Project Stage – I"]
    },
    "ECE": {
        "Sem 1": ["Matrices and Calculus", "Applied Physics", "Programming for Problem Solving", "Engineering Workshop", "English for Skill Enhancement", "Elements of Electronics and Communication Engineering", "Applied Physics Laboratory", "English Language and Communication Skills Laboratory", "Programming for Problem Solving Laboratory", "Induction Programme"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Engineering Chemistry", "Computer Aided Engineering Graphics", "Basic Electrical Engineering", "Electronic Devices and Circuits", "Applied Python Programming Laboratory", "Engineering Chemistry Laboratory", "Basic Electrical Engineering Laboratory", "Electronic Devices and Circuits Laboratory"],
        "Sem 3": ["Analog Circuits", "Network analysis and Synthesis", "Digital Logic Design", "Signals and Systems", "Probability Theory and Stochastic Processes", "Analog Circuits Laboratory", "Digital logic Design Laboratory", "Basic Simulation Laboratory", "Constitution of India"],
        "Sem 4": ["Numerical Methods and Complex Variables", "Electromagnetic Fields and Transmission Lines", "Analog and Digital Communications", "Linear and Digital IC Applications", "Electronic Circuit Analysis", "Analog and Digital Communications Laboratory", "Linear and Digital IC Applications Laboratory", "Electronic Circuit Analysis Laboratory", "Real Time Project/ Field Based Project", "Gender Sensitization Lab"],
        "Sem 5": ["Microcontrollers and Applications", "IoT Architectures and Protocols", "Control Systems", "Antennas and Wave Propagation", "Professional Elective – I", "Microcontrollers Laboratory", "IoT Architectures and Protocols Laboratory", "Advanced Communication Laboratory", "Environmental Science"],
        "Sem 6": ["Digital Signal Processing", "CMOS VLSI Design", "Business Economics & Financial Analysis", "Professional Elective – II", "Open Elective – I", "Digital Signal Processing Laboratory", "CMOS VLSI Design Laboratory", "Advanced English Communication Skills Laboratory", "Intellectual Property Rights", "Industry Oriented Mini Project/ Internship"],
        "Sem 7": ["Microwave and Optical Communications", "Professional Elective – III", "Professional Elective – IV", "Open Elective – II", "Professional Practice, Law & Ethics", "Microwave and Optical Communications Laboratory", "Project Stage – I"]
    },
    "Mechanical": {
        "Sem 1": ["Mathematics - I", "Engineering Physics", "Programming for Problem Solving", "Engineering Graphics", "Engineering Physics Lab", "Programming for Problem Solving Lab", "Environmental Science", "Induction Programme"],
        "Sem 2": ["Mathematics - II", "Chemistry", "Engineering Mechanics", "Engineering Workshop", "English", "Engineering Chemistry Lab", "English Language and Communication Skills Lab"],
        "Sem 3": ["Probability and Statistics & Complex Variables", "Mechanics of Solids", "Material Science and Metallurgy", "Production Technology", "Thermodynamics", "Production Technology Lab", "Machine Drawing Practice", "Material Science and Mechanics of Solids Lab", "Constitution of India"],
        "Sem 4": ["Basic Electrical and Electronics Engineering", "Kinematics of Machinery", "Thermal Engineering – I", "Fluid Mechanics and Hydraulic Machines", "Instrumentation and Control Systems", "Basic Electrical and Electronics Engineering Lab", "Fluid Mechanics and Hydraulic Machines Lab", "Instrumentation and Control Systems Lab", "Gender Sensitization Lab"],
        "Sem 5": ["Dynamics of Machinery", "Design of Machine Members-I", "Metrology & Machine Tools", "Business Economics & Financial Analysis", "Thermal Engineering-II", "Operations Research", "Thermal Engineering Lab", "Metrology & Machine Tools Lab", "Kinematics & Dynamics Lab", "Intellectual Property Rights"],
        "Sem 6": ["Design of Machine Members-II", "Heat Transfer", "CAD & CAM", "Professional Elective - I", "Open Elective - I", "Finite Element Methods", "Heat Transfer Lab", "CAD & CAM Lab", "Advanced Communication Skills lab", "Environmental Science"],
        "Sem 7": ["Refrigeration & Air Conditioning", "Professional Elective – II", "Professional Elective – III", "Professional Elective - IV", "Open Elective - II", "Industrial Oriented Mini Project/ Summer Internship", "Seminar", "Project Stage - I"]
    },
    "Civil": {
        "Sem 1": ["Matrices and Calculus", "Applied Physics", "Programming for Problem Solving", "Engineering Workshop", "English for Skill Enhancement", "Elements of Civil Engineering", "Applied Physics Laboratory", "English Language and Communication Skills Laboratory", "Programming for Problem Solving Laboratory", "Induction Programme"],
        "Sem 2": ["Ordinary Differential Equations and Vector Calculus", "Engineering Chemistry", "Computer Aided Engineering Graphics", "Applied Mechanics", "Surveying", "Python Programming Laboratory", "Engineering Chemistry Laboratory", "Surveying Laboratory – I"],
        "Sem 3": ["Probability and Statistics", "Building Materials, Construction and Planning", "Engineering Geology", "Strength of Materials – I", "Fluid Mechanics", "Surveying Laboratory – II", "Strength of Materials Laboratory", "Computer Aided Drafting Laboratory", "Constitution of India"],
        "Sem 4": ["Basic Electrical and Electronics Engineering", "Concrete Technology", "Strength of Materials – II", "Hydraulics and Hydraulics Machinery", "Structural Analysis – I", "Fluid Mechanics and Hydraulics Machinery Laboratory", "Basic Electrical and Electronics Engineering Laboratory", "Concrete Technology Laboratory", "Real-time Research Project/ Field-Based Project", "Gender Sensitization Laboratory"],
        "Sem 5": ["Structural Analysis – II", "Geotechnical Engineering", "Structural Engineering – I (RCC)", "Business Economics & Financial Analysis", "Transportation Engineering", "Hydrology and Water Resources Engineering", "Transportation Engineering Laboratory", "Geotechnical Engineering Laboratory", "Intellectual Property Rights"],
        "Sem 6": ["Environmental Engineering", "Foundation Engineering", "Structural Engineering – II (Steel Structures)", "Professional Elective – I", "Open Elective – I", "Environmental Engineering Laboratory", "Computer Aided Design Laboratory", "Advanced English Communication Skills Laboratory", "Industry Oriented Mini Project/ Internship", "Environmental Science"],
        "Sem 7": ["Quantity Survey & Valuation", "Project Management", "Professional Elective – II", "Professional Elective – III", "Professional Elective – IV", "Open Elective – II", "Civil Engineering Software Laboratory", "Project Stage – I"]
    }
}

function App() {
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState("CSE");
  const [currentYear, setCurrentYear] = useState("1-2"); 
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (grades) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/predict', { 
        branch: branch, 
        currentYear: currentYear, 
        grades: grades 
      });
      
      setResults(response.data);
      setStep(3);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Backend is not running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Career Navigator</h1>
      <hr />

      {loading && <h2 style={{ color: 'blue' }}>Processing your roadmap... Please wait.</h2>}

      {!loading && step === 1 && (
        <div>
          <h3>Academic Details</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Present Studying Year-Sem:</label>
            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(e.target.value)}
              style={{ padding: '10px', width: '250px', fontSize: '16px' }}
            >
              {Object.keys(YEAR_SEMESTER_MAP).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Select Your Branch:</label>
            <select 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)}
              style={{ padding: '10px', width: '250px', fontSize: '16px' }}
            >
              <option value="CSE">CSE</option>
              <option value="CSE IT">CSE IT</option>
              <option value="CSE AI-ML">CSE AI-ML</option>
              <option value="CSE Data Science">CSE Data Science</option>
              <option value="ECE">ECE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <button onClick={() => setStep(2)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Next</button>
        </div>
      )}

      {!loading && step === 2 && (
  <GradeForm 
    branch={branch} 
    currentYear={currentYear} 
    yearMap={YEAR_SEMESTER_MAP} 
    syllabusMap={BRANCH_SYLLABUS} 
    onSubmit={handleSubmit} 
  />
)}
      {!loading && step === 3 && results && (
  <div style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'left', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
    
    {/* 1. Header Section */}
    <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px' }}>
      <h3 style={{ color: '#666', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Analysis Complete</h3>
      <h1 style={{ color: '#007bff', margin: '10px 0' }}>🚀 {results.prediction}</h1>
      <h2 style={{fontSize: '13px', color: '#718096', backgroundColor: '#edf2f7', padding: '10px 15px', borderRadius: '6px', marginBottom: '20px',borderLeft: '4px solid #a0aec0',lineHeight: '1.4'}}>* This roadmap is intended for guidance purposes only and represents a suggested path based on academic trends.</h2>
    </div>

    {/* 2. Skill Pillars Section */}
    <div style={{ marginBottom: '40px' }}>
      <h4 style={{ color: '#333', marginBottom: '15px' }}>Your Skill Proficiency:</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
        {results.pillar_stats && Object.entries(results.pillar_stats).map(([skill, score]) => (
          <div key={skill} style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6c757d', textTransform: 'capitalize' }}>{skill}</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{Math.round(score)}%</div>
          </div>
        ))}
      </div>
    </div>

    {/* 3. THE ROADMAP SECTION (The part you were missing) */}
    <div style={{ marginTop: '30px', textAlign: 'left' }}>
      <h2 style={{ color: '#2d3748', borderBottom: '2px solid #74ebd5', paddingBottom: '10px', fontSize: '22px' }}>
        ZERO-TO-END DETAILED ROADMAP
      </h2>

      {results.roadmap && results.roadmap.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {results.roadmap.map((phase, index) => {
            const lines = phase.split('\n');
            const title = lines[0]; // The "Phase X" line
            const details = lines.slice(1); // The bullet points and milestones

            return (
              <div key={index} style={{ 
                padding: '20px', 
                backgroundColor: '#fff', 
                borderLeft: '6px solid #4facfe', 
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                {/* Phase Title */}
                <div style={{ fontWeight: '800', fontSize: '18px', color: '#1e3a8a', marginBottom: '10px' }}>
                  {title}
                </div>
                
                {/* Phase Details & Milestone */}
                <div style={{ paddingLeft: '15px' }}>
                  {details.map((line, i) => (
                    <p key={i} style={{ 
                      margin: '5px 0', 
                      color: line.includes('Milestone:') ? '#059669' : '#4a5568',
                      fontWeight: line.includes('Milestone:') ? '700' : '400',
                      fontSize: '15px',
                      lineHeight: '1.5'
                    }}>
                      {line.trim()}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ color: '#dc3545' }}>No roadmap steps were generated. Please check your Python logic.</p>
      )}
    </div>

    {/* 4. Action Button */}
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <button 
        onClick={() => {setStep(1); setResults(null);}} 
        style={{ padding: '12px 35px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Restart Assessment
      </button>
    </div>
  </div>
)}
    </div>
  );
}
export default App;