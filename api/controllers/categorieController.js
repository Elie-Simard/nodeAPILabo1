var mongoose = require("mongoose"), //on importe le module mongoose pour pouvoir interagir avec la base de données et utiliser les schémas/methodes
  Categorie = mongoose.model("Categorie"); //on importe le modèle de données Categorie

const paginate = require("mongoose-paginate-v2").paginate; // Ajout de .paginate à l'import

exports.list_all_categorie = function (req, res) {
  Categorie.find({}, function (err, categorie) {
    if (err) res.send(err);
    res.json(categorie);
  });
};

exports.list_all_categorie_with_pagination = function (req, res) {
  var options = {
    page: req.query.page || 1, //NUMERO DE LA PAGE A AFFICHER
    limit: req.query.limit || 3, //objets par page
  };

  Categorie.paginate({}, options, function (err, categorie) {
    //{} signifie qu'on veut tous les objets de la collection
    //paginate prend en paramètre la requête de recherche, les options de pagination et une fonction de rappel
    //la fonction de rappel prend en paramètre une erreur et les objets trouvés
    if (err) res.send(err);
    res.json(categorie);
  });
};

exports.create_a_categorie = function (req, res) {
  // la req ne contient pas de paramètres, mais le corps de la requête contient les données de la catégorie à créer, qui va etre ici req.body
  var new_categorie = new Categorie(req.body);
  new_categorie.save(function (err, categorie) {
    if (err) res.send(err);
    res.json(categorie);
  });
};

exports.read_a_categorie = function (req, res) {
  Categorie.findById(req.params.categorieId, function (err, categorie) {
    if (err) res.send(err);
    res.json(categorie);
  });
};

exports.update_a_categorie = function (req, res) {
  Categorie.findOneAndUpdate(
    { _id: req.params.categorieId },
    req.body,
    { new: true },
    function (err, categorie) {
      if (err) {
        res.status(404).send(err);
      } else {
        res
          .status(200)
          .send({ message: "La m-a-j a été effectuée avec succès" });
      }
    }
  );
};

exports.delete_a_categorie = function (req, res) {
  Categorie.remove(
    {
      _id: req.params.categorieId,
    },
    function (err, categorie) {
      if (err) res.send(err);
      res.json({ message: "Categorie successfully deleted" });
    }
  );
};

// supprimer toutes les catégories avec une seule requête
exports.delete_all_categories = function (req, res) {
  Categorie.deleteMany({}, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res
        .status(200)
        .send({ message: "Toutes les catégories ont été DELETE." });
    }
  });
};

//TACHE 1 - insertion multiple

exports.create_many_categories = function (req, res) {
  // req.body should be an array of category objects
  let categoryArray = req.body;

  // Check if the input is an array
  if (!Array.isArray(categoryArray)) {
    return res
      .status(400)
      .send({ message: "Input should be an array of categories" });
  }

  // Insert multiple documents using insertMany
  Categorie.insertMany(categoryArray, function (err, categories) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(categories);
    }
  });
};

//TACHE 2 - Mise à jour multiple
exports.bulk_update_categories = function (req, res) {
  let categoryArray = req.body;

  if (!Array.isArray(categoryArray)) {
    return res
      .status(400)
      .send({ message: "L'entrée doit être un tableau de catégories" });
  }

  // Map each category to a promise that resolves when the update is finished
  let updatePromises = categoryArray.map((category) => {
    return Categorie.findByIdAndUpdate(
      category._id,
      { code: category.code, designation: category.designation },
      { new: true }
    ).exec(); // exec() returns a promise
  });

  // Wait for all updates to complete
  Promise.all(updatePromises)
    .then(() => {
      res.status(200).send("Catégories mises à jour avec succès."); // Envoie seulement le message
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// TACHE 3 - Recherche par désignation
exports.search_by_designation = function (req, res) {
  //on utilise findOne au lieu de find pour obtenir un seul document
  Categorie.findOne(
    { designation: req.params.designation },
    function (err, categorie) {
      if (err) {
        res.status(500).send(err);
      } else if (!categorie) {
        res.status(404).send({
          message: "Aucune catégorie trouvée avec cette désignation",
        });
      } else {
        res.status(200).json(categorie); //on renvoie directement l'objet catégorie trouvé
      }
    }
  );
};

// TACHE 4 - Filtrage dont le code commence par une lettre donnée
exports.filter_by_code = function (req, res) {
  Categorie.find(
    { code: { $regex: "^" + req.params.letter, $options: "i" } },
    function (err, categorie) {
      // $regex est un opérateur de requête qui permet de chercher des documents qui correspondent à une expression régulière
      // '^' signifie que le code doit commencer par la lettre donnée
      // $options: 'i' signifie que la recherche est insensible à la casse
      if (err) {
        req.status(404).send(err);
        res
          .status(404)
          .send({ message: "Aucune catégorie trouvée avec ce code" });
      } else {
        res.status(200).json(categorie);
      }
    }
  );
};
