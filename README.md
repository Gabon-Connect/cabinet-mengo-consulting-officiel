# Mengo Consulting

Site vitrine du **Cabinet Mengo Consulting**, cabinet pluridisciplinaire basé à Libreville (Gabon), spécialisé en assistance juridique, formalités administratives et formation professionnelle.

> **Vos droits ont un titre.**

## Aperçu

Le site présente les deux pôles d'expertise du cabinet :

- **Assistance Juridique & Formalités** — création d'entreprises, contrats, droit foncier, état civil, titres de séjour, recouvrement de créances
- **Formation Professionnelle** — Secrétariat Juridique, Secrétariat de Direction, Bureautique, programme « Vos Vacances en Entreprise »

## Pages

| Page            | Description                                 |
| --------------- | ------------------------------------------- |
| `index.html`    | Accueil avec hero, carousel livre, services |
| `a-propos.html` | Histoire, valeurs, fondateur, équipe        |
| `formations.html` | Filières, programme, formulaire d'inscription |
| `contact.html`  | Coordonnées, WhatsApp, formulaire de contact |

## Technologies

- HTML5 sémantique (ARIA, microdata)
- CSS3 — Design system « Le Titre » (variables, glassmorphism, animations)
- JavaScript vanille — IntersectionObserver, parallax, carousel 3D, compteurs, formulaire
- Google Fonts — EB Garamond (titrage) + Inter (corps)
- Aucune dépendance externe (pas de framework CSS/JS)

## Structure

```
mengo-consulting-2/
├── index.html
├── a-propos.html
├── formations.html
├── contact.html
├── css/
│   └── style.css          # Design system complet + responsive
├── js/
│   └── main.js            # Interactions (nav, reveal, carousel, form…)
├── assets/
│   ├── favicon.svg        # Favicon SVG (logo CMC)
│   ├── img/
│   │   ├── img-fondateur.jpg
│   │   ├── owner.jpeg
│   │   ├── team.jpeg
│   │   └── team2.jpeg
│   ├── Nouveau_Cahier_des_Charges_Mengo_Consulting.pdf
│   └── Présentation officielle du cabinet.pdf
└── README.md
```

## Responsivité

- Breakpoints : 1280 px, 1024 px, 768 px, 480 px
- Navigation : menu desktop → hamburger mobile (768 px)
- Grilles : passage de 2-3 colonnes à 1 colonne sur mobile
- Hero : masquage du carnet visuel et centrage du texte à 1024 px

## Installation

Aucune construction requise. Ouvrir simplement un fichier `.html` dans un navigateur :

```bash
# En local (serveur statique recommandé)
npx serve .
```

## Déploiement

Déposer l'intégralité du dossier sur n'importe quel serveur statique (Netlify, Vercel, GitHub Pages, hébergement traditionnel).

## Contact

- Téléphone : [+241 76 20 90 23](tel:+24176209023)
- WhatsApp : [wa.me/24176209023](https://wa.me/24176209023)
- Localisation : Libreville, Gabon

---

© 2026 Cabinet Mengo Consulting. Tous droits réservés.
# cabinet-mengo-consulting-officiel
