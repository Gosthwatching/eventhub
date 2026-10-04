# EventHub

Projet EventHub.

## Conventions de commit

Les commits suivent la spécification [Conventional Commits 1.0.0](https://www.conventionalcommits.org/fr/v1.0.0/).

### Format

```
<type>(<scope optionnel>): <description>

[corps optionnel]

[pied de page optionnel]
```

### Types

| Type       | Usage                                                     |
| ---------- | --------------------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité (MINOR en SemVer)                 |
| `fix`      | Correction de bug (PATCH en SemVer)                       |
| `docs`     | Documentation uniquement                                  |
| `style`    | Formatage, sans changement de logique                     |
| `refactor` | Refactorisation sans nouvelle fonctionnalité ni correctif |
| `perf`     | Amélioration des performances                             |
| `test`     | Ajout ou correction de tests                              |
| `build`    | Système de build ou dépendances                           |
| `ci`       | Configuration de l'intégration continue                   |
| `chore`    | Tâches diverses                                           |
| `revert`   | Annulation d'un commit                                    |

### Règles

- Description à l'impératif, en minuscule, sans point final, 72 caractères max.
- `!` après le type/scope ou `BREAKING CHANGE:` dans le pied de page pour un changement incompatible (MAJOR).
- Exemples :
  - `feat(auth): add Google login`
  - `fix(api): handle empty event list`
  - `docs: update README`
  - `feat!: drop support for Node 18`

## Hooks Git (Husky + lint-staged + commitlint)

```bash
npm install
```

- `pre-commit` : `lint-staged` formate (Prettier) les fichiers `*.{ts,tsx,js,json,md,yml}` et lint (ESLint) les `*.{ts,tsx,js}`.
- `commit-msg` : `commitlint` vérifie le respect de Conventional Commits.

Mise en place (déjà configurée dans ce dépôt) :

```bash
npm i -D husky lint-staged prettier eslint @commitlint/cli @commitlint/config-conventional
npx husky init
echo "npx lint-staged" > .husky/pre-commit
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

## Workflow Git

Le flux des branches `main`, `dev` et des branches ephemeres est decrit dans [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md).

## Stack Docker

La stack de developpement Docker Compose et les images de production multistages sont decrites dans [docs/STACK.md](docs/STACK.md). La configuration locale part de `.env.example`.

## Captures d'ecran du rendu

Les captures des hooks et des commits de l'exercice 1, ainsi que celles de la stack Compose livree dans la PR #6, sont conservees dans [`docs/screenshots/`](docs/screenshots/).

### Hooks et commits

- [Historique initial](docs/screenshots/01-historique-initial.png)
- [Hook ESLint bloquant un commit](docs/screenshots/02-hook-eslint-bloque-commit.png)
- [Echec ESLint](docs/screenshots/03-hook-eslint-echec.png)
- [Commitlint rejetant un message invalide](docs/screenshots/04-commitlint-message-invalide.png)
- [Commitlint rejetant un sujet vide](docs/screenshots/05-commitlint-sans-sujet.png)
- [Commit reussi](docs/screenshots/06-commit-reussi.png)

### Dernieres modifications

- [Diff de la stack Compose fusionnee dans dev](docs/screenshots/07-pr-changements-compose-fusionnee.png)
- [Historique des commits de la PR #6](docs/screenshots/08-pr-commits-recents.png)
- [Application EventHub lancee avec Docker Compose](docs/screenshots/09-application-compose-en-fonctionnement.png)

## Licence

ISC
