# 📋 TodoMVC QA Automation - Projet Complet

## 👨‍💼 À propos

**Auteur :** Hakim Sahraoui  
**Titre :** QA Automation Engineer certifié (ISTQB, A4Q Selenium)  
**Email :** Hakimsahraoui.de@gmail.com  
**Projet :** Cycle QA complet - De Jira à l'exécution automatisée avec Playwright

---

## 🎯 Vue d'ensemble du projet

Ce projet démontre un **cycle QA d'entreprise complet** appliqué à l'application TodoMVC (Angular version).

### Objectif
Simuler un workflow QA professionnel couvrant tous les aspects : gestion des exigences, conception de tests, exécution manuelle et automatisation avec reporting.

### Application cible
- **URL** : https://todomvc.com/examples/angular/
- **Type** : Single Page Application (SPA) - Angular
- **Domaine de test** : Gestion de tâches (CRUD, filtrage, persistance)

---

## 📊 Cycle QA implémenté

```
┌─────────────────────────────────────────────────────────────────┐
│  1. JIRA - Gestion des exigences & User Stories                │
├─────────────────────────────────────────────────────────────────┤
│  ✓ Epic : "Automatisation TodoMVC"                              │
│  ✓ User Stories : Ajouter, Compléter, Supprimer, Filtrer       │
│  ✓ Acceptance Criteria : Définis pour chaque US                │
├─────────────────────────────────────────────────────────────────┤
│  2. XRAY - Conception & Gestion des cas de test                │
├─────────────────────────────────────────────────────────────────┤
│  ✓ Scénarios Gherkin écrits                                    │
│  ✓ 5 Test Cases (TC01-TC05) avec Given/When/Then             │
│  ✓ Pré-conditions et données de test définies                 │
├─────────────────────────────────────────────────────────────────┤
│  3. Exécution MANUELLE + Rapport PDF Xray                      │
├─────────────────────────────────────────────────────────────────┤
│  ✓ Tests exécutés manuellement                                 │
│  ✓ Résultats documentés dans Xray                              │
│  ✓ Rapport PDF généré                                          │
├─────────────────────────────────────────────────────────────────┤
│  4. AUTOMATISATION - Playwright + TypeScript                    │
├─────────────────────────────────────────────────────────────────┤
│  ✓ POM (Page Object Model) design pattern                      │
│  ✓ 5 suites de tests (16 scénarios)                            │
│  ✓ Exécution réussie (32 tests × 2 navigateurs)              │
├─────────────────────────────────────────────────────────────────┤
│  5. REPORTING - Allure Reports                                 │
├─────────────────────────────────────────────────────────────────┤
│  ✓ Historique des exécutions                                   │
│  ✓ Dashboards avec métriques                                   │
│  ✓ Traces et vidéos d'erreurs                                  │
├─────────────────────────────────────────────────────────────────┤
│  6. CI/CD - Jenkins (En préparation)                           │
├─────────────────────────────────────────────────────────────────┤
│  ⏳ Pipeline automatisé prévu                                   │
│  ⏳ Intégration Xray + Jenkins                                  │
│  ⏳ Notifications automatiques                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack technique

| Outil | Version | Rôle |
|-------|---------|------|
| **Playwright** | ^1.56.1 | Framework d'automatisation |
| **TypeScript** | Latest | Langage de programmation |
| **Node.js** | 20+ | Runtime |
| **Jira** | Cloud | Gestion des exigences |
| **Xray** | Jira Plugin | Gestion & exécution des tests |
| **Allure** | Latest | Reporting avancé |
| **Jenkins** | LTS | CI/CD (à intégrer) |

---

## 📦 Structure du projet

```
todomvc-qa-automation/
│
├── Page/                                  # Page Object Model (POM)
│   ├── BasePage.ts                       # Classe mère - méthodes communes
│   └── TodoPage.ts                       # POM spécifique TodoMVC
│
├── tests/                                 # Test Suites
│   ├── tc01-add-todo.spec.ts             # TC01 : Ajouter une tâche
│   ├── tc02-complete-todo.spec.ts        # TC02 : Marquer complétée
│   ├── tc03-delete-todo.spec.ts          # TC03 : Supprimer une tâche
│   ├── tc04-filter-todos.spec.ts         # TC04 : Filtrer les tâches
│   └── tc05-persist-todos.spec.ts        # TC05 : Refresh & continuité
│
├── allure-results/                        # Résultats Allure (généré)
├── playwright-report/                     # Rapports Playwright (généré)
├── test-results/                          # Vidéos & screenshots (généré)
│
├── playwright.config.ts                   # Configuration Playwright
├── package.json                           # Dépendances npm
├── tsconfig.json                          # Configuration TypeScript
├── README.md                              # Ce fichier
└── .gitignore                             # Fichiers ignorés

```

---

## 🧪 Cas de test (TC01 - TC05)

### TC01 : Ajouter une tâche
- **Scénario** : L'utilisateur ajoute une nouvelle tâche
- **Sous-cas** :
  - ✅ Ajouter une tâche simple
  - ✅ Ajouter plusieurs tâches
  - ✅ Tentative avec texte vide (validation)

### TC02 : Marquer comme complétée
- **Scénario** : L'utilisateur marque une tâche comme complétée
- **Sous-cas** :
  - ✅ Cocher une tâche
  - ✅ Compléter plusieurs tâches
  - ✅ Décrocher une tâche (toggle)

### TC03 : Supprimer une tâche
- **Scénario** : L'utilisateur supprime une tâche
- **Sous-cas** :
  - ✅ Supprimer une tâche active
  - ✅ Supprimer toutes les tâches
  - ✅ Supprimer une tâche complétée

### TC04 : Filtrer les tâches
- **Scénario** : L'utilisateur filtre l'affichage des tâches
- **Sous-cas** :
  - ✅ Afficher toutes les tâches (All)
  - ✅ Afficher seulement les actives (Active)
  - ✅ Afficher seulement les complétées (Completed)
  - ✅ Navigation entre les filtres

### TC05 : Refresh et continuité
- **Scénario** : L'application reste fonctionnelle après un refresh
- **Sous-cas** :
  - ✅ Application fonctionnelle après reload
  - ✅ Ajouter une tâche après refresh
  - ✅ Opérations alternées (add/delete)

**Résumé** : 16 scénarios de test × 2 navigateurs (Chromium, WebKit) = **32 exécutions**

---

## ⚙️ Installation et setup

### Prérequis
- **Node.js** 18+ (ou 20 LTS)
- **npm** 9+
- **Git**
- Navigateurs : Chromium & WebKit (téléchargés automatiquement)

### Installation

```bash
# 1. Cloner le repository
git clone <your-repo-url>
cd todomvc-qa-automation

# 2. Installer les dépendances
npm install

# 3. Installer les navigateurs Playwright
npx playwright install chromium webkit

# 4. Vérifier l'installation
npm test -- --version
```

---

## ▶️ Exécution des tests

### ✅ Tous les tests (mode headless)
```bash
npm test
# ou
npx playwright test
```

### 👁️ Tests en interface interactive (UI Mode)
```bash
npm run test:ui
# Lance un dashboard pour interagir avec les tests
```

### 🖥️ Tests avec navigateurs visibles
```bash
npm run test:headed
# Voir les navigateurs en action (attention : Firefox désactivé sur Windows)
```

### 🐛 Mode debug (débogage pas à pas)
```bash
npm run test:debug
# Ouvre Playwright Inspector pour déboguer
```

### 🎯 Tests spécifiques
```bash
# Un seul fichier de test
npx playwright test tc01-add-todo

# Un seul cas de test
npx playwright test -g "Ajouter une tâche simple"

# Un seul navigateur
npx playwright test --project=chromium
```

### 📊 Voir le rapport HTML
```bash
npx playwright show-report
```

---

## 📈 Résultats actuels

| Métrique | Valeur |
|----------|--------|
| **Total de tests** | 32 (16 × 2 navigateurs) |
| **Scénarios** | 16 |
| **Taux de réussite** | 100% ✅ |
| **Navigateurs** | Chromium, WebKit |
| **Temps moyen** | ~1.5min (full run) |
| **Statut** | Production-ready |

### Navigateurs testés
- ✅ **Chromium** : 16/16 PASS
- ✅ **WebKit (Safari)** : 16/16 PASS
- ❌ **Firefox** : Désactivé (problème permissions Windows)

---

## 🏗️ Architecture & Design Patterns

### Page Object Model (POM)

**Avantages** :
- 🔒 Encapsulation : Locateurs `private readonly`
- 📝 Maintenabilité : Modifications en un seul endroit
- ♻️ Réutilisabilité : Actions métier réutilisables
- 🎯 Clarté : Tests focalisés sur la logique, pas les sélecteurs

**Structure** :
```
BasePage (classe mère)
  ├── Méthodes génériques : goto(), click(), fillInput()
  └── Propriété protégée : page
      
TodoPage (POM spécifique)
  ├── Héritage de BasePage
  ├── Locateurs privés : NEW_TODO_INPUT, TODO_ITEMS, etc.
  └── Actions métier : addTodo(), completeTodo(), deleteTodo()
```

### Pattern AAA (Arrange-Act-Assert)

Chaque test suit la structure :
```typescript
test('Scénario', async () => {
  // ARRANGE : préparer les données
  // ACT : effectuer l'action
  // ASSERT : vérifier le résultat
});
```

### Sélecteurs robustes

✅ **Utilisés** :
- `getByText()` : Très stable, cross-browser
- `getByRole()` : Accessible, sémantique
- `getByTestId()` : Dédié aux tests
- CSS simples et stables

❌ **Évités** :
- XPath complexe
- Sélecteurs par index
- Sélecteurs fragiles (`:has-text()` en production)

---

## 🔄 Bonnes pratiques appliquées

| Pratique | Implémentation |
|----------|-----------------|
| **DRY** | BasePage centralise le code commun |
| **SOLID** | Responsabilité unique par classe |
| **Async/Await** | Gestion moderne des promesses |
| **Timeouts explicites** | Attentes définies partout |
| **Assertions claires** | `expect()` avec messages explicites |
| **Documentation** | Commentaires JSDoc complets |
| **Isolation** | Tests indépendants (`beforeEach`) |
| **Rapports détaillés** | Screenshots, vidéos, traces |

---

## 📊 Reporting & Allure

### Configuration Allure

Allure est configuré dans `playwright.config.ts` :
```typescript
reporter: 'allure-playwright'
```

### Générer les rapports Allure

```bash
# Lancer les tests avec Allure
npx playwright test

# Générer et ouvrir le rapport
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### Informations dans les rapports
- ✅ Historique des exécutions
- ✅ Dashboards avec tendances
- ✅ Détail de chaque test (duration, attachments)
- ✅ Screenshots et vidéos d'erreurs
- ✅ Traces Playwright (debugging avancé)
- ✅ Timeline d'exécution

---

## 🔗 Intégration Jira & Xray

### Workflow actuel
1. **User Stories** créées dans Jira
2. **Test Cases** conçus dans Xray (Gherkin format)
3. **Exécution manuelle** documentée
4. **Résultats** stockés dans Xray
5. **Automatisation** exécutée en parallèle

### Documentation Xray

Les cas de test sont documentés en **Gherkin** :

```gherkin
Feature: Ajouter une tâche

  Scenario: Ajouter une tâche simple
    Given L'utilisateur est sur TodoMVC
    When L'utilisateur entre "Apprendre Playwright"
    And L'utilisateur appuie sur Entrée
    Then La tâche doit s'afficher dans la liste
```

---

## 🚀 CI/CD - Jenkins (Prochaine étape)

### Pipeline prévu

```yaml
Pipeline:
  1. Build : npm install
  2. Setup : npx playwright install
  3. Test  : npx playwright test
  4. Report: Allure + HTML Reports
  5. Notify: Email aux stakeholders
  6. Archive: Résultats dans Xray
```

### Commandes Jenkins

```groovy
stage('Run Tests') {
  steps {
    sh 'npm install'
    sh 'npx playwright install'
    sh 'npm test'
  }
}

stage('Publish Reports') {
  steps {
    allure includeProperties: false,
           jdk: '',
           results: [[path: 'allure-results']]
  }
}
```

---

## 📚 Ressources & Documentation

### Playwright
- [Official Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [POM Guide](https://playwright.dev/docs/pom)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

### Testing
- [ISTQB Certification](https://www.istqb.org/)
- [A4Q Selenium](https://www.a4q.org/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)

### Tools Integration
- [Xray - Jira Plugin](https://docs.getxray.app/)
- [Allure Reports](https://docs.qameta.io/allure/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)

---

## 🐛 Troubleshooting

### Issue 1 : Firefox ne s'ouvre pas (EPERM)
**Cause** : Problème permissions Windows  
**Solution** :
```bash
# Désactiver Firefox dans playwright.config.ts
# ou
npx playwright install firefox --with-deps
```

### Issue 2 : Tests timeout
**Solution** :
```bash
# Augmenter le timeout
npx playwright test --timeout=60000
```

### Issue 3 : Éléments introuvables
**Debug** :
```bash
npm run test:debug -- --grep "nom du test"
```

### Issue 4 : Rapports non générés
**Vérifier** :
```bash
# Allure results existent
ls allure-results

# Playwright report
npx playwright show-report
```

---

## 💡 Tips & Bonnes pratiques

### 1️⃣ Utiliser l'UI Mode pendant le développement
```bash
npm run test:ui
```
C'est plus rapide et interactif que le mode debug.

### 2️⃣ Vérifier les locateurs
```bash
npx playwright codegen https://todomvc.com/examples/angular/
```
Génère le code automatiquement.

### 3️⃣ Utiliser les traces pour déboguer
Les traces sont auto-générées en cas d'erreur :
```bash
npx playwright show-trace test-results/trace.zip
```

### 4️⃣ Garder les tests isolés
Chaque test doit être indépendant. Utiliser `beforeEach` pour nettoyer.

### 5️⃣ Maintenir la documentation à jour
Les commentaires JSDoc aident à comprendre chaque action.

---

## 📋 Checklist d'exécution

- [ ] Cloner le repository
- [ ] Installer Node.js 20+
- [ ] `npm install`
- [ ] `npx playwright install chromium webkit`
- [ ] `npm test` pour vérifier
- [ ] `npm run test:ui` pour explorer
- [ ] Vérifier les rapports HTML
- [ ] Documenter les résultats
- [ ] Intégrer à Jenkins (prochaine phase)

---

## 📞 Support & Contact

**Auteur** : Hakim Sahraoui  
**Email** : Hakimsahraoui.de@gmail.com  
**Certifications** : ISTQB, A4Q Selenium  

Questions ou améliorations ? N'hésitez pas à ouvrir une issue ! 

---

## 📄 Licence

Ce projet est fourni à titre d'exemple d'implémentation QA professionnelle.

---

## 🎓 Résumé du cycle QA

✅ **Gestion** : Jira + User Stories  
✅ **Design** : Xray + Gherkin  
✅ **Exécution manuelle** : Documentée et rapportée  
✅ **Automatisation** : Playwright + TypeScript (POM)  
✅ **Reporting** : Allure + HTML Reports  
⏳ **CI/CD** : Jenkins (en préparation)  

**Prochaines étapes** :
1. Pipeline Jenkins
2. Intégration Xray ↔ Jenkins
3. Notifications automatiques
4. Tests visuels (Visual Regression)
5. Optimisation des performances

---

**Dernière mise à jour** : Novembre 2025  
**Version** : 1.0.0  
**Status** : ✅ Production Ready