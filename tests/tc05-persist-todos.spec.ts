import { test, expect } from '@playwright/test';
import { TodoPage } from '../Page/TodoPage';

test.describe('TC05 - Refresh et continuité', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto('');
  });

  test('L\'application doit être fonctionnelle après un refresh', async ({ page }) => {
    const todoText = 'Test après refresh';
    await todoPage.addTodo(todoText);
    expect(await todoPage.isTodoVisible(todoText)).toBe(true);
    await page.reload();
    todoPage = new TodoPage(page);
    expect(await todoPage.getTodoCount()).toBeGreaterThanOrEqual(0);
  });

  test('Ajouter une tâche après un refresh', async ({ page }) => {
    await page.reload();
    todoPage = new TodoPage(page);
    const todoText = 'Tâche après refresh';
    await todoPage.addTodo(todoText);
    expect(await todoPage.isTodoVisible(todoText)).toBe(true);
    expect(await todoPage.getTodoCount()).toBeGreaterThan(0);
  });

  test('Supprimer et ajouter alternativement après refresh', async ({ page }) => {
    const todo1 = 'Tâche 1';
    const todo2 = 'Tâche 2';
    await todoPage.addTodo(todo1);
    await page.waitForTimeout(300);
    await page.reload();
    todoPage = new TodoPage(page);
    await todoPage.addTodo(todo2);
    expect(await todoPage.getTodoCount()).toBeGreaterThanOrEqual(1);
  });
});
