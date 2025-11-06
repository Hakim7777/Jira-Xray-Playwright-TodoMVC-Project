import { test, expect } from '@playwright/test';
import { TodoPage } from '../Page/TodoPage';

test.describe('TC04 - Filtrer les tâches', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto('');
    await todoPage.addTodo('Tâche 1');
    await todoPage.addTodo('Tâche 2');
    await todoPage.addTodo('Tâche 3');
    await todoPage.completeTodo('Tâche 1');
    await todoPage.completeTodo('Tâche 3');
  });

  test('Filtrer "All" doit afficher toutes les tâches', async () => {
    await todoPage.filterAll();
    expect(await todoPage.getTodoCount()).toBe(3);
  });

  test('Filtrer "Active" doit afficher seulement les tâches actives', async () => {
    await todoPage.filterActive();
    const visibleTodos = await todoPage.getAllTodos();
    expect(visibleTodos).toContain('Tâche 2');
    expect(visibleTodos).not.toContain('Tâche 1');
    expect(visibleTodos).not.toContain('Tâche 3');
  });

  test('Filtrer "Completed" doit afficher seulement les tâches complétées', async () => {
    await todoPage.filterCompleted();
    const visibleTodos = await todoPage.getAllTodos();
    expect(visibleTodos).toContain('Tâche 1');
    expect(visibleTodos).toContain('Tâche 3');
    expect(visibleTodos).not.toContain('Tâche 2');
  });

  test('Passer de All à Active à Completed', async () => {
    await todoPage.filterAll();
    expect(await todoPage.getTodoCount()).toBe(3);
    await todoPage.filterActive();
    expect(await todoPage.getTodoCount()).toBe(1);
    await todoPage.filterCompleted();
    expect(await todoPage.getTodoCount()).toBe(2);
  });
});
