import { url } from "./api";

const api_url = url + "/laboratorio";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchLabs = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // data = {'laboratorios': [[id, name], [id, name], ...]}
      const transformedData = data.laboratorios.map((lab: [number, string]) => {
        return {
          id: lab[0],
          name: lab[1]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}
  
export const fetchLabById = async (id: number) => {
    try {
      const response = await fetch(`${api_url}/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}


export const deleteLab = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
}
  

export const editLab = async (id: string, labData: { name: string }): Promise<void> => {
    try {
      console.log("NOVO NOME: ", labData.name)
      const response = await fetch(`${api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({lab_nome: labData.name})
      });
      console.log("RESPONSE: ", response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to edit lab:', error);
      throw error;
    }
}
