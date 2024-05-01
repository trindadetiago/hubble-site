import { url } from "./api";

const api_url = url + "/vinculo";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchVinculos = async (id_proj: string) => {
  let api_url_new = api_url;
  if (id_proj !== "") {
    api_url_new = api_url_new + `?id_projeto_vinculo=${id_proj}`;
  }  
  console.log("API_URL_NEW VINCULOS: ", api_url_new);
  try {
      const response = await fetch(api_url_new);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.hasOwnProperty('message')) {
        return [];
      } 

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

export const fetchVinculosJoin = async () => {
  try {
    const response = await fetch('/jvinculo');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // data = {'vinculos': [[id, vinc_cargo, vinc_carga_horaria, vinc_remunerado, vinc_data_inicio, vinc_data_fim, id_pessoa_vinculo, id_projeto_vinculo, id_pessoa, pess_nome, pess_email, id_curso_pessoa, pess_matricula, pess_role, id_projeto, proj_nome, id_tipro_projeto, id_lab_projeto, id_laboratorio, lab_nome, descricao], [...], ...]}
    const transformedData = data.vinculos.map((vinculo: [string, string, number, boolean, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]) => {
      return {
        id: vinculo[0],
        vinc_cargo: vinculo[1],
        vinc_carga_horaria: vinculo[2],
        vinc_remunerado: vinculo[3],
        vinc_data_inicio: vinculo[4],
        vinc_data_fim: vinculo[5],
        id_pessoa_vinculo: vinculo[6],
        id_projeto_vinculo: vinculo[7],
        id_pessoa: vinculo[8],
        pess_nome: vinculo[9],
        pess_email: vinculo[10],
        id_curso_pessoa: vinculo[11],
        pess_matricula: vinculo[12],
        pess_role: vinculo[13],
        id_projeto: vinculo[14],
        proj_nome: vinculo[15],
        id_tipro_projeto: vinculo[16],
        id_lab_projeto: vinculo[17],
        id_laboratorio: vinculo[18],
        lab_nome: vinculo[19],
        descricao: vinculo[20]
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
      console.log("ENVIADO:", vinculoData)
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