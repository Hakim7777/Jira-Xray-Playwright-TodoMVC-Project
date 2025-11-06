import { test, expect } from '@playwright/test';
import { TodoPage } from '../Page/TodoPage';

test.describe('TC03 - Supprimer une tâche', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto('');
    await todoPage.addTodo('Tâche 1');
    await todoPage.addTodo('Tâche 2');
    await todoPage.addTodo('Tâche 3');
  });

  test('Supprimer une tâche doit la retirer de la liste', async () => {
    const todoToDelete = 'Tâche 2';
    const initialCount = await todoPage.getTodoCount();
    await todoPage.deleteTodo(todoToDelete);
    expect(await todoPage.getTodoCount()).toBe(initialCount - 1);
    expect(await todoPage.isTodoVisible(todoToDelete)).toBe(false);
  });

  test('Supprimer toutes les tâches', async () => {
    const todos = await todoPage.getAllTodos();
    for (const todo of todos) {
      await todoPage.deleteTodo(todo);
    }
    expect(await todoPage.isListEmpty()).toBe(true);
  });

  test('Supprimer une tâche complétée', async () => {
    const todoToDelete = 'Tâche 1';
    await todoPage.completeTodo(todoToDelete);
    await todoPage.deleteTodo(todoToDelete);
    expect(await todoPage.isTodoVisible(todoToDelete)).toBe(false);
  });
});
