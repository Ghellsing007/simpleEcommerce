import express from "express";

import {
    getProductID,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    


} from "./database.js";
import cors from "cors";


const corsOptions = {
    origen: "http://127.0.0.1:5173",
    methods: ["POST, GET"],
    Credential: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/products", async (req, res) => {
    const todos = await getProducts(req);
    res.status(200).send(todos);
});

app.get("/product/:id", async (req, res) => {
    const todos = await getProductID(req.params.id);
    res.status(200).send(todos);
});

app.post("/product", async (req, res) => {
    const {id, name, price, cant, img} = req.body;
    const product = await createProduct(name, price, cant, img);    
    res.status(201).send(product);
});

app.delete("/product/:id", async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID desde los parámetros de la ruta
  
      // Llamar a la función deleteProduct con el ID
      const rowsDeleted = await deleteProduct(id);
  
      // Validar si se eliminó algún producto
      if (rowsDeleted === 0) {
        return res.status(404).send({ error: "Producto no encontrado." });
      }
  
      // Responder con un mensaje de éxito
      res.status(200).send({ message: "Producto eliminado exitosamente." });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al eliminar el producto." });
    }
  });

  app.put("/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Llamar a la función updateProduct con el ID y los valores a actualizar
      const updatedProduct = await updateProduct(id, updates);
  
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error(error);
  
      if (error.message === "Producto no encontrado.") {
        return res.status(404).send({ error: "Producto no encontrado." });
      }
  
      res.status(500).send({ error: "Error al actualizar el producto." });
    }
  });
  
  



app.listen(8080, () => {
    console.log("server running on port 8080");
});
