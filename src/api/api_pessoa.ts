import { url } from "./api";

const api_url = url + "/pessoa";

// ROUTES:
// /laboratorio
// /projeto
// /pessoa
// /vinculo
// /curso
// /tipo_projeto

export const fetchUsers = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}
  
export const fetchUserById = async (id: number) => {
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


export const deleteUser = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`api_url/${id}`, {
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
  