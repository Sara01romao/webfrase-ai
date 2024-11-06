
import { useEffect, useState } from 'react'
import './App.css'
import { dates} from './data/dateList';
import toast, { Toaster } from 'react-hot-toast';

interface GeneratedText {
  generated_text: string; 
}

function App() {

  const [phrase, setPhrase] = useState<GeneratedText[]>([])
  const [nameDate, setNameDate] =useState<string>('');
  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  
    useEffect(() => {
      if (nameDate) {
        loadtxt();
      }
    }, [nameDate]);


    async function loadtxt() {
      try {
        if(nameDate){
          setLoading(true);
          const data = {
            inputs: `Escreva uma frase breve e impactante para comemorar ${nameDate} nas redes sociais.`,
            parameters: { max_new_tokens: 100 },
          };

          const response = await fetch("http://localhost:3000/phrasetxt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

        
          const result = await response.json();

          if(result){
            setLoading(false);
          }
          console.log(result); 
          setPhrase(result);
        }
      } catch (error) {
        console.error("Erro", error); 
      }
    
      console.table(phrase[0].generated_text
      )
    }

  //limpa resultado
  // const cleanText = (text: string) => {
  //   const match = text.match(/"(.*?)"/);
  //   return match ? match[1] : text;  
  // };

  const cleanText  = (text: string) => {
    const match = text.match(/### Solution.*?:\s*(.*)/);
    return match ? match[1] : text;
  };


  function handleCreate(name:string){
    console.log(name)
    setNameDate(name);
  }

  function handleClean(){
    setPhrase([])
    setNameDate('');
    setActiveButton(null)
  }

  function handleFilter(idBtn:any, dataNome: string){
     setActiveButton(idBtn);
     setNameDate(dataNome);
     if(isFilterVisible){
      setIsFilterVisible(false); 
    }
  }

 

  function handleCopy (){
   
    const textToCopy = phrase.map(item => cleanText(item.generated_text)).join('\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() =>  toast.success('Copiado com sucesso!'))
      .catch(err => toast.error('Erro ao copiar ' + err));
  };



  function  handleFilterClick(){
    setIsFilterVisible(!isFilterVisible); 
  }
 
  

  return (
  
    <div className='container'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <header>
        <svg width="161" height="58" viewBox="0 0 161 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.44602 57L0.451705 39.5455H4.48295L7.37216 51.6733H7.51705L10.7045 39.5455H14.1562L17.3352 51.6989H17.4886L20.3778 39.5455H24.4091L19.4148 57H15.8182L12.4943 45.5881H12.358L9.04261 57H5.44602ZM30.8757 57.2557C29.5291 57.2557 28.37 56.983 27.3984 56.4375C26.4325 55.8864 25.6882 55.108 25.1655 54.1023C24.6428 53.0909 24.3814 51.8949 24.3814 50.5142C24.3814 49.1676 24.6428 47.9858 25.1655 46.9688C25.6882 45.9517 26.424 45.1591 27.3729 44.5909C28.3274 44.0227 29.4467 43.7386 30.7308 43.7386C31.5945 43.7386 32.3984 43.8778 33.1428 44.1562C33.8928 44.429 34.5462 44.8409 35.103 45.392C35.6655 45.9432 36.103 46.6364 36.4155 47.4716C36.728 48.3011 36.8842 49.2727 36.8842 50.3864V51.3835H25.8303V49.1335H33.4666C33.4666 48.6108 33.353 48.1477 33.1257 47.7443C32.8984 47.3409 32.5831 47.0256 32.1797 46.7983C31.782 46.5653 31.3189 46.4489 30.7905 46.4489C30.2393 46.4489 29.7507 46.5767 29.3246 46.8324C28.9041 47.0824 28.5746 47.4205 28.3359 47.8466C28.0973 48.267 27.9751 48.7358 27.9695 49.2528V51.392C27.9695 52.0398 28.0888 52.5994 28.3274 53.071C28.5717 53.5426 28.9155 53.9062 29.3587 54.1619C29.8018 54.4176 30.3274 54.5455 30.9354 54.5455C31.3388 54.5455 31.7081 54.4886 32.0433 54.375C32.3786 54.2614 32.6655 54.0909 32.9041 53.8636C33.1428 53.6364 33.3246 53.358 33.4496 53.0284L36.8075 53.25C36.6371 54.0568 36.2876 54.7614 35.7592 55.3636C35.2365 55.9602 34.5604 56.4261 33.7308 56.7614C32.907 57.0909 31.9553 57.2557 30.8757 57.2557ZM39.3217 57V39.5455H42.9524V46.108H43.0632C43.2223 45.7557 43.4524 45.3977 43.7536 45.0341C44.0604 44.6648 44.4581 44.358 44.9467 44.1136C45.4411 43.8636 46.0547 43.7386 46.7876 43.7386C47.7422 43.7386 48.6229 43.9886 49.4297 44.4886C50.2365 44.983 50.8814 45.7301 51.3643 46.7301C51.8473 47.7244 52.0888 48.9716 52.0888 50.4716C52.0888 51.9318 51.853 53.1648 51.3814 54.1705C50.9155 55.1705 50.2791 55.929 49.4723 56.446C48.6712 56.9574 47.7734 57.2131 46.7791 57.2131C46.0746 57.2131 45.4751 57.0966 44.9808 56.8636C44.4922 56.6307 44.0916 56.3381 43.7791 55.9858C43.4666 55.6278 43.228 55.267 43.0632 54.9034H42.9013V57H39.3217ZM42.8757 50.4545C42.8757 51.233 42.9837 51.9119 43.1996 52.4915C43.4155 53.071 43.728 53.5227 44.1371 53.8466C44.5462 54.1648 45.0433 54.3239 45.6286 54.3239C46.2195 54.3239 46.7195 54.1619 47.1286 53.8381C47.5376 53.5085 47.8473 53.054 48.0575 52.4744C48.2734 51.8892 48.3814 51.2159 48.3814 50.4545C48.3814 49.6989 48.2763 49.0341 48.0661 48.4602C47.8558 47.8864 47.5462 47.4375 47.1371 47.1136C46.728 46.7898 46.2251 46.6278 45.6286 46.6278C45.0376 46.6278 44.5376 46.7841 44.1286 47.0966C43.7251 47.4091 43.4155 47.8523 43.1996 48.4261C42.9837 49 42.8757 49.6761 42.8757 50.4545ZM54.5795 57V39.5455H66.1364V42.5881H58.2699V46.7472H65.3693V49.7898H58.2699V57H54.5795ZM68.3395 57V43.9091H71.8594V46.1932H71.9957C72.2344 45.3807 72.6349 44.767 73.1974 44.3523C73.7599 43.9318 74.4077 43.7216 75.1406 43.7216C75.3224 43.7216 75.5185 43.733 75.7287 43.7557C75.9389 43.7784 76.1236 43.8097 76.2827 43.8494V47.071C76.1122 47.0199 75.8764 46.9744 75.5753 46.9347C75.2741 46.8949 74.9986 46.875 74.7486 46.875C74.2145 46.875 73.7372 46.9915 73.3168 47.2244C72.902 47.4517 72.5724 47.7699 72.3281 48.179C72.0895 48.5881 71.9702 49.0597 71.9702 49.5938V57H68.3395ZM81.5178 57.2472C80.6825 57.2472 79.9382 57.1023 79.2848 56.8125C78.6314 56.517 78.1143 56.0824 77.7337 55.5085C77.3587 54.929 77.1712 54.2074 77.1712 53.3438C77.1712 52.6165 77.3047 52.0057 77.5717 51.5114C77.8388 51.017 78.2024 50.6193 78.6626 50.3182C79.1229 50.017 79.6456 49.7898 80.2308 49.6364C80.8217 49.483 81.4411 49.375 82.0888 49.3125C82.8501 49.233 83.4638 49.1591 83.9297 49.0909C84.3956 49.017 84.7337 48.9091 84.9439 48.767C85.1541 48.625 85.2592 48.4148 85.2592 48.1364V48.0852C85.2592 47.5455 85.0888 47.1278 84.7479 46.8324C84.4126 46.5369 83.9354 46.3892 83.3161 46.3892C82.6626 46.3892 82.1428 46.5341 81.7564 46.8239C81.37 47.108 81.1143 47.4659 80.9893 47.8977L77.6314 47.625C77.8018 46.8295 78.1371 46.142 78.6371 45.5625C79.1371 44.9773 79.782 44.5284 80.5717 44.2159C81.3672 43.8977 82.2876 43.7386 83.3331 43.7386C84.0604 43.7386 84.7564 43.8239 85.4212 43.9943C86.0916 44.1648 86.6854 44.429 87.2024 44.7869C87.7251 45.1449 88.1371 45.6051 88.4382 46.1676C88.7393 46.7244 88.8899 47.392 88.8899 48.1705V57H85.4467V55.1847H85.3445C85.1342 55.5938 84.853 55.9545 84.5007 56.267C84.1484 56.5739 83.7251 56.8153 83.2308 56.9915C82.7365 57.1619 82.1655 57.2472 81.5178 57.2472ZM82.5575 54.7415C83.0916 54.7415 83.5632 54.6364 83.9723 54.4261C84.3814 54.2102 84.7024 53.9205 84.9354 53.5568C85.1683 53.1932 85.2848 52.7812 85.2848 52.321V50.9318C85.1712 51.0057 85.0149 51.0739 84.8161 51.1364C84.6229 51.1932 84.4041 51.2472 84.1598 51.2983C83.9155 51.3437 83.6712 51.3864 83.4268 51.4261C83.1825 51.4602 82.9609 51.4915 82.7621 51.5199C82.3359 51.5824 81.9638 51.6818 81.6456 51.8182C81.3274 51.9545 81.0803 52.1392 80.9041 52.3722C80.728 52.5994 80.6399 52.8835 80.6399 53.2244C80.6399 53.7188 80.8189 54.0966 81.1768 54.358C81.5405 54.6136 82.0007 54.7415 82.5575 54.7415ZM102.599 47.642L99.2749 47.8466C99.218 47.5625 99.0959 47.3068 98.9084 47.0795C98.7209 46.8466 98.4737 46.6619 98.1669 46.5256C97.8658 46.3835 97.505 46.3125 97.0845 46.3125C96.522 46.3125 96.0476 46.4318 95.6612 46.6705C95.2749 46.9034 95.0817 47.2159 95.0817 47.608C95.0817 47.9205 95.2067 48.1847 95.4567 48.4006C95.7067 48.6165 96.1357 48.7898 96.7436 48.9205L99.1129 49.3977C100.386 49.6591 101.335 50.0795 101.96 50.6591C102.585 51.2386 102.897 52 102.897 52.9432C102.897 53.8011 102.644 54.554 102.138 55.2017C101.638 55.8494 100.951 56.3551 100.076 56.7188C99.2067 57.0767 98.2038 57.2557 97.0675 57.2557C95.3345 57.2557 93.9538 56.8949 92.9254 56.1733C91.9027 55.446 91.3033 54.4574 91.1271 53.2074L94.6982 53.0199C94.8061 53.5483 95.0675 53.9517 95.4822 54.2301C95.897 54.5028 96.4283 54.6392 97.076 54.6392C97.7124 54.6392 98.2237 54.517 98.6101 54.2727C99.0021 54.0227 99.201 53.7017 99.2067 53.3097C99.201 52.9801 99.0618 52.7102 98.7891 52.5C98.5163 52.2841 98.0959 52.1193 97.5277 52.0057L95.2607 51.554C93.9822 51.2983 93.0305 50.8551 92.4055 50.2244C91.7862 49.5937 91.4766 48.7898 91.4766 47.8125C91.4766 46.9716 91.7038 46.2472 92.1584 45.6392C92.6186 45.0312 93.2635 44.5625 94.093 44.233C94.9283 43.9034 95.9055 43.7386 97.0249 43.7386C98.6783 43.7386 99.9794 44.0881 100.928 44.7869C101.883 45.4858 102.44 46.4375 102.599 47.642ZM111.149 57.2557C109.803 57.2557 108.643 56.983 107.672 56.4375C106.706 55.8864 105.962 55.108 105.439 54.1023C104.916 53.0909 104.655 51.8949 104.655 50.5142C104.655 49.1676 104.916 47.9858 105.439 46.9688C105.962 45.9517 106.697 45.1591 107.646 44.5909C108.601 44.0227 109.72 43.7386 111.004 43.7386C111.868 43.7386 112.672 43.8778 113.416 44.1562C114.166 44.429 114.82 44.8409 115.376 45.392C115.939 45.9432 116.376 46.6364 116.689 47.4716C117.001 48.3011 117.158 49.2727 117.158 50.3864V51.3835H106.104V49.1335H113.74C113.74 48.6108 113.626 48.1477 113.399 47.7443C113.172 47.3409 112.857 47.0256 112.453 46.7983C112.055 46.5653 111.592 46.4489 111.064 46.4489C110.513 46.4489 110.024 46.5767 109.598 46.8324C109.178 47.0824 108.848 47.4205 108.609 47.8466C108.371 48.267 108.249 48.7358 108.243 49.2528V51.392C108.243 52.0398 108.362 52.5994 108.601 53.071C108.845 53.5426 109.189 53.9062 109.632 54.1619C110.075 54.4176 110.601 54.5455 111.209 54.5455C111.612 54.5455 111.982 54.4886 112.317 54.375C112.652 54.2614 112.939 54.0909 113.178 53.8636C113.416 53.6364 113.598 53.358 113.723 53.0284L117.081 53.25C116.911 54.0568 116.561 54.7614 116.033 55.3636C115.51 55.9602 114.834 56.4261 114.004 56.7614C113.18 57.0909 112.229 57.2557 111.149 57.2557ZM130.419 47.642L127.095 47.8466C127.038 47.5625 126.916 47.3068 126.729 47.0795C126.541 46.8466 126.294 46.6619 125.987 46.5256C125.686 46.3835 125.325 46.3125 124.905 46.3125C124.342 46.3125 123.868 46.4318 123.482 46.6705C123.095 46.9034 122.902 47.2159 122.902 47.608C122.902 47.9205 123.027 48.1847 123.277 48.4006C123.527 48.6165 123.956 48.7898 124.564 48.9205L126.933 49.3977C128.206 49.6591 129.155 50.0795 129.78 50.6591C130.405 51.2386 130.717 52 130.717 52.9432C130.717 53.8011 130.464 54.554 129.959 55.2017C129.459 55.8494 128.771 56.3551 127.896 56.7188C127.027 57.0767 126.024 57.2557 124.888 57.2557C123.155 57.2557 121.774 56.8949 120.746 56.1733C119.723 55.446 119.124 54.4574 118.947 53.2074L122.518 53.0199C122.626 53.5483 122.888 53.9517 123.303 54.2301C123.717 54.5028 124.249 54.6392 124.896 54.6392C125.533 54.6392 126.044 54.517 126.43 54.2727C126.822 54.0227 127.021 53.7017 127.027 53.3097C127.021 52.9801 126.882 52.7102 126.609 52.5C126.337 52.2841 125.916 52.1193 125.348 52.0057L123.081 51.554C121.803 51.2983 120.851 50.8551 120.226 50.2244C119.607 49.5937 119.297 48.7898 119.297 47.8125C119.297 46.9716 119.524 46.2472 119.979 45.6392C120.439 45.0312 121.084 44.5625 121.913 44.233C122.749 43.9034 123.726 43.7386 124.845 43.7386C126.499 43.7386 127.8 44.0881 128.749 44.7869C129.703 45.4858 130.26 46.4375 130.419 47.642ZM141.635 57H137.68L143.706 39.5455H148.462L154.479 57H150.524L146.152 43.5341H146.016L141.635 57ZM141.388 50.1392H150.729V53.0199H141.388V50.1392ZM160.27 39.5455V57H156.58V39.5455H160.27Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M87.7917 2.07692H90.9167C91.4692 2.07692 91.9991 2.29574 92.3898 2.68524C92.7805 3.07474 93 3.60301 93 4.15385V24.9231C93 25.4739 92.7805 26.0022 92.3898 26.3917C91.9991 26.7812 91.4692 27 90.9167 27H70.0833C69.5308 27 69.0009 26.7812 68.6102 26.3917C68.2195 26.0022 68 25.4739 68 24.9231V4.15385C68 3.60301 68.2195 3.07474 68.6102 2.68524C69.0009 2.29574 69.5308 2.07692 70.0833 2.07692H73.2083V1.03846C73.2083 0.763044 73.3181 0.498908 73.5134 0.304158C73.7088 0.109409 73.9737 0 74.25 0C74.5263 0 74.7912 0.109409 74.9866 0.304158C75.1819 0.498908 75.2917 0.763044 75.2917 1.03846V2.07692H85.7083V1.03846C85.7083 0.763044 85.8181 0.498908 86.0134 0.304158C86.2088 0.109409 86.4737 0 86.75 0C87.0263 0 87.2912 0.109409 87.4866 0.304158C87.6819 0.498908 87.7917 0.763044 87.7917 1.03846V2.07692ZM73.2083 5.19231V4.15385H70.0833V8.30769H90.9167V4.15385H87.7917V5.19231C87.7917 5.46773 87.6819 5.73186 87.4866 5.92661C87.2912 6.12136 87.0263 6.23077 86.75 6.23077C86.4737 6.23077 86.2088 6.12136 86.0134 5.92661C85.8181 5.73186 85.7083 5.46773 85.7083 5.19231V4.15385H75.2917V5.19231C75.2917 5.46773 75.1819 5.73186 74.9866 5.92661C74.7912 6.12136 74.5263 6.23077 74.25 6.23077C73.9737 6.23077 73.7088 6.12136 73.5134 5.92661C73.3181 5.73186 73.2083 5.46773 73.2083 5.19231ZM70.0833 24.9231H90.9167V10.3846H70.0833V24.9231Z" fill="black"/>
          <path d="M85.9245 13.8038C86.0213 13.9002 86.0982 14.0147 86.1506 14.1408C86.203 14.2669 86.23 14.402 86.23 14.5385C86.23 14.6749 86.203 14.8101 86.1506 14.9361C86.0982 15.0622 86.0213 15.1767 85.9245 15.2732L79.6745 21.5039C79.5777 21.6005 79.4629 21.6771 79.3364 21.7294C79.2099 21.7816 79.0744 21.8085 78.9375 21.8085C78.8006 21.8085 78.6651 21.7816 78.5386 21.7294C78.4121 21.6771 78.2973 21.6005 78.2005 21.5039L75.0755 18.3886C74.8801 18.1937 74.7703 17.9294 74.7703 17.6538C74.7703 17.3783 74.8801 17.114 75.0755 16.9191C75.271 16.7243 75.5361 16.6148 75.8125 16.6148C76.0889 16.6148 76.354 16.7243 76.5495 16.9191L78.9375 19.3011L84.4505 13.8038C84.5473 13.7072 84.6621 13.6306 84.7886 13.5783C84.9151 13.5261 85.0506 13.4992 85.1875 13.4992C85.3244 13.4992 85.4599 13.5261 85.5864 13.5783C85.7129 13.6306 85.8277 13.7072 85.9245 13.8038Z" fill="#FF6C47"/>
        </svg>
      </header>

      <main className='mainHome'>
        <div className='phraseContainer'>

            <h1>Dia <span>31/out </span> se comemora o <span>Halloween!</span></h1>

            <button onClick={handleFilterClick} className='btnOpenFilter'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 12.75C18.75 12.9489 18.671 13.1397 18.5303 13.2803C18.3897 13.421 18.1989 13.5 18 13.5H6C5.80109 13.5 5.61032 13.421 5.46967 13.2803C5.32902 13.1397 5.25 12.9489 5.25 12.75C5.25 12.5511 5.32902 12.3603 5.46967 12.2197C5.61032 12.079 5.80109 12 6 12H18C18.1989 12 18.3897 12.079 18.5303 12.2197C18.671 12.3603 18.75 12.5511 18.75 12.75ZM21.75 7.5H2.25C2.05109 7.5 1.86032 7.57902 1.71967 7.71967C1.57902 7.86032 1.5 8.05109 1.5 8.25C1.5 8.44891 1.57902 8.63968 1.71967 8.78033C1.86032 8.92098 2.05109 9 2.25 9H21.75C21.9489 9 22.1397 8.92098 22.2803 8.78033C22.421 8.63968 22.5 8.44891 22.5 8.25C22.5 8.05109 22.421 7.86032 22.2803 7.71967C22.1397 7.57902 21.9489 7.5 21.75 7.5ZM14.25 16.5H9.75C9.55109 16.5 9.36032 16.579 9.21967 16.7197C9.07902 16.8603 9 17.0511 9 17.25C9 17.4489 9.07902 17.6397 9.21967 17.7803C9.36032 17.921 9.55109 18 9.75 18H14.25C14.4489 18 14.6397 17.921 14.7803 17.7803C14.921 17.6397 15 17.4489 15 17.25C15 17.0511 14.921 16.8603 14.7803 16.7197C14.6397 16.579 14.4489 16.5 14.25 16.5Z" fill="black"/>
              </svg>
              Filtro
            </button>
            
            <div className='phraseContain'>

            <div className={`filterContainer ${isFilterVisible ? 'visible' : ''}`}>
                <div className="filterHeader">
                  <p>Filtro</p>
      
                  <button onClick={handleFilterClick} className="btnCloseMobile">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.281 11.281L13.781 18.781C13.7114 18.8508 13.6287 18.9061 13.5376 18.9438C13.4466 18.9816 13.349 19.001 13.2504 19.001C13.1519 19.001 13.0543 18.9816 12.9632 18.9438C12.8722 18.9061 12.7894 18.8508 12.7198 18.781L5.21979 11.281C5.07906 11.1403 5 10.9494 5 10.7504C5 10.5514 5.07906 10.3605 5.21979 10.2198C5.36052 10.0791 5.55139 10 5.75042 10C5.94944 10 6.14031 10.0791 6.28104 10.2198L13.2504 17.1901L20.2198 10.2198C20.2895 10.1501 20.3722 10.0948 20.4632 10.0571C20.5543 10.0194 20.6519 10 20.7504 10C20.849 10 20.9465 10.0194 21.0376 10.0571C21.1286 10.0948 21.2114 10.1501 21.281 10.2198C21.3507 10.2895 21.406 10.3722 21.4437 10.4632C21.4814 10.5543 21.5008 10.6519 21.5008 10.7504C21.5008 10.849 21.4814 10.9465 21.4437 11.0376C21.406 11.1286 21.3507 11.2114 21.281 11.281Z" fill="black"/>
                    </svg>
                  </button>
                </div>

                <div className='filter'>
                  
                    {dates.map((mes) => (
                        <div key={mes.id}>
                          <p>
                            <strong>{mes.nameMonth}</strong>
                          </p>
                          <div>
                            <ul>
                              {mes.dates.map((data) => (
                                <li key={data.id}>
                                  <button
                                    className={activeButton === data.id ? 'active' : ''}
                                    onClick={() => handleFilter(data.id, data.nameDate)}
                                  >
                                    {data.nameDate}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}

                  

                  </div>
            </div>

            <div className='resultTxtContainer'>

                <div className='txtPhrase'>
                  {loading && (<div className='loaderContainer'><p>Carregando...</p><div className='loader'></div></div>)}

                    {phrase.length === 0 ? 
                      <div className='txtPhraseContainer'>
                        <p>Clique abaixo para gerar uma frase para suas redes sociais!</p>
                        <button onClick={() => handleCreate('halloween')} className='btn create'>Gerar Frase</button>
                      </div>
                      
                      : <div className='txtPhraseContainer'>
                          {phrase.map((item, index) => (
                              <p key={index}>{cleanText(item.generated_text)}</p> 
                          ))}
                          
                          <div className='btnPhraseContainer'>
                            <button onClick={handleCopy} className='btn btnCopy'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.25 0H5.25C5.05109 0 4.86032 0.0790178 4.71967 0.21967C4.57902 0.360322 4.5 0.551088 4.5 0.75V4.5H0.75C0.551088 4.5 0.360322 4.57902 0.21967 4.71967C0.0790178 4.86032 0 5.05109 0 5.25V17.25C0 17.4489 0.0790178 17.6397 0.21967 17.7803C0.360322 17.921 0.551088 18 0.75 18H12.75C12.9489 18 13.1397 17.921 13.2803 17.7803C13.421 17.6397 13.5 17.4489 13.5 17.25V13.5H17.25C17.4489 13.5 17.6397 13.421 17.7803 13.2803C17.921 13.1397 18 12.9489 18 12.75V0.75C18 0.551088 17.921 0.360322 17.7803 0.21967C17.6397 0.0790178 17.4489 0 17.25 0ZM12 16.5H1.5V6H12V16.5ZM16.5 12H13.5V5.25C13.5 5.05109 13.421 4.86032 13.2803 4.71967C13.1397 4.57902 12.9489 4.5 12.75 4.5H6V1.5H16.5V12Z" fill="black"/>
                            </svg>

                              Copiar
                            </button>
                            <button onClick={handleClean} className='btn btnClean'>
                              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.6672 15.8475C13.9961 15.0129 13.0375 13.2238 13.0375 10.9309V9.6198C13.0381 9.37657 12.9671 9.13879 12.8338 8.93752C12.7005 8.73625 12.511 8.58083 12.2901 8.49157L10.4448 7.74346C10.2996 7.68398 10.1833 7.56815 10.1211 7.4212C10.059 7.27425 10.056 7.10809 10.113 6.95893L11.6923 2.93764C11.7995 2.67371 11.8535 2.39034 11.8513 2.10449C11.849 1.81865 11.7904 1.53621 11.6791 1.2741C11.5677 1.01198 11.4059 0.775581 11.2032 0.57905C11.0005 0.382519 10.7612 0.2299 10.4996 0.130334C9.99009 -0.0608938 9.42782 -0.0410533 8.93234 0.185638C8.43685 0.41233 8.0472 0.828 7.84621 1.34431C7.84592 1.34733 7.84592 1.35038 7.84621 1.35341L6.28912 5.39139C6.23121 5.54077 6.11781 5.66054 5.9738 5.7244C5.82979 5.78827 5.66693 5.79102 5.52095 5.73206L3.63792 4.94677C3.42081 4.85666 3.18239 4.83495 2.95317 4.88442C2.72395 4.93389 2.51436 5.05229 2.35121 5.22446C0.791154 6.86712 1.51488e-05 8.78671 1.51488e-05 10.9301C-0.00408459 13.1236 0.824096 15.2328 2.30972 16.8126C2.36539 16.8722 2.43232 16.9195 2.50645 16.9518C2.58057 16.984 2.66033 17.0004 2.74085 17H15.408C15.5419 16.9999 15.6718 16.9533 15.7766 16.8678C15.8814 16.7823 15.9548 16.663 15.9849 16.5293C16.0149 16.3956 15.9999 16.2554 15.9422 16.1316C15.8845 16.0078 15.7876 15.9076 15.6672 15.8475ZM3.19568 6.07424L5.07797 6.85574C5.29524 6.94477 5.52754 6.98899 5.76154 6.98586C5.99553 6.98273 6.22662 6.93232 6.44156 6.83751C6.65649 6.74269 6.85103 6.60535 7.01402 6.43336C7.17702 6.26137 7.30525 6.05811 7.39138 5.83524L8.94699 1.81396C9.13663 1.35038 9.6485 1.11062 10.09 1.28285C10.2026 1.32562 10.3055 1.39131 10.3926 1.47594C10.4797 1.56057 10.5491 1.6624 10.5968 1.77528C10.6444 1.88816 10.6692 2.00975 10.6697 2.13271C10.6702 2.25568 10.6464 2.37747 10.5996 2.49075L9.0144 6.51127C8.84085 6.95975 8.84813 7.46043 9.03465 7.90341C9.22117 8.34638 9.57169 8.69545 10.0092 8.87397L11.8523 9.6198V10.9301C11.8523 10.9552 11.8523 10.9802 11.8523 11.006L2.35343 7.11447C2.60596 6.74474 2.88766 6.39683 3.19568 6.07424ZM6.75136 15.786C5.86905 14.9192 5.244 13.8144 4.94833 12.5993C4.90713 12.4457 4.80856 12.3147 4.67392 12.2349C4.53928 12.155 4.37937 12.1325 4.22871 12.1724C4.07805 12.2122 3.94873 12.3112 3.86869 12.4478C3.78865 12.5845 3.76429 12.7479 3.80089 12.9028C4.05936 13.9482 4.52203 14.929 5.16093 15.786H2.99567C1.82688 14.4523 1.1819 12.7223 1.18524 10.9301C1.17799 9.98055 1.37342 9.04082 1.75785 8.17669L11.9656 12.3588C12.1878 13.7245 12.7479 14.8991 13.5871 15.7853L6.75136 15.786Z" fill="white"/>
                              </svg>

                              Limpar
                            </button>
                          </div>
                        </div> 
                    }
                    
                </div>

                <p>WebFrase IA pode cometer erros. Confira informações importantes.</p>
            </div>
                  
            </div>
        </div>
      </main>

    </div>
  )
}

export default App
