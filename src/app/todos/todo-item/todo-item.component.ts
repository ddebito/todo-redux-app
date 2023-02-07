import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo! : Todo;
  @ViewChild ('inputFisico') txtInpuFisico!: ElementRef;
  todoMutable!: Todo;

  chkCompletado!: FormControl;
  txtInput!: FormControl;
  editando:boolean = false;

  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {

    //this.todo.completado = true;
    this.todoMutable={...this.todo};
    this.todoMutable.completado = true;

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toogle({id:this.todoMutable.id}));
    })

  }

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todoMutable.texto);

    setTimeout(() => {
      this.txtInpuFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;

  if(this.txtInput.invalid){return;}
  if(this.txtInput.value === this.todoMutable.completado){return;}

  this.store.dispatch(actions.editar({
    id: this.todoMutable.id,
    texto: this.txtInput.value
   }))
  }


  borrar(){
    this.store.dispatch(actions.borrar({
      id:this.todoMutable.id
    }));
  }

}
