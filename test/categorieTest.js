const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Categorie", () => {
  //TEST 1 //liste paginée des catégories / tache 5
  describe("/GET categorie", () => {
    it("it should GET all the categories with pagination", (done) => {
      chai
        .request(server)
        .get("/categorie")
        .query({ page: 1, limit: 10 }) // add query parameters here
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("docs");
          res.body.docs.should.be.a("array");
          res.body.should.have.property("totalDocs");
          res.body.should.have.property("limit");
          res.body.should.have.property("totalPages");
          res.body.should.have.property("page");
          res.body.should.have.property("pagingCounter");
          res.body.should.have.property("hasPrevPage");
          res.body.should.have.property("hasNextPage");
          res.body.should.have.property("prevPage");
          res.body.should.have.property("nextPage");
          done();
        });
    });
  }); //fin du test 1

  // //TEST DANGER //insertion multiple
  // describe("/POST categories", () => {
  //   it("it should POST multiple categories", (done) => {
  //     let categories = [
  //       { code: "ELEC", designation: "Electronique TEST" },
  //       { code: "CLOTH", designation: "Vetements" },
  //       { code: "HOUSE", designation: "Articles Menagers" },
  //       { code: "TOYS", designation: "Jouets" },
  //       { code: "BOOKS", designation: "Livres" },
  //       { code: "FOOD", designation: "Aliments" },
  //       { code: "SPORT", designation: "Articles de sport" },
  //       { code: "TECH", designation: "Technologie" },
  //       { code: "BEAUTY", designation: "Article de beaute" },
  //     ];
  //     chai
  //       .request(server)
  //       .post("/categories") // adjusted endpoint
  //       .send(categories)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a("array");
  //         res.body.length.should.be.eql(categories.length);
  //         done();
  //       });
  //   });
  // }); //fin du test 2

  // //TEST DANGER // SUPPRIMER TOUTES LES CATEGORIES
  // describe("/DELETE categories", () => {
  //   it("it should DELETE all categories", (done) => {
  //     chai
  //       .request(server)
  //       .delete("/categories") // adjusted endpoint
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have
  //           .property("message")
  //           .eql("Toutes les catégories ont été DELETE.");
  //         done();
  //       });
  //   });
  // }); //fin du test 3

  // //TEST 0 //insertion multiple //REDO POUR REINSERER LES CATEGORIES APRES LES AVOIR SUPPRIMER - ATTENTION CELA CHANGERA LES ID
  // describe("/POST categories", () => {
  //   it("it should POST multiple categories", (done) => {
  //     let categories = [
  //       { code: "ELEC", designation: "Electronique TEST" },
  //       { code: "CLOTH", designation: "Vetements" },
  //       { code: "HOUSE", designation: "Articles Menagers" },
  //       { code: "TOYS", designation: "Jouets" },
  //       { code: "BOOKS", designation: "Livres" },
  //       { code: "FOOD", designation: "Aliments" },
  //       { code: "SPORT", designation: "Articles de sport" },
  //       { code: "TECH", designation: "Technologie" },
  //       { code: "BEAUTY", designation: "Article de beaute" },
  //     ];
  //     chai
  //       .request(server)
  //       .post("/categories") // adjusted endpoint
  //       .send(categories)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a("array");
  //         res.body.length.should.be.eql(categories.length);
  //         done();
  //       });
  //   });
  // }); //fin des test 0

  //TEST 2 //Mise à jour multiple
  describe("/PUT categories", () => {
    it("it should PUT (update) multiple categories", (done) => {
      let categoriesToUpdate = [
        {
          _id: "661aaaa7c19e6a7cd2470aec",
          code: "ELEC_NEW",
          designation: "Electronique NEW",
        },
        {
          _id: "661aaaa7c19e6a7cd2470aed",
          code: "CLOTH_NEW",
          designation: "Vetements NEW",
        },
      ];
      chai
        .request(server)
        .put("/categories")
        .send(categoriesToUpdate)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal("Catégories mises à jour avec succès."); // Vérifie le contenu du message
          done();
        });
    });
  });

  //TEST 3 //Recherche par designation
  describe("/GET categories", () => {
    it("it should GET a category by the given designation", (done) => {
      chai
        .request(server)
        .get("/categorie/search/Jouets")
        .end((err, res) => {
          res.should.have.status(200); // Vérifie le code d'état 200
          res.body.should.be.a("object"); // Vérifie que la réponse est un objet JSON
          done();
        });
    });
  });

  // TACHE 4 - Filtrage dont le code commence par une lettre donnée
  describe("/GET categories", () => {
    it("it should return categories whose code starts with a given letter", (done) => {
      chai
        .request(server)
        .get("/categorie/filter/E")
        .end((err, res) => {
          res.should.have.status(200); // Vérifie le code d'état 200
          res.body.should.be.a("array"); // Vérifie que la réponse est un tableau
          // Vérifie le contenu des catégories retournées
          res.body.forEach((categorie) => {
            chai.expect(categorie.code).to.match(/^E/i); // Utilisation de l'expression régulière pour vérifier le début du code
          });
          done();
        });
    });
  }); //fin du test 4
}); //fin du file (describe Categorie`)
