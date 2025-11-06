import { test, expect } from '@playwright/test';
import { TodoPage } from '../Page/TodoPage';

test.describe('TC01 - Ajouter une tâche', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto('');
  });

  test('Ajouter une tâche simple', async () => {
    const todoText = 'Apprendre Playwright';
    await todoPage.addTodo(todoText);
    expect(await todoPage.isTodoVisible(todoText)).toBe(true);
  });

  test('Ajouter plusieurs tâches', async () => {
    const todos = ['Première tâche', 'Deuxième tâche', 'Troisième tâche'];
    for (const todo of todos) {
      await todoPage.addTodo(todo);
    }
    expect(await todoPage.getTodoCount()).toBe(3);
    for (const todo of todos) {
      expect(await todoPage.isTodoVisible(todo)).toBe(true);
    }
  });

  test('Ajouter une tâche vide ne doit rien faire', async () => {
    const initialCount = await todoPage.getTodoCount();
    await todoPage.addTodo('');
    expect(await todoPage.getTodoCount()).toBe(initialCount);
  });
});
