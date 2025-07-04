// Utilidad para cargar el mockReport.json
export async function fetchMockReport() {
  const response = await fetch('./mockReport.json');
  if (!response.ok) throw new Error('No se pudo cargar el mock de reporte');
  const data = await response.json();
  return data.reporte;
}
