import { Component, Input,OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios.model';  

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    //Array que guarda todos los datos mostrados en tabla
    usuarios?: Usuarios[];

  //variables para realizar acciones
  id_action: number = 0;

  constructor(private UsuariosService:UsuariosService, public modal:NgbModal) { }

  ngOnInit(): void {
    //al iniziar el componente se devuelven los datos de la DB a traves de la API de mando del servicio correspondiente
    this.retrieveData();
  }

  retrieveData(): void {
    this.UsuariosService.getAll()
      .subscribe({
        next: (data) => {
          this.usuarios = data; //se llena el array con la data traida de la API
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveData();
  }

  confirmDelete(msgEliminar: any, id: number): void {
    //actualizar el id del curso a eliminar
    this.id_action = id;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  delete(mensajeError: any): void{
    console.log(`Se eliminara el @alumno con @id -> ${this.id_action}`);
      
      this.UsuariosService.delete(this.id_action)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.modal.dismissAll(); //cerrar ventana de confirmacion
            this.refreshList() //refrezcar lista
            if (res.error){//en caso de haber error indicarselo al usuario
              this.modal.open(mensajeError, { centered: true });
            }
          },
          error: (e) => {
            console.error(e);
            alert('Hubo un erro al eliminar el registro.');
          }
        });
  
  }

}
