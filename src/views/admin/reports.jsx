import React, { useState, useEffect } from 'react';
import HeadBrand from '../../components/headBrand';
import { fetchMockReport } from './fetchMockReport';
import logoMini from '../../assets/logoMini.png';
import Report from '../../components/report';
import NavMenu from '../../components/navMenu';
import SearchBar from '../../components/searchBar';

function Reports() {
  const [reports, setReports] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [responseLevels, setResponseLevels] = useState([]);

  // Estados para dos filtros
  const [filterField1, setFilterField1] = useState('fecha');
  const [filterValue1, setFilterValue1] = useState('');
  const [filterField2, setFilterField2] = useState('estado');
  const [filterValue2, setFilterValue2] = useState('');

  useEffect(() => {
    fetchMockReport().then(data => {
      const base = data;
      const fakeReports = [
        { ...base.datos_personales, ...base, ...{ id: '001' } },
        { ...base.datos_personales, ...base, ...{ id: '002', nombre: 'Maria', cedula: '18045240', dispositivo: '003', estado: 'PENDIENTE', nivel_respuesta: 'MEDIA', tecnico: 'JUAN', fecha: '2025-07-07' } },
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

  // Handlers para los dos filtros
  const handleField1Change = (e) => setFilterField1(e.target.value);
  const handleValue1Change = (e) => setFilterValue1(e.target.value);
  const handleField2Change = (e) => setFilterField2(e.target.value);
  const handleValue2Change = (e) => setFilterValue2(e.target.value);

  // Filtrar los reportes según ambos filtros
  const filteredReports = reports.filter((report) => {
    const value1 = filterValue1.toLowerCase();
    const value2 = filterValue2.toLowerCase();
    let match1 = true;
    let match2 = true;
    switch (filterField1) {
      case 'fecha':
        match1 = (report.fecha || '').toLowerCase().includes(value1);
        break;
      case 'numero':
        match1 = (report.id || '').toString().toLowerCase().includes(value1);
        break;
      case 'estado':
        match1 = (report.estado || '').toLowerCase().includes(value1);
        break;
      case 'cedula':
        match1 = (report.cedula || '').toString().toLowerCase().includes(value1);
        break;
      default:
        match1 = true;
    }
    switch (filterField2) {
      case 'fecha':
        match2 = (report.fecha || '').toLowerCase().includes(value2);
        break;
      case 'numero':
        match2 = (report.id || '').toString().toLowerCase().includes(value2);
        break;
      case 'estado':
        match2 = (report.estado || '').toLowerCase().includes(value2);
        break;
      case 'cedula':
        match2 = (report.cedula || '').toString().toLowerCase().includes(value2);
        break;
      default:
        match2 = true;
    }
    return match1 && match2;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeadBrand />
      <div style={{ height: 47 }} />
      <NavMenu />
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingRight: 250, padding: 10, marginBottom: 8, justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logoMini} alt="Logo mini" style={{ height: 36, marginRight: 8 }} />
            ENTRADA DE SOLICITUD DE REPORTES
          </span>
          <SearchBar
            filterField1={filterField1}
            filterValue1={filterValue1}
            onField1Change={handleField1Change}
            onValue1Change={handleValue1Change}
            filterField2={filterField2}
            filterValue2={filterValue2}
            onField2Change={handleField2Change}
            onValue2Change={handleValue2Change}
          />
        </div>
      </div>
      <div style={{ padding: '24px 20px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {filteredReports.map((report, idx) => (
          <Report
            key={report.id || idx}
            report={report}
            status={statuses[reports.indexOf(report)]}
            responseLevel={responseLevels[reports.indexOf(report)]}
            onChange={handleChange(reports.indexOf(report))}
            setStatus={setStatus}
            setResponseLevel={setResponseLevel}
            idx={reports.indexOf(report)}
          />
        ))}
      </div>
    </div>
  );
}

export default Reports;