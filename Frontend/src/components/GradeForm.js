import React, { useState, useEffect } from 'react';

const GradeForm = ({ branch, currentYear, yearMap, syllabusMap, onSubmit }) => {
  const [grades, setGrades] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const semestersToLoad = yearMap[currentYear] || [];
    let allSubjects = [];

    semestersToLoad.forEach(sem => {
      if (syllabusMap[branch] && syllabusMap[branch][sem]) {
        allSubjects = [...allSubjects, ...syllabusMap[branch][sem]];
      }
    });
    setSubjects(allSubjects);
  }, [branch, currentYear, yearMap, syllabusMap]);

  const handleChange = (subject, value) => {
    setGrades(prev => ({ ...prev, [subject]: value }));
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#4facfe' }}>TRANSCRIPT ENTRY</h3>
      <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
        {subjects.map((sub, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0c', padding: '15px', marginBottom: '8px', borderRadius: '8px' }}>
            <span style={{ fontSize: '13px', maxWidth: '70%' }}>{sub}</span>
           <select 
  onChange={(e) => handleChange(sub, e.target.value)}
  style={{ 
    background: '#050505', 
    color: '#00ff88', 
    border: '1px solid #444', 
    padding: '5px', 
    borderRadius: '4px',
    fontWeight: 'bold' 
  }}
>
  <option value="">Grade</option>
  <option value="10">O (10)</option>
  <option value="9">A+ (9)</option>
  <option value="8">A (8)</option>
  <option value="7">B+ (7)</option>
  <option value="6">B (6)</option>
  <option value="5">C (5)</option>   
  <option value="4">P (4)</option>   
  <option value="0">F (0)</option>   
</select>
          </div>
        ))}
      </div>
      <button 
        onClick={() => onSubmit(grades)} 
        style={{ width: '100%', padding: '18px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '900', marginTop: '20px', cursor: 'pointer' }}>
        
        GENERATE ROADMAP →
        
      </button>
    </div>
  );
};

export default GradeForm;