
import { useEffect, useState } from 'react'
import './App.css'


interface GeneratedText {
  generated_text: string; 
}

function App() {

  const [phrase, setPhrase] = useState<GeneratedText[]>([])

    useEffect(() => {

      async function loadtxt() {
        try {
          const data = {
            inputs: "Crie uma frase entre curta para a rede social comemorando Dia das Crianças",
            parameters: { max_new_tokens: 50 },
          };

          const response = await fetch("http://localhost:3000/query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

         

          const result = await response.json();
          console.log(result); // Exibe o resultado da API no console


          setPhrase(result)
        } catch (error) {
          console.error("Erro", error); // Loga erros de requisição
        }
      
        console.table(phrase[0].generated_text
        )
      }

      loadtxt();

      
    }, []);

  //limpa resultado
  const cleanText = (text: string) => {
     
    const parts = text.split('#');
    return parts[1] ? parts[1].trim() : text;

   
    
  };
  
  return (
  
    <>
      <div>
      {phrase.map((item, index) => (
        <p key={index}>{cleanText(item.generated_text)}</p> 
      ))}
      </div>
     
    </>
  )
}

export default App
