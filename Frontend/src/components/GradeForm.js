import React, { useState } from 'react';

const GradeForm = ({ branch, currentYear, yearMap, syllabusMap, onSubmit }) => {
  const [grades, setGrades] = useState({});

  const VALID_GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

  const previousSemesters = yearMap[currentYear] || [];
  const branchSyllabus = syllabusMap[branch] || {};

  const handleGradeChange = (subject, value) => {
    const upperValue = value.toUpperCase().trim();
    setGrades({ ...grades, [subject]: upperValue });
  };

  const handleValidateAndSubmit = () => {
    const allVisibleSubjects = previousSemesters.flatMap(sem => branchSyllabus[sem] || []);
    
    const isAnyEmpty = allVisibleSubjects.some(sub => !grades[sub] || grades[sub] === "");

    if (isAnyEmpty) {
      alert("Please enter grades for all subjects before proceeding.");
      return;
    }

    const enteredGrades = Object.values(grades);
    const hasInvalidGrade = enteredGrades.some(g => !VALID_GRADES.includes(g));

    if (hasInvalidGrade) {
      alert(`Invalid grade detected! Please only use: ${VALID_GRADES.join(", ")}`);
      return;
    }

    onSubmit(grades);
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
      <h2 style={{ color: '#333' }}>Academic Transcript Input</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Please enter your grades for all completed semesters in <strong>{branch}</strong>.
      </p>
      
      {previousSemesters.length === 0 ? (
        <div style={{ padding: '20px', background: '#e9ecef', borderRadius: '5px' }}>
          <p>Semester 1-1 is the starting point. Predictive analysis requires at least one completed semester.</p>
        </div>
      ) : (
        previousSemesters.map((sem) => (
          <div key={sem} style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#007bff', borderBottom: '2px solid #007bff', display: 'inline-block', paddingBottom: '5px' }}>
              {sem}
            </h3>
            {branchSyllabus[sem] ? (
              branchSyllabus[sem].map((subject) => (
                <div key={subject} style={{ 
                  marginBottom: '12px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  maxWidth: '600px',
                  padding: '8px',
                  borderBottom: '1px ghostwhite solid'
                }}>
                  <label style={{ fontSize: '14px', flex: '1', marginRight: '15px' }}>{subject}</label>
                  <input
                    type="text"
                    placeholder="Grade"
                    maxLength="2"
                    value={grades[subject] || ''}
                    style={{ 
                      width: '70px', 
                      padding: '8px', 
                      textAlign: 'center', 
                      borderRadius: '4px', 
                      border: '1px solid #ccc',
                      fontWeight: 'bold'
                    }}
                    onChange={(e) => handleGradeChange(subject, e.target.value)}
                  />
                </div>
              ))
            ) : (
              <p style={{ color: '#dc3545' }}>Syllabus data missing for {sem}.</p>
            )}
          </div>
        ))
      )}

      <div style={{ sticky: 'bottom', background: 'white', padding: '20px 0' }}>
        <button 
          onClick={handleValidateAndSubmit}
          disabled={previousSemesters.length === 0}
          style={{ 
            padding: '15px 40px', 
            backgroundColor: previousSemesters.length === 0 ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '30px',
            cursor: previousSemesters.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(40, 167, 69, 0.2)'
          }}
        >
          Generate Career Roadmap
        </button>
      </div>
    </div>
  );
};

export default GradeForm;