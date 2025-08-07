
import React, { useEffect, useState } from 'react';
// import NavMenu eliminado, ahora está en HeadBrand
import HeadBrand from '../../components/headBrand';
import mockData from './mockData.json';
import { MdOutlineNoteAlt, MdOutlineHome } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';

const productosInventados = [
  {
    nombre: "MONITOR 24'' FULL HD, 60HZ, PANEL VA/IPS CON OJOS ANTIFATIGA",
    precio: 130
  },
  {
    nombre: "LOYITECH MK345",
    precio: 50
  },
  {
    nombre: "REPARACIÓN DE IMPRESORA EPSON L3110",
    precio: 80
  },
  {
    nombre: "TABLET PANTALLA REPUESTO",
    precio: 60
  }
];

const Payments = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    // Extraer reportes de dispositivos del mockData importado
    let idx = 0;
    const allReports = [];
    mockData.sedes.forEach(sede => {
      sede.oficinas.forEach(oficina => {
        oficina.dispositivos.forEach(dispositivo => {
          const producto = productosInventados[idx % productosInventados.length];
          allReports.push({
            id: idx + 1,
            nombre: dispositivo.usuario,
            cedula: dispositivo.cedula,
            cargo: dispositivo.cargo,
            departamento: dispositivo.departamento,
            oficina: oficina.nombre,
            dispositivo: dispositivo.id,
            producto: producto.nombre,
            precio: producto.precio,
            fecha: '01/05/2025',
          });
          idx++;
        });
      });
    });
    setReportes(allReports);
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f4f6fa', minHeight: '100vh' }}>
      <HeadBrand />
      {/* Elimino el espacio extra superior para que el navMenu quede más arriba */}
      {/* NavMenu ahora está dentro de HeadBrand */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginBottom: 24, marginTop: 90 }}>Presupuestos estimados</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          {reportes.map((r, i) => (
            <div key={r.id} style={{ background: '#f7f7fa', borderRadius: 24, boxShadow: '0 2px 12px #0002', padding: 28, minWidth: 380, maxWidth: 420, flex: '1 1 380px', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>
                <MdOutlineNoteAlt size={28} style={{ color: '#2f4b8b' }} />
                REPORTE #{r.id.toString().padStart(3, '0')}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <IoMdPerson size={22} style={{ color: '#2f4b8b' }} />
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>{r.nombre}</span>
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>{r.cedula}</span>
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>{r.cargo}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <MdOutlineHome size={20} style={{ color: '#2f4b8b' }} />
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>{r.departamento}</span>
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>{r.oficina}</span>
                <span style={{ background: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 500 }}>#{r.dispositivo}</span>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '10px 16px', fontWeight: 500, marginBottom: 10, fontSize: 15 }}>
                {r.producto}
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '8px 16px', fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#2f4b8b', width: 'fit-content' }}>
                ${r.precio}
              </div>
              <div style={{ background: '#e9ecf2', borderRadius: 12, padding: '8px 16px', fontWeight: 500, fontSize: 15, color: '#555', width: 'fit-content', marginLeft: 'auto', marginTop: 10 }}>
                FECHA {r.fecha}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
