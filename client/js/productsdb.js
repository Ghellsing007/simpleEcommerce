const apiUrl = "http://localhost:8080/products"; // URL de tu API

// Función para obtener productos desde la API
export async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error en la solicitud");

    const productos = await response.json(); // Obtiene los datos
    return productos; // Devuelve los datos para usarlos en otro archivo
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    throw error; // Reenvía el error para manejarlo donde se llame esta función
  }
}
