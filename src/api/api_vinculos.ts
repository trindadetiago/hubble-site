import { url } from "./api";

const api_url = url + "/vinculo";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchVinculos = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // data = {'vinculos': [[id, vinc_cargo, vinc_carga_horaria, vinc_remunerado, vinc_data_inicio, vinc_data_fim, id_pessoa_vinculo, id_projeto_vinculo], [id, vinc_cargo, vinc_carga_horaria, vinc_remunerado, vinc_data_inicio, vinc_data_fim, id_pessoa_vinculo, id_projeto_vinculo], ...]}
      const transformedData = data.vinculos.map((vinculo: [string, string, number, boolean, string, string, string, string]) => {
        return {
          id: vinculo[0],
          vinc_cargo: vinculo[1],
          vinc_carga_horaria: vinculo[2],
          vinc_remunerado: vinculo[3],
          vinc_data_inicio: vinculo[4],
          vinc_data_fim: vinculo[5],
          id_pessoa_vinculo: vinculo[6],
          id_projeto_vinculo: vinculo[7]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}

export const deleteVinculo = async (id: string) => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to delete vinculo:', error);
      throw error;
    }
}

export const editVinculo = async (id: string, vinculoData: { vinc_cargo: string, vinc_carga_horaria: number, vinc_remunerado: boolean, vinc_data_inicio: string, vinc_data_fim: string, id_pessoa_vinculo: string, id_projeto_vinculo: string}) => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vinculoData)
      });
      console.log("RESPONSE: ", response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to edit vinculo:', error);
      throw error;
    }
}

export const createVinculo = async (vinculoData: { vinc_cargo: string, vinc_carga_horaria: number, vinc_remunerado: boolean, vinc_data_inicio: string, vinc_data_fim: string, id_pessoa_vinculo: string, id_projeto_vinculo: string }) => {
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vinculoData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to add vinculo:', error);
      throw error;
    }
}