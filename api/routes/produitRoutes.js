var cors = require("cors");

module.exports = function (app) {
  var produit = require("../controllers/produitController");
  app.use(cors());

  /**
   * @openapi
   * /produit:
   *   get:
   *     description: Retourne une liste de tous les produits.
   *     responses:
   *       200:
   *         description: Une liste de produits.
   *   post:
   *     description: Crée un nouveau produit.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               code:
   *                 type: string
   *                 description: Code du produit.
   *               libelle:
   *                 type: string
   *                 description: Libellé du produit.
   *               prix:
   *                 type: number
   *                 description: Prix du produit.
   *               categories:
   *                 type: string
   *                 description: Catégorie du produit.
   *     responses:
   *       '201':
   *         description: Produit créé avec succès.
   *       '400':
   *         description: Erreur lors de la création du produit.
   */
  app
    .route("/produit")
    .get(produit.list_all_produit)
    .post(produit.create_a_produit);

  /**
   * @openapi
   * /produit/{produitId}:
   *   get:
   *     description: Retourne un produit spécifique.
   *     parameters:
   *       - in: path
   *         name: produitId
   *         schema:
   *           type: string
   *         required: true
   *         description: Identifiant du produit.
   *     responses:
   *       200:
   *         description: Un produit.
   *       404:
   *         description: Aucun produit trouvé avec cet identifiant.
   *   put:
   *     description: Met à jour un produit spécifique.
   *     parameters:
   *       - in: path
   *         name: produitId
   *         schema:
   *           type: string
   *         required: true
   *         description: Identifiant du produit.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               code:
   *                 type: string
   *                 description: Nouveau code du produit.
   *               libelle:
   *                 type: string
   *                 description: Nouveau libellé du produit.
   *               prix:
   *                 type: number
   *                 description: Nouveau prix du produit.
   *               categories:
   *                 type: string
   *                 description: Nouvelle catégorie du produit.
   *     responses:
   *       '200':
   *         description: Produit mis à jour avec succès.
   *       '404':
   *         description: Aucun produit trouvé avec cet identifiant.
   *       '400':
   *         description: Erreur lors de la mise à jour du produit.
   *   delete:
   *     description: Supprime un produit spécifique.
   *     parameters:
   *       - in: path
   *         name: produitId
   *         schema:
   *           type: string
   *         required: true
   *         description: Identifiant du produit.
   *     responses:
   *       '200':
   *         description: Produit supprimé avec succès.
   *       '404':
   *         description: Aucun produit trouvé avec cet identifiant.
   *       '400':
   *         description: Erreur lors de la suppression du produit.
   */
  app
    .route("/produit/:produitId")
    .get(produit.read_a_produit)
    .put(produit.update_a_produit)
    .delete(produit.delete_a_produit);

  /**
   * @openapi
   * /produit/code/{produitCode}:
   *   get:
   *     description: Retourne un produit spécifique par son code.
   *     parameters:
   *       - in: path
   *         name: produitCode
   *         schema:
   *           type: string
   *         required: true
   *         description: Code du produit.
   *     responses:
   *       200:
   *         description: Un produit.
   */
  app.route("/produit/code/:produitCode").get(produit.read_a_produit_by_code);

  //* TACHE 6 - fonctionnalité perso 3 / 4 update / delete le libellé d'un produit par son code
  /**
   * @openapi
   * components:
   *   schemas:
   *     Produit:
   *       type: object
   *       properties:
   *         code:
   *           type: string
   *           description: Code du produit.
   *         libelle:
   *           type: string
   *           description: Libellé du produit.
   * /produit/code/{produitCode}:
   *   put:
   *     description: Met à jour le libellé d'un produit spécifique par son code.
   *     parameters:
   *       - in: path
   *         name: produitCode
   *         schema:
   *           type: string
   *         required: true
   *         description: Code du produit.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               libelle:
   *                 type: string
   *                 description: Nouveau libellé du produit.
   *     responses:
   *       '200':
   *         description: Produit mis à jour avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produit'
   *       '404':
   *         description: Aucun produit trouvé avec ce code.
   *       '400':
   *         description: Erreur lors de la mise à jour du produit.
   *       '500':
   *         description: Erreur serveur.
   *   delete:
   *     description: Supprime un produit spécifique par son code.
   *     parameters:
   *       - in: path
   *         name: produitCode
   *         schema:
   *           type: string
   *         required: true
   *         description: Code du produit.
   *     responses:
   *       '200':
   *         description: Produit supprimé avec succès.
   *       '404':
   *         description: Aucun produit trouvé avec ce code.
   *       '400':
   *         description: Erreur lors de la suppression du produit.
   *       '500':
   *         description: Erreur serveur.
   */
  app
    .route("/produit/code/:produitCode")
    .put(produit.update_a_produit_by_code)
    .delete(produit.delete_a_produit_by_code);
};
