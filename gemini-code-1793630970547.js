const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Siguraduhing may downloads folder
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)){
    fs.mkdirSync(downloadDir);
}

app.post('/api/convert', (req, res) => {
    const videoUrl = req.body.url;
    const format = req.body.format || 'mp3';
    
    if (!videoUrl) {
        return res.status(400).json({ error: 'Kailangan ng YouTube URL.' });
    }

    // Gamit ang yt-dlp para i-extract ang audio
    const command = `yt-dlp -x --audio-format ${format} "${videoUrl}" -o "${downloadDir}/%(title)s.%(ext)s"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Nabigo ang conversion.' });
        }
        res.json({ message: 'Success', output: stdout });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));