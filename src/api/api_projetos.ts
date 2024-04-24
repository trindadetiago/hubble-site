import { url } from "./api";

const api_url = url + "/projeto";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchProjetos = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // data = {'projetos': [[id, proj_nome, id_tipro_projeto, id_lab_projeto], [id, proj_nome, id_tipro_projeto, id_lab_projeto], ...]}
      const transformedData = data.projetos.map((proj: [number, string, number, number]) => {
        return {
          id: proj[0],
          proj_nome: proj[1],
          id_tipro_projeto: proj[2],
          id_lab_projeto: proj[3]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}

export const deleteProjeto = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to delete projeto:', error);
      throw error;
    }
}
  
export const editProjeto = async (id: string, projetoData: { proj_nome: string, id_tipro_projeto: string, id_lab_projeto: string }): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projetoData)
      });
      console.log("RESPONSE: ", response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to edit projeto:', error);
      throw error;
    }
}

export const createProjeto = async ( projetoData: { proj_nome: string, id_tipro_projeto: string, id_lab_projeto: string } ): Promise<void> => { 
  try { 
    const response = await fetch(api_url, { 
      method: 'POST', headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(projetoData) 
    }); 
      if (!response.ok) { 
        console.log(response);
        console.log(projetoData);
        throw new Error('Network response was not ok'); 
      } 
    } catch (error) { 
      console.error('Failed to create projeto:', error); throw error; 
    } 
  }
