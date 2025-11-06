import { test, expect } from '@playwright/test';
import { TodoPage } from '../Page/TodoPage';

test.describe('TC02 - Marquer une tâche comme complétée', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto('');
    await todoPage.addTodo('Tâche à compléter');
  });

  test('Cocher une tâche doit la marquer comme complétée', async () => {
    const todoText = 'Tâche à compléter';
    await todoPage.completeTodo(todoText);
    expect(await todoPage.isTodoCompleted(todoText)).toBe(true);
  });

  test('Compléter plusieurs tâches', async () => {
    const todos = ['Tâche à compléter', 'Autre tâche'];
    await todoPage.addTodo('Autre tâche');
    for (const todo of todos) {
      await todoPage.completeTodo(todo);
    }
    for (const todo of todos) {
      expect(await todoPage.isTodoCompleted(todo)).toBe(true);
    }
  });

  test('Décrocher une tâche doit la marquer comme active', async () => {
    const todoText = 'Tâche à compléter';
    await todoPage.completeTodo(todoText);
    await todoPage.completeTodo(todoText);
    expect(await todoPage.isTodoCompleted(todoText)).toBe(false);
  });
});
