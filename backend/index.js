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
      "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
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


// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
// 		{
// 			headers: {
// 				Authorization: `Bearer  ${process.env.TOKEN}`,
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }

	// query(
	// 	{"inputs": "Crie uma frase curta para a rede social comemorando a black friday",
	// 	 "parameters": { "max_new_tokens": 50, },
		 
	// 	 })
	// 	 .then((response) => {
	// 		res.send('Hello, World!', JSON.stringify(response, null, 2));
	// 		console.log(JSON.stringify(response, null, 2));
	// 	 }).catch((err)=>{
	// 		console.log(err)
	// 	 }
	// );