var cors = require("cors");

module.exports = function (app) {
  var categorie = require("../controllers/categorieController");
  app.use(cors());

  //ATTENTION la derniere fonction perso se trouve dans produitRoutes.js ligne 140

  // ********************************* /categorie -> get/post/put -> general  **********************************
  // ********************************* TACHE 5 - 2e fonctionnalité perso Pagination  **********************************
  /**
   * @openapi
   * /categorie:
   *   get:
   *     description: Retourne une liste paginée de toutes les catégories.
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Le numéro de la page à afficher.
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Le nombre d'objets par page.
   *     responses:
   *       200:
   *         description: Une liste paginée de catégories.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 docs:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Categorie'
   *                 totalDocs:
   *                   type: integer
   *                 limit:
   *                   type: integer
   *                 totalPages:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 pagingCounter:
   *                   type: integer
   *                 hasPrevPage:
   *                   type: boolean
   *                 hasNextPage:
   *                   type: boolean
   *                 prevPage:
   *                   type: integer
   *                   nullable: true
   *                 nextPage:
   *                   type: integer
   *                   nullable: true
   */
  app
    .route("/categorie")
    .get(categorie.list_all_categorie_with_pagination)
    /**
     * @openapi
     * /categorie:
     *   post:
     *     description: Crée une nouvelle catégorie.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               code:
     *                 type: string
     *                 description: Code de la catégorie.
     *               designation:
     *                 type: string
     *                 description: Désignation de la catégorie.
     *     responses:
     *       200:
     *         description: Catégorie créée avec succès.
     */
    .post(categorie.create_a_categorie);

  // ********************************* /categorie/{categorieId} -> get/put/delete  **********************************
  /**
   * @openapi
   * /categorie/{categorieId}:
   *   get:
   *     description: Retourne une catégorie spécifique par son ID.
   *     parameters:
   *       - in: path
   *         name: categorieId
   *         required: true
   *         description: ID de la catégorie à retrouver.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Une catégorie spécifique.
   */
  app
    .route("/categorie/:categorieId")
    .get(categorie.read_a_categorie)
    /**
     * @openapi
     * /categorie/{categorieId}:
     *   put:
     *     description: Met à jour une catégorie spécifique par son ID.
     *     parameters:
     *       - in: path
     *         name: categorieId
     *         required: true
     *         description: ID de la catégorie à mettre à jour.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               code:
     *                 type: string
     *                 description: Code de la catégorie.
     *               designation:
     *                 type: string
     *                 description: Désignation de la catégorie.
     *     responses:
     *       200:
     *         description: Catégorie mise à jour avec succès.
     */
    .put(categorie.update_a_categorie) // donc il va chercher la fonction update_a_categorie dans le fichier categorieController.js
    /**
     * @openapi
     * /categorie/{categorieId}:
     *   delete:
     *     description: Supprime une catégorie spécifique par son ID.
     *     parameters:
     *       - in: path
     *         name: categorieId
     *         required: true
     *         description: ID de la catégorie à supprimer.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Catégorie supprimée avec succès.
     */
    .delete(categorie.delete_a_categorie);

  // ********************************* /categories -> get/put/post/delete  **********************************
  /**
   * @openapi
   * /categories:
   *   post:
   *     description: Crée plusieurs catégories.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: Code de la catégorie.
   *                 designation:
   *                   type: string
   *                   description: Désignation de la catégorie.
   *     responses:
   *       201:
   *         description: Catégories créées avec succès.
   */
  app
    .route("/categories")

    .post(categorie.create_many_categories) // insertion multiple
    /**
     * @openapi
     * components:
     *   schemas:
     *     Categorie:
     *       type: object
     *       properties:
     *         code:
     *           type: string
     *           description: Code de la catégorie.
     *         designation:
     *           type: string
     *           description: Désignation de la catégorie.
     * /categories:
     *   get:
     *     description: Retourne une liste de toutes les catégories (sans pagination).
     *     responses:
     *       200:
     *         description: Une liste de catégories.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 docs:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Categorie'
     *                 totalDocs:
     *                   type: integer
     */
    .get(categorie.list_all_categorie)

    // ********************************** TACHE 1 - Suppression multiple DANGER TESTING **********************************
    /**
     * @openapi
     * /categories:
     *   delete:
     *     description: Supprime toutes les catégories.
     *     responses:
     *       200:
     *         description: Toutes les catégories ont été DELETE.
     */
    .delete(categorie.delete_all_categories)

    // ********************************** TACHE 2 - Mise à jour multiple **********************************
    /**
     * @openapi
     * /categories:
     *   put:
     *     description: Met à jour plusieurs catégories selon leur identifiant.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: object
     *               properties:
     *                 _id:
     *                   type: string
     *                   description: Identifiant de la catégorie à mettre à jour.
     *                 code:
     *                   type: string
     *                   description: Nouveau code de la catégorie.
     *                 designation:
     *                   type: string
     *                   description: Nouvelle désignation de la catégorie.
     *     responses:
     *       '200':
     *         description: Catégories mises à jour avec succès.
     *       '404':
     *         description: Aucune catégorie trouvée avec cet identifiant.
     *       '500':
     *         description: Erreur lors de la mise à jour des catégories.
     */
    .put(categorie.bulk_update_categories);

  //********************************TACHE 3 - Recherche par désignation ********************************
  /**
   * @openapi
   * /categorie/search/{designation}:
   *   get:
   *     description: Recherche une catégorie par désignation.
   *     parameters:
   *       - in: path
   *         name: designation
   *         required: true
   *         description: Désignation de la catégorie à rechercher.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Catégorie trouvée avec succès.
   *       404:
   *         description: Aucune catégorie trouvée avec cette désignation.
   */
  app
    .route("/categorie/search/:designation")
    .get(categorie.search_by_designation);

  //********************************TACHE 4 - first fonctionnalité perso: Filtrage dont le code commence par une lettre donnée ********************************
  /**
   * @openapi
   * /categorie/filter/{letter}:
   *   get:
   *     description: Retourne une liste de catégories dont le code commence par une lettre donnée.
   *     parameters:
   *       - in: path
   *         name: letter
   *         required: true
   *         description: Lettre de début du code de la catégorie à rechercher.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Une liste de catégories trouvées.
   *       404:
   *         description: Aucune catégorie trouvée avec cette lettre.
   */
  app.route("/categorie/filter/:letter").get(categorie.filter_by_code);
};
