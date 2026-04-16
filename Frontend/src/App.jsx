import React, { useState } from 'react';
import axios from 'axios';
import GradeForm from './components/GradeForm';
import { jsPDF } from "jspdf";

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
  const [branch, setBranch] = useState("CSE AI-ML");
  const [currentYear, setCurrentYear] = useState("4-2"); 
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(22);
    doc.setTextColor(79, 172, 254);
    doc.text("CAREER NAVIGATION ROADMAP", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 255, 136);
    doc.text(`Predicted Role: ${results.prediction}`, pageWidth / 2, 35, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const disclaimer = "Disclaimer: This roadmap is for guidance purposes only and based on academic data analysis. It is not a guaranteed career path.";
    const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 40);
    doc.text(splitDisclaimer, 20, 45);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    let cursorY = 65;

    results.roadmap.forEach((phase, index) => {
      if (cursorY > 260) { doc.addPage(); cursorY = 20; }
      doc.setFont("helvetica", "bold");
      doc.text(`Phase ${index + 1}:`, 20, cursorY);
      cursorY += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(phase, pageWidth - 40);
      doc.text(lines, 20, cursorY);
      cursorY += (lines.length * 6) + 10;
    });

    doc.save(`${results.prediction}_Roadmap.pdf`);
  };

const handleGradeSubmit = async (grades) => {
    if (Object.keys(grades).length === 0) {
        setMessage("⚠️ Please enter your grades before generating a roadmap.");
        return;
    }

    const hasEmptyGrade = Object.values(grades).some(g => g === "");
    if (hasEmptyGrade) {
        setMessage("⚠️ Some subjects are missing grades. Please fill them all correctly.");
        return;
    }

    setMessage(""); 
    setLoading(true);

    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            branch: branch,
            year_sem: currentYear,
            grades: grades 
        });

        if (response.data && response.data.roadmap) {
            setResults(response.data); 
            setStep(3); 
        }
    } catch (error) {
        setMessage("❌ AI System Offline. Please ensure the Python server is running.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div style={{ backgroundColor: '#0a0a0c', minHeight: '100vh', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '150px' }}>
            <h2 style={{ color: '#4facfe', letterSpacing: '4px', animation: 'pulse 1.5s infinite' }}>
              ANALYZING ACADEMIC PROFILE...
            </h2>
          </div>
        )}

        {!loading && step < 3 && (
          <div style={{ background: '#111116', padding: '40px', borderRadius: '15px', border: '1px solid #1e1e24' }}>
    {step === 1 ? (
      <div style={{ textAlign: 'center' }}>
        {message && (
          <div style={{
            background: 'rgba(79, 172, 254, 0.1)',
            color: '#4facfe', padding: '15px', borderRadius: '8px',
            marginBottom: '20px', border: '1px solid #4facfe',
            textAlign: 'center', fontWeight: 'bold'
          }}>
            {message}
          </div>
        )}
                <h2 style={{ letterSpacing: '2px', marginBottom: '30px' }}>SELECT SPECIALIZATION</h2>
        <select value={currentYear} onChange={(e) => setCurrentYear(e.target.value)} style={selectStyle}>
          {Object.keys(YEAR_SEMESTER_MAP).map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} style={selectStyle}>
          {Object.keys(BRANCH_SYLLABUS).map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <button 
          onClick={() => {
            if (currentYear === "1-1") {
              setMessage("🚀 You've just started your journey! Please wait until you complete your first semester to use the Career Navigator.");
            } else {
              setMessage(""); 
              setStep(2);
            }
          }} 
          style={buttonStyle}
        >
          INITIALIZE →
        </button>
      </div>
    ) : (
              <div>
                {message && (
                  <div style={{
                    background: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d', padding: '15px', borderRadius: '8px',
                    marginBottom: '20px', border: '1px solid #ff4d4d',
                    textAlign: 'center', fontWeight: 'bold'
                  }}>
                    {message}
                  </div>
                )}
                <GradeForm
                  branch={branch}
                  currentYear={currentYear}
                  yearMap={YEAR_SEMESTER_MAP}
                  syllabusMap={BRANCH_SYLLABUS}
                  onSubmit={handleGradeSubmit}
                />
              </div>
            )}
          </div>
        )}

        {!loading && step === 3 && results && (
          <div style={{ animation: 'fadeIn 1s ease-in' }}>
            <div style={{
              background: 'rgba(79, 172, 254, 0.1)',
              border: '1px solid #4facfe',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              <span style={{ color: '#4facfe', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                ℹ️ CAREER GUIDANCE ADVISORY
              </span>
              <p style={{ color: '#bbb', fontSize: '12px', margin: '5px 0 0 0', lineHeight: '1.4' }}>
                This roadmap is generated based on your academic performance and is intended for <b>guidance purposes only</b>.
                It is not a fixed or guaranteed career path. Please consult with academic advisors or industry professionals
                before making final career decisions.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span style={{ color: '#ff4d4d', letterSpacing: '5px', fontSize: '12px' }}>PREDICTED ROLE</span>
              <h1 style={{ color: '#00ff88', fontSize: '3.5rem', margin: '10px 0', textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                {results.prediction}
              </h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
              <h3 style={{ color: '#4facfe', gridColumn: '1/-1', borderBottom: '1px solid #333', paddingBottom: '10px' }}>SKILL PROFICIENCY</h3>
              {Object.entries(results.pillar_stats).map(([skill, value]) => (
                <div key={skill} style={{ background: '#1a1a20', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}>{skill.replace('_', ' ')}</span>
                    <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{value}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '10px' }}>
                    <div style={{ width: `${value}%`, height: '100%', background: '#00ff88', borderRadius: '10px', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <h3 style={{ color: '#4facfe', borderBottom: '1px solid #333', paddingBottom: '10px' }}>CAREER ROADMAP</h3>
              {results.roadmap.map((phase, i) => (
                <div key={i} style={{ background: '#111116', padding: '25px', borderRadius: '12px', borderLeft: '5px solid #4facfe' }}>
                  {phase.split('\n').map((line, idx) => (
                    <p key={idx} style={{ color: idx === 0 ? '#4facfe' : '#bbb', fontWeight: idx === 0 ? 'bold' : 'normal', margin: '5px 0' }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
              <button
                onClick={downloadPDF}
                style={{ ...buttonStyle, background: '#00ff88', color: '#000', flex: 2 }}
              >
                📥 DOWNLOAD ROADMAP (PDF)
              </button>

              <button
                onClick={() => { setStep(1); setResults(null); setMessage(""); }}
                style={{ ...buttonStyle, background: 'transparent', border: '1px solid #333', flex: 1 }}
              >
                REBOOT SYSTEM
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const selectStyle = { width: '100%', padding: '15px', background: '#050505', color: '#fff', border: '1px solid #333', borderRadius: '8px', marginBottom: '20px' };
const buttonStyle = { width: '100%', padding: '18px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' };

export default App;
