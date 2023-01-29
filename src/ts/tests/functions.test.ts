import { Todo } from "../models/Todo";
import * as functions from "../functions";

describe('addTodo tests', () => {
    test("should add todo to array if its text is at least 3 characters long", () => {
        let testTodos : Todo[] = [];
        let todoText = "Handla";
        let correct = functions.addTodo(todoText, testTodos);
        expect(correct).toEqual({success: true, error: ""});
        expect(testTodos[0]).toEqual(new Todo(todoText, false));
    });
    test("should return error message if todo text is too short", () => {
        let testTodos : Todo[] = [];
        let todoText = "oj";
        let correct = functions.addTodo(todoText, testTodos);
        expect(correct).toEqual({success: false, error: "Du måste ange minst tre bokstäver"});
        expect(testTodos.length).toEqual(0);
        });
    });

test("should toggle the done property of the todo", () => {
    const todo = new Todo("Köp mjölk", false);
    functions.changeTodo(todo);
    expect(todo.done).toBe(true);
    functions.changeTodo(todo);
    expect(todo.done).toBe(false);
});

test("should remove all the todos from the todos list", () => {
    let todos = [
      new Todo("Köp mjölk", false),
      new Todo("Tvätta tvätt", false),
    ];
    functions.removeAllTodos(todos);
    expect(todos.length).toBe(0);
  });

/*describe('sortTodosAlphabetically tests', () => {

}*/