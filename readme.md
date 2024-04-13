# Projet Backend Mean - Version de Base

Ce projet est une version de base du backend pour le projet Mean. Il contient les fichiers nécessaires pour démarrer le développement.

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
