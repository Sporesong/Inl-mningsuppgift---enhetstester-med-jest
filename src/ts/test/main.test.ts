/**
 * @jest-environment jsdom
 */

import * as main from "../main";
import * as functions from "../functions";
import { Todo } from "../models/Todo";

describe("createNewTodo tests", () => {

    test(" should create a new todo and call createHtml", () => {
        document.body.innerHTML =  `    
        <form id="newTodoForm">
        <div>
          <input type="text" id="newTodoText">
          <button>Skapa</button>
          <button type="button" id="clearTodos">Rensa lista</button>
          <button type="button" class="sortTodos">Sortera a-ö</button>
        </div>
        <div id="error" class="error"></div>
      </form>
      <ul id="todos" class="todo"></ul>`
    let spy = jest.spyOn(main, "createNewTodo").mockReturnValue();
    const todoList: Todo[] = [];
    main.createNewTodo("handla mat", todoList);
     expect(spy).toBeCalled();
     expect(todoList.length).toBe(1); 
    });

  test("should not add todo if its to short and call on displayError", () => {
    document.body.innerHTML =  `    
    <form id="newTodoForm">
    <div>
      <input type="text" id="newTodoText">
      <button>Skapa</button>
      <button type="button" id="clearTodos">Rensa lista</button>
      <button type="button" class="sortTodos">Sortera a-ö</button>
    </div>
    <div id="error" class="error"></div>
  </form>
  <ul id="todos" class="todo"></ul>`
  let spyOnError = jest.spyOn(main, "displayError").mockReturnValue();
  const todoList: Todo[] = [];
  main.createNewTodo("oj", todoList);
   expect(spyOnError).toBeCalled();
   expect(todoList.length).toBe(0); 
    });
});

test("should create HTML based on todos", () => {
  document.body.innerHTML =  `    
  <form id="newTodoForm">
  <div>
    <input type="text" id="newTodoText">
    <button>Skapa</button>
    <button type="button" id="clearTodos">Rensa lista</button>
    <button type="button" class="sortTodos">Sortera a-ö</button>
  </div>
  <div id="error" class="error"></div>
</form>
<ul id="todos" class="todo"></ul>`
  const todos: Todo[] = [
    new Todo("handla mat", false),
    new Todo("diska", true),
  ];

  let spy =jest.spyOn(localStorage, "setItem");
  let spyHtml = jest.spyOn(document, "getElementById");

  main.createHtml(todos);
  expect(localStorage.setItem).toHaveBeenCalledWith("todos", JSON.stringify(todos));
  expect(document.getElementById).toHaveBeenCalledWith("todos");
});

test("should toggle the todo and call createHtml", () => {
  jest.spyOn(functions, "changeTodo");
  jest.spyOn(main, "createHtml");
  let todos: Todo[] = [{text: "handla mat", done: false}];
  main.toggleTodo(todos[0]);

  expect(functions.changeTodo).toHaveBeenCalledWith(todos[0]);
  expect(main.createHtml).toHaveBeenCalledWith(todos);
});

describe("displayError tests", () => {
  test("should add 'show' class to errorContainer and set error message", () => {
    document.body.innerHTML =  `    
    <form id="newTodoForm">
    <div>
      <input type="text" id="newTodoText">
      <button>Skapa</button>
      <button type="button" id="clearTodos">Rensa lista</button>
      <button type="button" class="sortTodos">Sortera a-ö</button>
    </div>
    <div id="error" class="error"></div>
  </form>
  <ul id="todos" class="todo"></ul>`
    const error = "Error";
    const errorContainer = document.createElement("div");
    errorContainer.id = "error";
    document.body.appendChild(errorContainer);

    main.displayError(error, true);
    expect(errorContainer.innerHTML).toBe(error);
    expect(errorContainer.classList.contains("show")).toBe(true);
  });

  test("should remove 'show' class from errorContainer and remove error message", () => {
    const error = "Error";
    const errorContainer = document.createElement("div");
    errorContainer.id = "error";
    errorContainer.classList.add("show");
    errorContainer.innerHTML = error;
    document.body.appendChild(errorContainer);

    main.displayError(error, false);
    expect(errorContainer.innerHTML).toBe("");
    expect(errorContainer.classList.contains("show")).toBe(false);
  });
});


test("Should call removeAllTodos and createHtml", () => {
  // 1 arrange
  let todos: Todo[] = [];
  let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
  let spy2 = jest.spyOn(main, "createHtml").mockReturnValue();

  // 2 act
  main.clearTodos(todos);
  
  // 3 assert
  expect(spy).toBeCalled();
  expect(spy2).toBeCalled();
}
);

describe("Tests for clearTodos", () => {
    
  test("Should call removeAllTodos and createHtml", () => {
      // 1 arrange
      let todos: Todo[] = [];
      let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
      let spy2 = jest.spyOn(main, "createHtml").mockReturnValue();

      // 2 act
      main.clearTodos(todos);
      
      // 3 assert
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
  });
});






/*describe('createNewTodo tests', () => {

}

describe('createHTML tests', () => {

}

describe('displayError tests', () => {

}

describe('toggleTodo tests', () => {

}

describe('clearTodo tests', () => {

}*/