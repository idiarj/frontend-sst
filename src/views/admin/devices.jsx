import React, { useState, useEffect } from 'react';
import HeadBrand from '../../components/headBrand';
import { fetchMockReport } from './fetchMockReport';
import logoMini from '../../assets/logoMini.png';
import NavMenu from '../../components/navMenu';
import Report from '../../components/report';
import { MdHeight } from 'react-icons/md';

function Devices() {
  // Para varios reportes, simula un array (en el futuro puede venir de la API)
  const [reports, setReports] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [responseLevels, setResponseLevels] = useState([]);

  useEffect(() => {
    // Simula varios reportes usando el mock
    fetchMockReport().then(data => {
      // Aquí puedes clonar el mock para simular varios
      const base = data;
      const fakeReports = [
        { ...base.datos_personales, ...base, ...{ id: '001' } },
        { ...base.datos_personales, ...base, ...{ id: '002', nombre: 'Maria', cedula: '18045240', dispositivo: '003', estado: 'EN PROCESO', nivel_respuesta: 'ALTA', tecnico: 'JUAN' } },
      ];
      setReports(fakeReports);
      setStatuses(fakeReports.map(r => r.estado || 'PENDIENTE'));
      setResponseLevels(fakeReports.map(r => r.nivel_respuesta || ''));
    }).catch(err => {
      import('./mockReport.json').then(module => {
        const data = module.default.reporte || module.reporte;
        const base = data;
        const fakeReports = [
          { ...base.datos_personales, ...base, ...{ id: '001' } },
          { ...base.datos_personales, ...base, ...{ id: '002', nombre: 'Maria', cedula: '18045240', dispositivo: '003', estado: 'EN PROCESO', nivel_respuesta: 'ALTA', tecnico: 'JUAN' } },
        ];
        setReports(fakeReports);
        setStatuses(fakeReports.map(r => r.estado || 'PENDIENTE'));
        setResponseLevels(fakeReports.map(r => r.nivel_respuesta || ''));
      });
    });
  }, []);

  // Handlers para cada reporte
  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    setReports(prev => prev.map((r, i) => i === idx ? { ...r, [name]: value } : r));
  };
  const setStatus = (status, idx) => {
    setStatuses(prev => prev.map((s, i) => i === idx ? status : s));
    setReports(prev => prev.map((r, i) => i === idx ? { ...r, estado: status } : r));
  };
  const setResponseLevel = (level, idx) => {
    setResponseLevels(prev => prev.map((l, i) => i === idx ? level : l));
    setReports(prev => prev.map((r, i) => i === idx ? { ...r, nivel_respuesta: level } : r));
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
              <div style={{ height: 45 }} />
      <NavMenu/>
      <h1> hola mundo </h1>
    </div>
  );
}

export default Devices;
