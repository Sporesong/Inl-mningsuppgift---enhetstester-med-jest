/**
 * @jest-environment jsdom
 */

import * as main from "../main";
import * as functions from "../functions";
import { Todo } from "../models/Todo";


jest.spyOn(main, "createHtml").mockReturnValue();
jest.spyOn(main, "displayError").mockReturnValue();

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