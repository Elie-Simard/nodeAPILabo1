# Projet Backend Mean - Version de Base

Ce projet est un projet de base pour le backend de l'application de gestion de stock.

C'est un apio RESTful qui utilise Express.js et MongoDB.

Il contient les fonctionnalités de base pour la gestion des catégories et des produits.

## Présentation des fonctionnalités que j'ai implémentées

Tâches à Réaliser :

1. /categories/delete : Suppression en Lot de Catégories
   -> /categorieRoutes/ ligne 217

2. /categories/put : Mise à Jour en Lot de Catégories
   -> /categorieRoutes/ ligne 229

3. /categorie/search/{designation}: Recherche de Catégories par Désignation
   -> /categorieRoutes/ ligne 263

Fonctions personnalisées :

1. /categorie/filter/{letter} : Filtrage dont le code commence par une lettre donnée
   -> /categorieRoutes/ ligne 286

2. /categorie/get : Retourne une liste paginée de toutes les catégories.
   -> /categorieRoutes/ ligne 10

3. /produit/code/{produitCode}: update / delete le libellé d'un produit par son code
   -> /produitRoutes/ ligne 140

## Exécution des tests
![Screenshot 2024-04-13 at 1 14 35 PM](https://github.com/Elie-Simard/nodeAPILabo1/assets/104814268/30eefb44-7449-4780-8858-9e1c94e65f59)

J'ai utilisé chai pour les test. Vous pouvez exécuter les tests en utilisant la commande `npm test`. N'hésitez pas à exécuter cette commande plusieurs fois pour vérifier le bon fonctionnement de l'application.

## Exécution de l'application

node server.js
Swagger : http://localhost:3000/api-docs

## Tâches par fichier

Voici les tâches associées à chaque fichier :

- `server.js` : Configuration de l'application et gestion des routes. Point d'entrée de l'application.
- `routes/` : Définition des routes http pour chaque fonctionnalité.
- `controllers/` : Implémentation de la logique métier pour chaque fonctionnalité.
- `models/` : Définition des schémas de données pour chaque entité.
- `tests/` : Tests unitaires pour chaque fonctionnalité.
