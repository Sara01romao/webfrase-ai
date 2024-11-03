
import { useEffect, useState } from 'react'
import './App.css'


interface GeneratedText {
  generated_text: string; 
}

function App() {

  const [phrase, setPhrase] = useState<GeneratedText[]>([])
  const [nameDate, setNameDate] =useState('Natal');

    useEffect(() => {
      // loadtxt();
    }, []);


    async function loadtxt() {
      try {
        const data = {
          inputs: `Crie uma frase entre curta para a rede social comemorando ${nameDate}`,
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
        console.log(result); 


        setPhrase(result)
      } catch (error) {
        console.error("Erro", error); 
      }
    
      console.table(phrase[0].generated_text
      )
    }

  //limpa resultado
  const cleanText = (text: string) => {
     
    const parts = text.split('#');
    return parts[1] ? parts[1].trim() : text;
  };

  function handleCreate(){
    loadtxt()
  }

  function handleClean(){
    setPhrase([])
  }

  function handleFilter(dataNome: string){
    //  alert(dataNome)

     setNameDate(dataNome);
     loadtxt()
    
  }
  
  
  return (
  
    <>
      <div>
        {phrase.map((item, index) => (
          <p key={index}>{cleanText(item.generated_text)}</p> 
        ))}

        <button onClick={handleCreate}>Gerar Frase</button>
        <button onClick={handleClean}>Limpar</button>

        <ul className=''>
          <li onClick={()=>handleFilter('Dia das Crianças')}>Dia das Crianças</li>
          <li onClick={()=>handleFilter('Halloween')}>Halloween</li>
          <li onClick={()=>handleFilter('Natal')} >Natal</li>
        </ul>
      </div>
     
    </>
  )
}

export default App
