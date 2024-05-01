import React, { useEffect } from 'react';

import HeroSection from '../components/LandingPage/HeroSection/HeroSection';
import BackgroundCircles from '../components/LandingPage/BackgroundCircles/BackgroundCircles'; 
import IndividualLab from '../components/LandingPage/LaboratorioAndProject/IndividualLab';
import IndividualProj from '../components/LandingPage/LaboratorioAndProject/IndividualProj';

import { fetchViews } from '../api/api_views';

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
const LandingPage: React.FC = () => {
  const [viewData, setViewData] = React.useState<ViewsData>({view_laboratorio: [], view_projeto: []});

  const fetchData = async () => {
    try {
      const data = await fetchViews();
      setViewData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching labs:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="landing-page" style={{ paddingLeft: '15%', paddingRight: '15%'}}>
      <BackgroundCircles />
      <main>
        <HeroSection />
      </main>
      <section>
        <div className="section-container">
          <h2>Laboratórios Destaque</h2>
          <div className='Labs'>
            {viewData.view_laboratorio.map((lab) => (
              <IndividualLab
                key={lab.lab_id}
                lab_nome={lab.lab_nome}
                lab_descricao={lab.lab_descricao}
                quantidade_pessoas={lab.quantidade_pessoas}
                quantidade_projetos={lab.quantidade_projetos}
              />
            ))}
          </div>
        </div>
        <div className="section-container">
          <h2>Projetos Destaque</h2>
          <div className='Projs'>
            {viewData.view_projeto.map((proj) => (
              <IndividualProj
                key={proj.proj_id}
                proj_nome={proj.proj_nome}
                proj_descricao={proj.proj_descricao}
                tipo_proj={proj.tipo_proj}
                lab_nome={proj.lab_nome}
                quantidade_pessoas={proj.quantidade_pessoas}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
