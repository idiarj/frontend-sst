// Utilidad para cargar el JSON de cédulas válidas
export async function validarCedula(cedula) {
  try {
    const response = await fetch('/src/userPages/cedulas.json');
    const data = await response.json();
    return data.cedulasValidas.includes(cedula);
  } catch (error) {
    return false;
  }
}
