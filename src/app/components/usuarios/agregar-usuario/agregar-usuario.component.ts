//angular
import { Component, OnInit } from '@angular/core';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//importar modelo y servicio necesario para la tabla
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  //datos necesarios para crear
  usuario: Usuarios = {
    id_usuario: 0,
    usuario: '',
    biografia: '',
    genero: '',
    edad: 0
  };

  constructor(
    private UsuariosService: UsuariosService,
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  save(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //si algun dato falta, lanzar ventana datos faltantes.
    if (
      !this.usuario.usuario ||
      !this.usuario.genero ||
      !this.usuario.biografia
    ) {
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      const data = {
        usuario: this.usuario.usuario,
        genero: this.usuario.genero,
        biografia: this.usuario.biografia,
        edad: this.usuario.edad
      };

      this.UsuariosService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          if (!res.error) {
            this.modal.open(mensajeExito, { centered: true });
          } else {
            this.modal.open(mensajeError, { centered: true });
          }
        },
        error: (e) => {
          console.error(e);
          this.modal.open(mensajeError, { centered: true });
        },
      });
    }
  }

}
