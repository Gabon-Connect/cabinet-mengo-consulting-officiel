# Guide de déploiement sur Cloudflare Pages via GitHub Actions

## Contexte

Ce document décrit le processus complet pour déployer un site HTML statique sur Cloudflare Pages en utilisant GitHub Actions comme pipeline CI/CD.

**Projet :** Cabinet Mengo Consulting  
**Repository :** `Gabon-Connect/cabinet-mengo-consulting-officiel`  
**URL de déploiement :** `https://cabinet-mengo-consulting.pages.dev`

---

## Prérequis

- Un compte Cloudflare actif
- Un repository GitHub avec le code source
- Droits d'administration sur le repository GitHub

---

## Étape 1 — Créer un token API Cloudflare

### Pourquoi un token personnalisé ?
Le token doit avoir des permissions spécifiques. Les templates par défaut de Cloudflare ne incluent pas tout ce qu'il faut.

### Procédure

1. Aller sur **dash.cloudflare.com → My Profile → API Tokens**
2. Cliquer sur **Create Token** puis **Create Custom Token**
3. Configurer les permissions suivantes :

| Type    | Ressource            | Permission |
|---------|----------------------|------------|
| Account | Cloudflare Pages     | Edit       |
| Account | Account Settings     | Read       |
| User    | User Details         | Read       |

4. Dans **Account Resources** : sélectionner `Include → All accounts` (ou le compte spécifique)
5. Cliquer **Continue to summary** → **Create Token**
6. **Copier le token immédiatement** (il ne sera plus affiché ensuite)

> **Important :** Le token doit impérativement inclure `Account Settings: Read` pour que Wrangler puisse identifier le compte Cloudflare cible. Sans cette permission, l'appel à `/memberships` échoue avec le code d'erreur `10000`.

---

## Étape 2 — Récupérer l'Account ID Cloudflare

L'Account ID permet d'éviter que Wrangler appelle l'API `/memberships` pour détecter automatiquement le compte (ce qui peut échouer selon les permissions du token).

1. Aller sur **dash.cloudflare.com**
2. Dans la barre latérale droite de la page d'accueil, copier l'**Account ID**

Ou le retrouver dans les logs GitHub Actions après un premier run :

```
│ Account Name                              │ Account ID                       │
│ Digitalfactory@gabonconnect.com's Account │ 0a2fc6bb77f08039fdccb7c84cf77a30 │
```

---

## Étape 3 — Ajouter le secret dans GitHub

1. Aller sur **GitHub → Settings → Secrets and variables → Actions**
2. Cliquer **New repository secret**
3. Remplir :
   - **Name :** `CLOUDFLARE_API_TOKEN`
   - **Value :** le token copié à l'étape 1
4. Cliquer **Add secret**

---

## Étape 4 — Créer le workflow GitHub Actions

Créer le fichier `.github/workflows/deploy.yml` à la racine du repository :

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Create Cloudflare Pages project (if not exists)
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          npx wrangler pages project create <NOM_DU_PROJET> --production-branch main 2>/dev/null || true

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: <ACCOUNT_ID>
          command: pages deploy . --project-name <NOM_DU_PROJET> --branch main --commit-dirty=true
```

**Remplacer :**
- `<NOM_DU_PROJET>` → nom du projet Cloudflare Pages (ex. `cabinet-mengo-consulting`)
- `<ACCOUNT_ID>` → l'Account ID récupéré à l'étape 2

### Points clés du workflow

| Élément | Rôle |
|---------|------|
| `workflow_dispatch` | Permet de déclencher le déploiement manuellement depuis GitHub |
| `project create ... \|\| true` | Crée le projet si inexistant, ignore l'erreur s'il existe déjà |
| `accountId` | Contourne l'appel à `/memberships`, plus robuste |
| `--commit-dirty=true` | Supprime l'avertissement git sur les fichiers non commités |

---

## Étape 5 — Premier déploiement

### Option A — Automatique (via push)
Merger la branche contenant le workflow sur `main`. Le déploiement se déclenche automatiquement.

### Option B — Manuel
1. Aller sur **GitHub → Actions → Deploy to Cloudflare Pages**
2. Cliquer **Run workflow** → **Run workflow**

---

## Étape 6 — Vérifier le déploiement

Dans les logs GitHub Actions, chercher :

```
✨ Success! Uploaded X files
✨ Deployment complete! Take a peek over at https://cabinet-mengo-consulting.pages.dev
```

Le site est ensuite accessible à l'URL `https://<NOM_DU_PROJET>.pages.dev`.

---

## Déploiements suivants

Tout push sur `main` ou `master` déclenche automatiquement un redéploiement. Aucune action manuelle n'est nécessaire.

---

## Erreurs rencontrées et solutions

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `Authentication error` sur `/memberships` | 10000 | Token sans permission `Account Settings: Read` | Ajouter cette permission au token |
| `Project not found` | 8000007 | Le projet n'existe pas sur Cloudflare Pages | Ajouter l'étape `pages project create` avant le deploy |
| `fetch failed` (local) | — | Proxy bloquant `api.cloudflare.com` | Utiliser GitHub Actions à la place de Wrangler en local |

---

## Structure des fichiers ajoutés

```
.
└── .github/
    └── workflows/
        └── deploy.yml   ← workflow de déploiement automatique
```
