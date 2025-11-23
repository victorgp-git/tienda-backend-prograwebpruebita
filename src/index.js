import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database.js";

import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint simple para probar Azure
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Base de datos conectada");

    app.listen(PORT, () =>
      console.log(`Backend escuchando en puerto ${PORT}`)
    );
  } catch (err) {
    console.error("Error al iniciar:", err);
  }
}

start();

