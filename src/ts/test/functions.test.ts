/**
 * @jest-environment jsdom
 */
import { Todo } from "../models/Todo";
import * as functions from "../functions";
import * as main from "../main";

describe('addTodo tests', () => {
    test("should add todo to array if its text is at least 3 characters long", () => {
        const testTodos : Todo[] = [];
        const todoText = "Handla mat";
        const correct = functions.addTodo(todoText, testTodos);
        expect(correct).toEqual({success: true, error: ""});
        expect(testTodos[0]).toEqual(new Todo(todoText, false));
    });
    test("should return error message if todo text is too short", () => {
        const testTodos : Todo[] = [];
        const todoText = "oj";
        const correct = functions.addTodo(todoText, testTodos);
        expect(correct).toEqual({success: false, error: "Du måste ange minst tre bokstäver"});
        expect(testTodos.length).toEqual(0);
        });
    });

test("should toggle the done property of the todo", () => {
    const todo = new Todo("Handla mat", false);
    functions.changeTodo(todo);
    expect(todo.done).toBe(true);
    functions.changeTodo(todo);
    expect(todo.done).toBe(false);
});

test("should remove all the todos from the todos list", () => {
    const todos = [
      new Todo("Handla mat", false),
      new Todo("Diska", false),
    ];
    functions.removeAllTodos(todos);
    expect(todos.length).toBe(0);
  });

  test("should sort todos list alphabetically", () => {
    let testTodos: Todo[] = [
      {text:"handla mat",done:false},
      {text:"diska",done:false},
      {text:"baka bullar",done:false}
    ]; 
    functions.sortTodosAlphabetically(testTodos);
    console.log(testTodos); 
    let result: Todo[] = [
        {text:"baka bullar",done:false},
        {text:"diska",done:false},
        {text:"handla mat",done:false}
  ];
  expect(testTodos).toStrictEqual(result);
});

