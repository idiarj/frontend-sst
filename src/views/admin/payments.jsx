import React, { useEffect, useState } from 'react';
import HeadBrand from '../../components/headBrand';
import mockData from './mockdata.json';
import { MdOutlineNoteAlt, MdOutlineHome } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';


const Payments = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    let idx = 0;
    const allReports = [];
    mockData.sedes.forEach(sede => {
      sede.oficinas.forEach(oficina => {
        oficina.dispositivos.forEach(dispositivo => {
          allReports.push({
            id: idx + 1,
            nombre: dispositivo.usuario,
            cedula: dispositivo.cedula,
            cargo: dispositivo.cargo,
            departamento: dispositivo.departamento,
            oficina: oficina.nombre,
            dispositivo: dispositivo.id,
            producto: dispositivo.productoNombre,
            precio: dispositivo.precio,
            fecha: dispositivo.fecha,
          });
          idx++;
        });
      });
    });
    setReportes(allReports);
  }, []);

  const [editIdx, setEditIdx] = useState(null);
  const [editValues, setEditValues] = useState({ producto: '', precio: '' });

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditValues({
      producto: reportes[idx].producto,
      precio: reportes[idx].precio
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'precio') {
      // Only allow numbers and dot
      const filtered = value.replace(/[^\d.]/g, '');
      setEditValues(prev => ({ ...prev, [name]: filtered }));
    } else {
      setEditValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = () => {
    setReportes(prev => prev.map((r, i) => i === editIdx ? { ...r, producto: editValues.producto, precio: editValues.precio } : r));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f4f6fa', minHeight: '100vh' }}>
      <HeadBrand />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginBottom: 24, marginTop: 90 }}>Presupuestos estimados</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          {reportes.map((r, i) => (
            <div key={r.id} style={{ position: 'relative', background: '#f7f7fa', borderRadius: 24, boxShadow: '0 2px 12px #0002', padding: 28, minWidth: 380, maxWidth: 420, flex: '1 1 380px', marginBottom: 24 }}>
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
                {editIdx === i ? (
                  <input name="producto" value={editValues.producto} onChange={handleEditChange} style={{ fontSize: 15, padding: '4px 8px', borderRadius: 8, border: '1px solid #ccc', width: '100%' }} />
                ) : (
                  r.producto
                )}
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '8px 16px', fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#2f4b8b', width: 'fit-content' }}>
                {editIdx === i ? (
                  <input name="precio" value={editValues.precio} onChange={handleEditChange} style={{ fontSize: 18, padding: '4px 8px', borderRadius: 8, border: '1px solid #ccc', width: '100px' }} />
                ) : (
                  `$${r.precio}`
                )}
              </div>
              <div style={{ background: '#e9ecf2', borderRadius: 12, padding: '8px 16px', fontWeight: 500, fontSize: 15, color: '#555', width: 'fit-content', marginLeft: 'auto', marginTop: 10 }}>
                FECHA {r.fecha}
              </div>
              {editIdx === i ? (
                <div style={{ position: 'absolute', left: 24, bottom: 24, display: 'flex', gap: 8 }}>
                  <button onClick={handleEditSave} style={{ background: '#2f4b8b', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Guardar</button>
                  <button onClick={handleEditCancel} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
                </div>
              ) : (
                <button onClick={() => handleEditClick(i)} style={{ position: 'absolute', left: 24, bottom: 24, background: '#2f4b8b', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Editar</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
