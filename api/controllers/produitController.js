var mongoose = require("mongoose"),
  Produit = mongoose.model("Produit");

exports.list_all_produit = function (req, res) {
  Produit.find({}, function (err, produit) {
    if (err) res.send(err);
    res.json(produit);
  });
};

exports.create_a_produit = function (req, res) {
  var new_produit = new Produit(req.body);
  new_produit.save(function (err, produit) {
    if (err) res.send(err);
    res.json(produit);
  });
};

exports.read_a_produit = function (req, res) {
  Produit.findById(req.params.produitId, function (err, produit) {
    if (err) res.send(err);
    res.json(produit);
  });
};

exports.read_a_produit_by_code = function (req, res) {
  Produit.find({ code: req.params.produitCode }, function (err, produit) {
    if (err) res.send(err);
    res.json(produit);
  });
};

exports.update_a_produit = function (req, res) {
  Produit.findOneAndUpdate(
    { _id: req.params.produitId },
    req.body,
    { new: true },
    function (err, produit) {
      if (err) res.send(err);
      res.json(produit);
    }
  );
};

exports.delete_a_produit = function (req, res) {
  Produit.remove(
    {
      _id: req.params.produitId,
    },
    function (err, produit) {
      if (err) res.send(err);
      res.json({ message: "Produit supprimé avec succès." });
    }
  );
};

//************************ TACHE 7 - update seulement la designation d'un produit par son code************************
exports.update_a_produit_by_code = function (req, res) {
  Produit.findOneAndUpdate(
    { code: req.params.produitCode },
    req.body,
    { new: true },
    function (err, produit) {
      if (err) {
        res.status(404).send({ message: "Product not found" });
      } else {
        res.status(200).send({
          message: "La m-a-j a été effectuée avec succès",
          updatedProduct: produit,
        });
      }
    }
  );
};

//************************ TACHE 8 - supprimer un produit par son code************************
//cette methode permet de faire dans un test le test post et le test delete, pour cela il faut d'abord
//faire un post pour ajouter un produit et ensuite faire un delete par son code pour supprimer le produit ajouté

exports.delete_a_produit_by_code = function (req, res) {
  Produit.remove(
    {
      code: req.params.produitCode,
    },
    function (err, produit) {
      if (err) res.send(err);
      res.json({ message: "Produit supprimé avec succès." });
    }
  );
};
