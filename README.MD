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
