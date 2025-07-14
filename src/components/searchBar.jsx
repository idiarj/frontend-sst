import React from 'react';

function SearchBar({
  filterField1,
  filterValue1,
  onField1Change,
  onValue1Change,
  filterField2,
  filterValue2,
  onField2Change,
  onValue2Change,
}) {
  const renderInput = (field, value, onChange) => {
    if (field === 'fecha') {
      return (
        <input
          type="date"
          name="filterValue"
          value={value}
          onChange={onChange}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            border: '1px solid #ccc',
            width: 180,
          }}
        />
      );
    }

    return (
      <input
        type="text"
        name="filterValue"
        placeholder={`Buscar por ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        value={value}
        onChange={onChange}
        style={{
          padding: '4px 8px',
          borderRadius: 4,
          border: '1px solid #ccc',
          width: 200,
        }}
      />
    );
  };

  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        background: '#fff',
        padding: '12px 16px',
        borderRadius: 8,
        boxShadow: '0 1px 4px #0001',
        minWidth: 340,
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontWeight: 500 }}>Filtrar por:</label>
          <option value="fecha">Fecha</option>
 
        {renderInput(filterField1, filterValue1, onValue1Change)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontWeight: 500 }}></label>
        <select value={filterField2} onChange={onField2Change}>
          <option value="">-- Selecciona --</option>
          <option value="numero">N° Reporte</option>
          <option value="estado">Estado</option>
          <option value="cedula">Cédula</option>
        </select>
        {filterField2 && renderInput(filterField2, filterValue2, onValue2Change)}
      </div>
    </form>
  );
}

export default SearchBar;
