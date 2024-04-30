import { url } from "./api";

const api_url = url + "/tipoprojeto";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchTipoProjetos = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // data = {'tipos projetos': [[id, tipro_nome], [id, tipro_nome]...]}
      console.log(data)
      const transformedData = data['tipos projetos'].map((tipo_projeto: [string, string]) => {
        return {
          id: tipo_projeto[0],
          tipro_nome: tipo_projeto[1]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}

export const deleteTipoProjeto = async (id: string): Promise<void> => {
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
  
export const editTipoProjeto = async (id: string, tipoProjetoData: { tipro_nome: string }): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tipoProjetoData)
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

export const createTipoProjeto = async ( tipoProjetoData: { tipro_nome: string } ): Promise<void> => { 
  try { 
    const response = await fetch(api_url, { 
      method: 'POST', headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(tipoProjetoData) 
    }); 
      if (!response.ok) { 
        console.log(response);
        console.log(tipoProjetoData);
        throw new Error('Network response was not ok'); 
      } 
    } catch (error) { 
      console.error('Failed to create projeto:', error); throw error; 
    } 
  }
