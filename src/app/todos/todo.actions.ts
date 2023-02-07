import { createAction, props } from '@ngrx/store';


export const limpiarTodos = createAction('[TODO] Limpiar TODOS');

export const crear = createAction(
  '[TODO] Crea Todo',
  props<{texto: string}>()
  );


export const toogle = createAction(
  '[TODO] Toogle Todo',
  props<{id: number}>()
  );

export const editar = createAction(
  '[TODO] Editar Todo',
  props<{id: number, texto: string}>()
  );

export const borrar = createAction(
  '[TODO] Borrar Todo',
  props<{id: number}>()
  );

export const toogleAll = createAction(
  '[TODO] Toogle TodoAll',
  props<{completado: boolean}>()
  );
