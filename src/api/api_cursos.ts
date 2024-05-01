import { url } from "./api";

const api_url = url + "/curso";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchCursos = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.hasOwnProperty('message')) {
        return [];
      } 

      const transformedData = data.cursos.map((lab: [string, string, string]) => {
        return {
          id: lab[0],
          nome: lab[1],
          departamento: lab[2]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}