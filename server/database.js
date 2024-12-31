import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();


export async function getProducts() {
    const [rows] =  await pool.query(
        `
        SELECT * FROM products;

        `,
        
    );
    return rows;
    
}

export async function getProductID(id) {
    const [rows] =  await pool.query(
        `
        SELECT * FROM products WHERE id = ?

        `,
        [id]
    );
    return rows[0];
    
}


export async function createProduct(name, price, cant, img) {
    const [result] =  await pool.query(
        `
    INSERT INTO products (name, price, cant, img) 
    VALUES (?, ?, ?, ?)
        `,
        [name, price, cant, img]
    );
    const productID = result.insertId;
    return getProducts(productID);    
}


export async function deleteProduct(id) {
    // Ejecutar la consulta DELETE en la base de datos
    const [result] = await pool.query(
      `
      DELETE FROM products
      WHERE id = ?;
      `,
      [id]
    );
  
    // Retornar el número de filas afectadas
    return result.affectedRows;
  }


  export async function updateProduct(id, updates) {
    // Obtener los valores actuales del producto desde la base de datos
    const [currentProduct] = await pool.query(
      `
      SELECT * FROM products WHERE id = ?;
      `,
      [id]
    );
  
    if (currentProduct.length === 0) {
      throw new Error("Producto no encontrado.");
    }
  
    const existingProduct = currentProduct[0];
  
    // Usar los valores proporcionados en `updates` o mantener los valores actuales
    const name = updates.name ?? existingProduct.name;
    const price = updates.price ?? existingProduct.price;
    const cant = updates.cant ?? existingProduct.cant;
    const img = updates.img ?? existingProduct.img;
  
    // Actualizar el producto con los nuevos valores
    const [result] = await pool.query(
      `
      UPDATE products 
      SET name = ?, price = ?, cant = ?, img = ?
      WHERE id = ?;
      `,
      [name, price, cant, img, id]
    );
  
    // Retornar el producto actualizado
    return {
      id,
      name,
      price,
      cant,
      img
    };
  }
  
  