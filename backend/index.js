require('dotenv').config()

const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json()); 

app.post('/phrasetxt', async (req, res) => {
  try {
    const data = req.body; 
   

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error api:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const result = await response.json();
    console.log("Response:", result); 
    res.json(result);

  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  
});


