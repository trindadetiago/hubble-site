import { url } from "./api";

const api_url = url + "/pessoa";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchPessoas = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // data = {'pessoas': [[id, pess_nome, pess_email, id_curso_pessoa, pess_matricula, pess_role], [...], ...]
      console.log(data)
      const transformedData = data.pessoas.map((pessoa: [number, string, string, number, string, string]) => {
        return {
          id: pessoa[0],
          pess_nome: pessoa[1],
          pess_email: pessoa[2],
          id_curso_pessoa: pessoa[3],
          pess_matricula: pessoa[4],
          pess_role: pessoa[5]
        };
      });
      return transformedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}

export const deletePessoa = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Failed to delete pessoa:', error);
      throw error;
    }
}
  
export const editPessoa = async (id: string, pessoaData: { pess_nome: string, pessoa_email: string, id_curso_pessoa: string, pess_matricula: string, pess_role: string }): Promise<void> => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoaData)
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

export const createPessoa = async ( pessoaData: { pess_nome: string, pessoa_email: string, id_curso_pessoa: string, pess_matricula: string, pess_role: string } ): Promise<void> => { 
  try { 
    const response = await fetch(api_url, { 
      method: 'POST', headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(pessoaData) 
    }); 
      if (!response.ok) { 
        console.log(response);
        throw new Error('Network response was not ok'); 
      } 
    } catch (error) { 
      console.error('Failed to create pessoa:', error); throw error; 
    } 
  }
