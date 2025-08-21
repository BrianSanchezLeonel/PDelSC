const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

class CZooAnimal {
  constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
    this.IdAnimal = IdAnimal;
    this.nombre = nombre;
    this.JaulaNumero = JaulaNumero;
    this.IdTypeAnimal = IdTypeAnimal;
    this.peso = peso;
  }
}

const zooAnimals = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  let resultados = {};

  if (zooAnimals.length > 0) {
    resultados.jaula5Menor3 = zooAnimals.filter(
      (a) => a.JaulaNumero === 5 && a.peso < 3
    ).length;

    resultados.felinosEntre2y5 = zooAnimals.filter(
      (a) => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5
    ).length;

    const animalJaula4 = zooAnimals.find(
      (a) => a.JaulaNumero === 4 && a.peso < 120
    );
    resultados.animalJaula4 = animalJaula4 ? animalJaula4.nombre : "Ninguno";
  }

  res.render("index", { zooAnimals, resultados });
});

app.post("/agregar", (req, res) => {
  const { idAnimal, nombre, jaulaNumero, idTypeAnimal, peso } = req.body;

  const nuevoAnimal = new CZooAnimal(
    parseInt(idAnimal),
    nombre,
    parseInt(jaulaNumero),
    parseInt(idTypeAnimal),
    parseFloat(peso)
  );

  zooAnimals.push(nuevoAnimal);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});