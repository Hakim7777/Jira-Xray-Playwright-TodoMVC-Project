import { Page } from '@playwright/test';

/**
 * BasePage : Classe mère pour toutes les pages
 * Contient les méthodes communes réutilisables par tous les POMs
 * 
 * Bonnes pratiques :
 * - Locateurs en "private readonly" (encapsulation)
 * - Méthodes publiques réutilisables
 * - Pas d'assertions (c'est le rôle des tests)
 */
export class BasePage {
  // ========== PROPRIÉTÉ PROTÉGÉE ==========
  // "protected" : accessible dans les classes enfants qui héritent de BasePage
  protected page: Page;

  // ========== CONSTRUCTEUR ==========
  /**
   * Constructeur de BasePage
   * @param page - Instance Playwright de la page
   */
  constructor(page: Page) {
    this.page = page;
  }

  // ========== ACTIONS UTILITAIRES ==========

  /**
   * Naviguer vers une URL
   * @param url - URL complète ou relative
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Remplir un champ de texte
   * @param selector - Sélecteur CSS du champ
   * @param text - Texte à entrer
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Cliquer sur un élément
   * @param selector - Sélecteur CSS de l'élément
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Appuyer sur une touche clavier
   * @param key - Touche à appuyer (ex: 'Enter', 'Escape')
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Récupérer le texte d'un élément
   * @param selector - Sélecteur CSS
   * @returns Contenu textuel ou null
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Compter le nombre d'éléments
   * @param selector - Sélecteur CSS
   * @returns Nombre d'éléments trouvés
   */
  async getCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Vérifier si un élément est visible
   * @param selector - Sélecteur CSS
   * @returns true si visible, false sinon
   */
  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Attendre qu'un élément soit visible
   * @param selector - Sélecteur CSS
   * @param timeout - Temps d'attente en ms (optionnel)
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }
}
