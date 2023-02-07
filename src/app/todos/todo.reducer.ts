import {Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarTodos, toogle, toogleAll } from './todo.actions';


export const estadoInicial:Todo[] = [
  new Todo('Salvar al mundo 1'),
  new Todo('Salvar al mundo 2'),
  new Todo('Salvar al mundo 3'),
  new Todo('Salvar al mundo 4'),

];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),

  on(limpiarTodos, (state) => state.filter(todo => !todo.completado)),

  on(borrar, (state, {id}) => state.filter(todo => todo.id !==id)),

  on(toogleAll, (state, {completado}) => state.map(todo =>{
    return{
      ...todo,
      completado: completado
    }
  })),

  on(toogle, (state, {id}) => {
      return state.map(todo =>{

        if(todo.id === id)
        {
          return{
            ...todo,
            completado: !todo.completado
          }
        }
        else{
          return todo;
        }
      });
  }),


  on(editar, (state, {id, texto}) => {
    return state.map(todo =>{

      if(todo.id === id)
      {
        return{
          ...todo,
          texto: texto
        }
      }
      else{
        return todo;
      }
    });
}),

);

export function todoReducer(state:Todo[] = estadoInicial, action: Action){
  return _todoReducer(state, action);

}
