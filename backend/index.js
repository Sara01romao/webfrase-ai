require('dotenv').config()

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
		{
			headers: {
				Authorization: `Bearer  ${process.env.TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query(
	{"inputs": "Crie uma frase curta para a rede social comemorando a black friday",
	 "parameters": { "max_new_tokens": 50, },
	 
	 })
	 .then((response) => {
		console.log(JSON.stringify(response, null, 2));
	 }).catch((err)=>{
		console.log(err)
	 }
);