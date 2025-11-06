import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * TodoPage : POM spécifique pour l'application TodoMVC
 * Hérite de BasePage pour accéder aux méthodes communes
 * 
 * Bonnes pratiques :
 * - Locateurs en "private readonly" (encapsulation)
 * - Actions métier spécifiques à TodoMVC
 * - Réutilisable par tous les tests
 */
export class TodoPage extends BasePage {
  // ========== LOCATEURS PRIVÉS ==========
  private readonly NEW_TODO_INPUT = 'input.new-todo';
  private readonly TODO_ITEMS = '.todo-list li';
  private readonly FILTER_ALL = 'a[href="#/"]';
  private readonly FILTER_ACTIVE = 'a[href="#/active"]';
  private readonly FILTER_COMPLETED = 'a[href="#/completed"]';
  private readonly CLEAR_COMPLETED_BTN = 'button.clear-completed';
  private readonly ITEM_COUNT = '.todo-count';

  // ========== CONSTRUCTEUR ==========
  /**
   * Constructeur de TodoPage
   * @param page - Instance Playwright de la page
   */
  constructor(page: Page) {
    super(page);
  }

  // ========== ACTIONS PUBLIQUES ==========

  /**
   * Ajouter une nouvelle tâche
   * @param todoText - Texte de la tâche
   */
  async addTodo(todoText: string): Promise<void> {
    await this.fillInput(this.NEW_TODO_INPUT, todoText);
    await this.pressKey('Enter');
    // Attendre que la tâche s'affiche seulement si le texte n'est pas vide
    if (todoText.trim()) {
      await this.page.getByText(todoText, { exact: true }).waitFor();
    }
  }

  /**
   * Marquer une tâche comme complétée
   * @param todoText - Texte exact de la tâche
   */
  async completeTodo(todoText: string): Promise<void> {
    const todoItem = this.page.getByText(todoText, { exact: true }).locator('..');
    await todoItem.locator('input[type="checkbox"]').click();
  }

  /**
   * Supprimer une tâche
   * @param todoText - Texte exact de la tâche
   */
  async deleteTodo(todoText: string): Promise<void> {
    const todoItem = this.page.getByText(todoText, { exact: true }).locator('..');
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
  }

  /**
   * Obtenir la liste de toutes les tâches visibles
   * @returns Tableau des textes des tâches
   */
  async getAllTodos(): Promise<string[]> {
    const todos: string[] = [];
    const count = await this.getCount(this.TODO_ITEMS);

    for (let i = 0; i < count; i++) {
      const text = await this.page.locator(this.TODO_ITEMS).nth(i).locator('label').textContent();
      if (text) {
        todos.push(text.trim());
      }
    }
    return todos;
  }

  /**
   * Vérifier si une tâche est visible
   * @param todoText - Texte à rechercher
   * @returns true si trouvée, false sinon
   */
  async isTodoVisible(todoText: string): Promise<boolean> {
    try {
      return await this.page.getByText(todoText, { exact: true }).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Vérifier si une tâche est complétée
   * @param todoText - Texte exact de la tâche
   * @returns true si cochée, false sinon
   */
  async isTodoCompleted(todoText: string): Promise<boolean> {
    const todoItem = this.page.getByText(todoText, { exact: true }).locator('..');
    return await todoItem.locator('input[type="checkbox"]').isChecked();
  }

  /**
   * Obtenir le nombre total de tâches
   * @returns Nombre de tâches
   */
  async getTodoCount(): Promise<number> {
    return await this.getCount(this.TODO_ITEMS);
  }

  // ========== FILTRES ==========

  /**
   * Afficher toutes les tâches
   */
  async filterAll(): Promise<void> {
    await this.click(this.FILTER_ALL);
  }

  /**
   * Afficher seulement les tâches actives
   */
  async filterActive(): Promise<void> {
    await this.click(this.FILTER_ACTIVE);
  }

  /**
   * Afficher seulement les tâches complétées
   */
  async filterCompleted(): Promise<void> {
    await this.click(this.FILTER_COMPLETED);
  }

  // ========== ACTIONS SUPPLÉMENTAIRES ==========

  /**
   * Supprimer toutes les tâches complétées
   */
  async clearCompleted(): Promise<void> {
    if (await this.isVisible(this.CLEAR_COMPLETED_BTN)) {
      await this.click(this.CLEAR_COMPLETED_BTN);
    }
  }

  /**
   * Vérifier que la liste est vide
   * @returns true si aucune tâche, false sinon
   */
  async isListEmpty(): Promise<boolean> {
    return (await this.getTodoCount()) === 0;
  }
}
