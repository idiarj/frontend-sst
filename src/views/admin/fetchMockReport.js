// Utilidad para cargar el mockdata.json
export async function fetchMockReport() {
  const response = await fetch('./mockdata.json');
  if (!response.ok) throw new Error('No se pudo cargar el mock de reporte');
  const data = await response.json();
  return data.reporte;
}
