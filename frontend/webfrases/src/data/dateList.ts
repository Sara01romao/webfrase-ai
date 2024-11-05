type DateType = {
    id: number;
    nameDate: string;
    date: string;
  };
  
 export type MesType = {
    id: number;
    nameMonth: string;
    dates:DateType[];
  };
  
  export const dates:  MesType[] = [
    {
      id: 1,
      nameMonth: "Janeiro",
      dates: [
        { id: 1, nameDate: "Ano Novo", date: "01/01" }
      ]
    },
    {
      id: 2,
      nameMonth: "Fevereiro",
      dates: [
        { id: 2, nameDate: "Dia dos Namorados", date: "14/02" }
      ]
    },
    {
      id: 3,
      nameMonth: "Março",
      dates: [
        { id: 3, nameDate: "Dia Internacional da Mulher", date: "08/03" }
      ]
    },
    {
      id: 4,
      nameMonth: "Maio",
      dates: [
        { id: 4, nameDate: "Dia do Trabalho", date: "01/05" }
      ]
    },
    {
      id: 5,
      nameMonth: "Junho",
      dates: [
        { id: 5, nameDate: "Dia dos Namorados", date: "12/06" }
      ]
    },
    {
      id: 6,
      nameMonth: "Setembro",
      dates: [
        { id: 6, nameDate: "Dia da Independência do Brasil", date: "07/09" }
      ]
    },
    {
      id: 7,
      nameMonth: "Outubro",
      dates: [
        { id: 7, nameDate: "Dia das Crianças", date: "12/10" },
        { id: 8, nameDate: "Halloween", date: "31/10" }
      ]
    },
    {
      id: 8,
      nameMonth: "Novembro",
      dates: [
        { id: 9, nameDate: "Black Friday", date: "Black Friday" }, // Data variável
        
      ]
    },
    {
      id: 9,
      nameMonth: "Dezembro",
      dates: [
        { id: 11, nameDate: "Natal", date: "25/12" }
      ]
    },
    
  ];
  