// Utilidad para validar correo con el JSON de prueba
export async function validarCorreo(correo) {
  try {
    const response = await fetch('/src/userPages/correos.json');
    const data = await response.json();
    return data.correosValidos.includes(correo);
  } catch (error) {
    return false;
  }
}
