import React from 'react';

function SearchBar({ filters, onChange }) {
  return (
    <form style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fff', padding: '10px 16px', borderRadius: 8, boxShadow: '0 1px 4px #0001' }}>
      <input
        type="text"
        name="fecha"
        placeholder="Fecha"
        value={filters.fecha}
        onChange={onChange}
        style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: 90 }}
      />
      <input
        type="text"
        name="numero"
        placeholder="N° Reporte"
        value={filters.numero}
        onChange={onChange}
        style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: 90 }}
      />
      <input
        type="text"
        name="estado"
        placeholder="Estado"
        value={filters.estado}
        onChange={onChange}
        style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: 90 }}
      />
      <input
        type="text"
        name="cedula"
        placeholder="Cédula"
        value={filters.cedula}
        onChange={onChange}
        style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: 90 }}
      />
    </form>
  );
}

export default SearchBar;