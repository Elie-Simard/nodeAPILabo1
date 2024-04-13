const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Produits", () => {
  // Test 1
  describe("/GET produit", () => {
    it("it should GET all the produits", (done) => {
      chai
        .request(server)
        .get("/produit")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  // Test 2
  describe("/POST produit", () => {
    it("it should POST a produit ", (done) => {
      chai
        .request(server)
        .post("/produit")
        .send({
          code: "ELEC12",
          libelle: "IPHONE 16 PRO MAX",
          prix: 1000,
          categories: "661aaaa7c19e6a7cd2470aec",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("code").eql("ELEC12");
          res.body.should.have.property("libelle").eql("IPHONE 16 PRO MAX");
          res.body.should.have.property("prix").eql(1000);
          res.body.should.have
            .property("categories")
            .eql("661aaaa7c19e6a7cd2470aec");
          done();
        });
    });
  });

  // TEST 3
  describe("/GET/:id produit", () => {
    it("it should GET a produit by the given id", (done) => {
      chai
        .request(server)
        .get("/produit/661993636e6b1990e48d1c97")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // TEST 4
  describe("/PUT/:id produit", () => {
    it("it should UPDATE a produit given the id", (done) => {
      const updatedProduct = {
        //storing dans une variable pour plus de clarté
        code: "ELEC123",
        libelle: "IPHONE 15 PRO MAX TEST",
        prix: 1000,
        categories: "661aaaa7c19e6a7cd2470aec",
      };

      chai
        .request(server)
        .put("/produit/661993636e6b1990e48d1c97")
        .send(updatedProduct)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("code").eql(updatedProduct.code);
          res.body.should.have.property("libelle").eql(updatedProduct.libelle);
          res.body.should.have.property("prix").eql(updatedProduct.prix);
          res.body.should.have
            .property("categories")
            .eql(updatedProduct.categories);
          done();
        });
    });
  });

  // TEST 5 //delete le produit que l'on vient de créer au test 2, ainsi, on peut refaire npm test autant de fois que l'on veut
  describe("/DELETE/code/:produitCode produit", () => {
    it("it should DELETE a produit given the code", (done) => {
      const productCode = "ELEC12"; //storing dans une variable

      chai
        .request(server)
        .delete(`/produit/code/${productCode}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Produit supprimé avec succès.");
          done();
        });
    });
  }); //closing test 5

  // TEST 6 //    Met à jour le libellé d'un produit spécifique par son code.
  describe("/PUT/code/:produitCode produit", () => {
    it("it should UPDATE a produit given the code", (done) => {
      const updatedProduct = {
        //storing dans une variable pour plus de clarté
        libelle: "IPHONE 15 PRO MAX TEST2",
      };

      chai
        .request(server)
        .put("/produit/code/ELEC123")
        .send(updatedProduct)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("La m-a-j a été effectuée avec succès");
          res.body.should.have.property("updatedProduct");
          done();
        });
    });
  }); //closing test 6
}); //closing file
