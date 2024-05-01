import { url } from "./api";

const api_url = url + "/viewprojeto";

interface LabView {
    lab_id: string;
    lab_nome: string;
    lab_descricao: string;
    quantidade_pessoas: number;
    quantidade_projetos: number;
  }
  
  interface ProjView {
    proj_id: string;
    proj_nome: string;
    proj_descricao: string;
    tipo_proj: string;
    lab_nome: string;
    quantidade_pessoas: number;
  }
  
  interface ViewsData {
    view_laboratorio: LabView[];
    view_projeto: ProjView[];
  }

export const fetchViews = async (): Promise<ViewsData> => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Assuming the data structure is correct and does not need the check for 'message' property.
      return {
        view_laboratorio: data.view_laboratorio.map((lab: any): LabView => ({
          lab_id: lab[0],
          lab_nome: lab[1],
          lab_descricao: lab[2],
          quantidade_pessoas: lab[3],
          quantidade_projetos: lab[4]
        })),
        view_projeto: data.view_projeto.map((proj: any): ProjView => ({
          proj_id: proj[0],
          proj_nome: proj[1],
          proj_descricao: proj[2],
          tipo_proj: proj[3],
          lab_nome: proj[4],
          quantidade_pessoas: proj[5]
        }))
      };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };
  