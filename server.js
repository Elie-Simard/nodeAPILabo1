var express = require("express");
var app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerConfig = require("./swaggerConfig");

var port = process.env.PORT || 3000;
var mongoose = require("mongoose");

var Categorie = require("./api/models/CategorieModel");
var Produit = require("./api/models/ProduitModel");

var bodyParser = require("body-parser"); //body-parser est un middleware qui permet de parser/extraire les données du corps de la requête

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/GestProdDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerSpec = swaggerJSDoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var categorieRoute = require("./api/routes/categorieRoutes");
var produitRoute = require("./api/routes/produitRoutes");

categorieRoute(app);
produitRoute(app);

var server = app.listen(port, function () {
  console.log("Gestion Produit RESTful API server started on: " + port);
});

module.exports = server; // export server
