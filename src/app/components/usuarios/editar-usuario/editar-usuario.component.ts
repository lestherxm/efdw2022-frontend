//angular
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//** importar modelo y servicio necesario para la tabla
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

      //datos necesarios para el update
      @Input() currentUsuario: Usuarios = {
        id_usuario: 0,
        usuario: '',
        biografia: '',
        genero: '',
        edad: 0
      };

    //** indicar en constructor el servicio, modal y routing
    constructor(
      private UsuariosService: UsuariosService,
      private route: ActivatedRoute,
      public modal: NgbModal
    ) {}

    ngOnInit(): void {
      //necesario para que currentX se pueda actualizar
      this.get(this.route.snapshot.params['id']);
    }
  
    get(id: number): void {
      this.UsuariosService.get(id).subscribe({
        next: (data) => {
          this.currentUsuario = data;
        },
        error: (e) => console.error(e),
      });
    }

    update(
      mensajeExito: any,
      mensajeError: any,
      mensajeDatosFaltantes: any
    ): void {
      //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
      if (
        !this.currentUsuario.usuario ||
        !this.currentUsuario.genero ||
        !this.currentUsuario.biografia
      ) {
        console.log(this.currentUsuario);
        //en caso de que falte un dato mostrar una ventana modal al respecto
        this.modal.open(mensajeDatosFaltantes, { centered: true });
      } else {
        this.UsuariosService.update(
          this.currentUsuario.id_usuario,
          this.currentUsuario
        ).subscribe({
          next: (res) => {
            console.log(res);
            if (!res.error) {
              this.modal.open(mensajeExito, { centered: true });
            } else {
              this.modal.open(mensajeError, { centered: true });
            }
          },
          error: (e) => console.error(e),
        });
      }
    }

}
