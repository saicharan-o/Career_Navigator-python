const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend Server is Live and Running!");
});

app.post('/api/predict', (req, res) => {
    const pythonProcess = spawn('python', ['-u', '../ml_engine/predict_logic.py', JSON.stringify(req.body)]);
    
    let resultData = "";
    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error("Python Error:", data.toString());
    });

    pythonProcess.on('close', (code) => {
        
        try {
            const parsedResult = JSON.parse(resultData.trim());
            res.json(parsedResult);
        } 
        catch (e) {
            console.error("JSON Parse Error:", e);
            res.status(500).json({ error: "Failed to parse Python output" });
        }
    });
});

const PORT = 5001; 
app.listen(PORT, () => console.log(`Node Server running on port ${PORT}`));