# Paris Yum 三羊开泰 — Site vitrine (une page)

Site web moderne **sur une seule page** pour le restaurant asiatique & chinois **Paris Yum**
(21 rue Bleue, 75009 Paris). Sans commande en ligne.

## Sections (une seule page, navigation par ancres)

- **Accueil** — hero plein écran avec l'image de couverture
- **À propos** — présentation + équipements (barbecue, karaoké, climatisation, WiFi, événements privés, animaux, à emporter, livraison)
- **Nos Plats** — grand slider d'images de plats signature (défilement auto, flèches, points) — photos reprises du site officiel
- **La carte** — menu typographique élégant par catégories (onglets) : nom + **nom chinois**, description, prix, badges 🌶️/★ — *affichage seul, pas de commande*
- **Réservation** — formulaire (confirmation par téléphone / message WhatsApp)
- **Infos & accès** — horaires (jour du jour mis en avant), coordonnées, e-mail, **Google Maps**

Responsive (menu burger mobile), barre de navigation qui suit la section visible, animations au défilement.

## Infos du restaurant (source : paris-yum.eatbu.com)

- **Adresse** : 44 rue de Trévise, 75009 Paris
- **Téléphone** : 01 48 00 01 68 · **E-mail** : parisyum75009@gmail.com
- **Horaires** : Lun-Mer & Ven 18:00–23:40 · Jeu 18:00–23:50 · Sam-Dim 12:00–14:30 & 18:30–00:00
- **Paiement** : CB, sans contact, Apple Pay, Ticket Restaurant, espèces

## Lancer le site

Site statique — aucune installation.
- Double-cliquez sur `index.html`, ou lancez un petit serveur local (recommandé pour Google Maps) :
  `python -m http.server 8000` puis http://localhost:8000

## Image d'accueil

Le hero utilise `images/accueil.jpg`. **Pour mettre votre image** : enregistrez-la
sous `images/accueil.jpg` (en écrasant le fichier). La mise en page place le texte à gauche
(idéal pour une image dont le sujet est à droite).

## Modifier le contenu

- **Plats, prix, catégories, horaires** → `js/menu-data.js`
  (photos des plats reprises du site officiel ; tags `"spicy"` = 🌶️ et `"star"` = ★).
- **Textes, sections, coordonnées** → `index.html`
- **Couleurs, polices, mise en page** → `css/styles.css` (variables en haut du fichier).

## Structure

```
paris_yum/
├── index.html        ← tout le site (une page)
├── css/styles.css
├── js/menu-data.js   ← contenu (carte, horaires)
├── js/main.js        ← interactions
└── images/           ← accueil.png (hero), bar.jpg
```
