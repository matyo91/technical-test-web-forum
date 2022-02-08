# Test technique

## But

Créer un service web de discussion et de commentaires d’articles.

## Fonctionnalités

Les fonctionnalités attendus sont les suivantes :
- Pouvoir instancier le service de commentaires sur n’importe quelle page 
- Consulter la liste des commentaires et les réponses aux commentaires 
- Poster un commentaire 
- Poster une réponse a un commentaire 
- Créer un système de notation des commentaire 
- Sécuriser le formulaire de post de commentaires contre les robots 
- S’authentifier via Facebook et/ou Google
- Mettre en place un système d’autorisation sur les API
      
Les pages attendues sont :
- Une page d’accueil qui affichera un bloc contenant les derniers commentaires
- Une page qui s’appelle page1 qui affiche un texte suivi de son fil de commentaires 
- Une page qui s’appelle page2 qui affiche un texte suivi de son fil de commentaires 

## Détail technique

Vous avez deux options, la première est de créer une API serverless avec lambda et la deuxième de faire un projet Symfony.

### Option1: AWS Lambda

1. Créer une lambda et une ApiGateway pour la gestion des commentaires.
2. Créer une index.html pour la page d’accueil
    1. Créer le bloc commentaire
    2. Faire un appel en javascript pour récupérer les derniers commentaires postés
3. Créer deux pages articles et son bloc commentaire associé
    1. Créer article1.html + script javascript pour récupérer les commentaires de la page
    2. Créer article2.html + script javascript pour récupérer les commentaires de la page

### Option 2: PHP Symfony

1. Créer une api permettant de gérer les commentaires
2. Créer un front permettant d’afficher une page d’accueil et les articles
    1. Créer une page d’accueil
    2. Créer une route pour les articles

## Livrable

L’ensemble du code produit devra être posté sur un GitHub