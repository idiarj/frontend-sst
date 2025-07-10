import React, { useState, useEffect } from 'react';
import HeadBrand from '../../components/headBrand';
import { fetchMockReport } from './fetchMockReport';
import logoMini from '../../assets/logoMini.png';
import Report from '../../components/report';
import NavMenu from '../../components/navMenu';

function Reports() {
  const [reports, setReports] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [responseLevels, setResponseLevels] = useState([]);

  useEffect(() => {
    fetchMockReport().then(data => {
      const base = data;
      const fakeReports = [
        { ...base.datos_personales, ...base, ...{ id: '001' } },
        { ...base.datos_personales, ...base, ...{ id: '002', nombre: 'Maria', cedula: '18045240', dispositivo: '003', estado: 'PENDIENTE', nivel_respuesta: 'MEDIA', tecnico: 'JUAN' } },
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
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeadBrand />
      <div style={{ height: 47 }} />
            <NavMenu />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '32px 0 0 32px', marginBottom: 12, paddingTop: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logoMini} alt="Logo mini" style={{ height: 36, marginRight: 8 }} />
          ENTRADA DE SOLICITUD DE REPORTES
        </span>
      </div>
      <div style={{ padding: '24px 20px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {reports.map((report, idx) => (
          <Report
            key={report.id || idx}
            report={report}
            status={statuses[idx]}
            responseLevel={responseLevels[idx]}
            onChange={handleChange(idx)}
            setStatus={setStatus}
            setResponseLevel={setResponseLevel}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Reports;
