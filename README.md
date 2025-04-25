
# DevBook – Abdelali Latifi

## 🎯 Contexte du projet

**DevBook** est une application web développée dans le but d’offrir aux développeurs un outil simple et efficace pour gérer leur collection de livres techniques. Ce projet met l'accent sur la structuration orientée objet, la manipulation de données et la conception d’une interface dynamique.

---

## ⚙️ Fonctionnalités principales

- Ajout, modification et suppression de livres.
- Organisation des livres par catégories.
- Suivi du statut de lecture (non commencé, en cours, terminé).
- Recherche et tri personnalisés.
- Affichage dynamique avec pagination.
- Sauvegarde des données en base SQL.
- Backend développé en Node.js avec Express.js.
- Programmation orientée objet avec des classes JavaScript.

---

## 🧰 Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript natif  
- **Backend** : Node.js, Express.js  
- **Base de données** : MySQL  
- **Autres outils** : PHP (pour l'interaction avec la BDD dans certaines parties)

---

## 🚀 Installation & Lancement

### 1. Prérequis

Assurez-vous d’avoir les outils suivants :

- Un environnement local avec Apache et MySQL (ex : XAMPP, WAMP ou MAMP)
- PHP ≥ 7.4
- Git

### 2. Clonage du projet

```bash
git https://github.com/Youcode-Classe-E-2024-2025/abdelali_latifi_DevBook.git
```

### 3. Configuration

#### Serveur local

- Lancez Apache et MySQL via XAMPP ou équivalent.
- Placez les fichiers du projet dans le répertoire `htdocs` (ou équivalent).

#### Base de données

- Créez une base de données nommée `devbook` via phpMyAdmin.
- Importez le fichier SQL fourni (ou créez une structure simple si le fichier est absent).

#### Connexion à la BDD

Ouvrez le fichier `database.js` et vérifiez les informations de connexion :

```js
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "devbook";
```

### 4. Lancer le projet

- Démarrez les serveurs Apache et MySQL.
- Rendez-vous sur `http://localhost` dans votre navigateur pour accéder à l’application.

---

## 🧪 Fonctionnalités dynamiques

- Formulaires interactifs gérés en PHP et JavaScript.
- Connexion à la base de données pour stockage et lecture.
- Style personnalisé avec animations via CSS et JavaScript.

---

## 🛠️ Outils principaux

- **Apache** : pour l’hébergement local
- **MySQL** : stockage des données utilisateurs et livres
- **Express.js & Node.js** : logique côté serveur
- **HTML / CSS / JS** : pour l’interface utilisateur

---

N’hésite pas à me contacter pour toute remarque ou contribution.  
Projet réalisé avec passion par **Abdelali Latifi** ✨
