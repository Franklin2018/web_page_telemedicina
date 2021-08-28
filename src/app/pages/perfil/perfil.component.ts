import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../models/horario.model';
import { Persona } from '../../models/persona.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public horarioForm: FormGroup;
  public usuario: Usuario;
  public persona: Persona;
  public medico: Medico;
  public horario: Horario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public cargando: boolean = false;


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private horarioService : HorarioService,
               private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarUsuario(this.usuario.uid);

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });


  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  actualizarHorario() {
  this.horarioService.actualizarHorario( this.horarioForm.value, this.medico._id)
  .subscribe( () => {
    const { dias, horaInicio, horaCierre, tiempo } = this.horarioForm.value;
        this.horario.horaInicio = horaInicio;
        this.horario.horaCierre = horaCierre;
        this.horario.dias = dias;
        this.horario.tiempo= tiempo;
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }




  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, this.usuario.uid )
      .then( img => {
        console.log('img');
        console.log(img);

        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

  cargarHorario(id:String){
      this.cargando = true;
      this.horarioService.cargarHorario(id)

      .subscribe((horario:Horario)=>{
        this.horario  = horario;

        this.horarioForm = this.fb.group({
          dias: [ this.horario.dias , Validators.required ],
          horaInicio: [ this.horario.horaInicio, Validators.required ],
          horaCierre: [ this.horario.horaCierre,  Validators.required  ],
          tiempo: [ this.horario.tiempo, Validators.required ],
        });
        this.cargando = false;
      });
  }

  cargarUsuario(id:String){
    this.cargando = true;
    this.usuarioService.cargarUsuario(id)

    .subscribe(user=>{
      this.usuario  = user.usuario;
      this.persona  = user.persona;
      if(user.data!=undefined){
        this.medico  = user.data;
      }
      this.cargarHorario(this.medico._id);
      // this.cargando = false;
    });
  }

}
