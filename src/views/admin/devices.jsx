import React, { useState } from 'react';
import HeadBrand from '../../components/headBrand';
import NavMenu from '../../components/navMenu';
import Report from '../../components/report';
import mockData from './mockData.json';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaBuilding, FaLaptop } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

// Icono personalizado para Leaflet
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const containerStyle = { width: '100%', height: '400px' };

function Devices() {
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedDispositivo, setSelectedDispositivo] = useState(null);
  const [showDiagram, setShowDiagram] = useState(false);

  const handleSedeClick = (sede) => {
    setSelectedSede(sede);
    setSelectedDispositivo(null);
  };

  const handleDispositivoClick = (dispositivo) => {
    setSelectedDispositivo(dispositivo);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeadBrand />
      <div style={{ height: 47 }} />
      <NavMenu />

      <div style={{ display: 'flex', padding: 20, gap: 20 }}>
        {/* Menú lateral izquierdo */}
        <div style={{ width: 220, background: '#183d6a', color: '#fff', padding: 10, borderRadius: 8 }}>
          <strong>Sedes</strong>
          {mockData.sedes.map((sede) => (
            <div key={sede.id}>
              <button onClick={() => handleSedeClick(sede)} style={{ background: 'transparent', color: '#fff', border: 'none' }}>
                {sede.nombre}
              </button>
              <ul>
                {sede.oficinas.map((ofi) => (
                  <li key={ofi.id}>
                    {ofi.nombre}
                    <ul>
                      {ofi.dispositivos.map((dev) => (
                        <li key={dev.id}>
                          <button onClick={() => handleDispositivoClick(dev)} style={{ fontSize: 12 }}>{dev.nombre}</button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Centro: mapa o diagrama */}
        <div style={{ flex: 1 }}>
          {showDiagram ? (
            <div style={{ padding: 20, background: '#fff', borderRadius: 8 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {mockData.sedes.map((sede) => (
                  <div key={sede.id}>
                    <MdLocationCity size={40} />
                    <div style={{ fontWeight: 'bold' }}>{sede.nombre}</div>
                    {sede.oficinas.map((ofi) => (
                      <div key={ofi.id}>
                        <FaBuilding size={30} />
                        <div>{ofi.nombre}</div>
                        {ofi.dispositivos.map((dev) => (
                          <div key={dev.id} onClick={() => handleDispositivoClick(dev)} style={{ cursor: 'pointer', marginLeft: 20 }}>
                            <FaLaptop size={20} /> {dev.nombre}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <MapContainer center={{ lat: 10.6545, lng: -71.6406 }} zoom={10} style={containerStyle}>
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mockData.sedes.map((sede) => (
                <Marker
                  key={sede.id}
                  position={{ lat: sede.lat, lng: sede.lng }}
                  icon={defaultIcon}
                  eventHandlers={{
                    click: () => handleSedeClick(sede),
                  }}
                >
                  <Popup>{sede.nombre}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <button onClick={() => setShowDiagram(!showDiagram)} style={{ marginTop: 10 }}>
            {showDiagram ? 'Ver en Mapa' : 'Ver en Diagrama'}
          </button>
        </div>

        {/* Panel derecho: Reporte */}
        <div style={{ width: 350 }}>
          {selectedDispositivo ? (
            <Report report={selectedDispositivo} />
          ) : (
            <div style={{ padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 6px #ccc' }}>
              <h3>Seleccione un dispositivo</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devices;
