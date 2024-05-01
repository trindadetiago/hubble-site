import { url } from "./api";

const api_url = url + "/count";

// Route: /count

interface CountData {
  count_laboratorio: number;
  count_projeto: number;
  count_pessoa: number;
}

export const fetchCount = async (): Promise<CountData> => {
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Assuming the data structure is correct and does not need the check for 'message' property.
    return {
      count_laboratorio: data.unique_laboratories,
      count_projeto: data.unique_projects,
      count_pessoa: data.unique_people
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};