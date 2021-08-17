import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { EstudioService } from '../../services/estudio.service';
import { MedicoService } from '../../services/medico.service';
import { FileUploadService } from '../../services/file-upload.service';

interface Genero {
  value: string;
}

@Component({
  selector: 'app-register-medico',
  templateUrl: './register_medico.component.html',
  styleUrls: [ './register_medico.component.css' ]
})
export class RegisterMedicoComponent {

  public formSubmitted = false;
  public formComplete = false;
  isLinear = true;

  files: File[] = [];

  generos: Genero[] = [
    {value: 'Hombre'},
    {value: 'Mujer'},
    {value: 'Otro'}
  ];




  public registerFormUsuario = this.fb.group({
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    role: ['MEDICO_ROLE', Validators.required ],
    password: ['', Validators.required ],
    password2: ['', Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });
  public registerFormPersona = this.fb.group({
    nombre: ['', Validators.required ],
    apellido: ['', Validators.required ],
    carnetIdentidad: ['', Validators.required ],
    direccion: '',
    celular: ['', Validators.required ],
    genero: ['', Validators.required ],
    fechaNacimiento: ['', Validators.required ],
  });
  public registerFormMedico = this.fb.group({
    licMedica: ['', Validators.required ],
    titulo: ['', Validators.required ],
    nosocomio: '',
    direccionNosocomio: ['', Validators.required ],
    carnetIdentidad: ['', Validators.required ],
    descripcion: ['', Validators.required ],
    cv:'',
    credencialMedico: ['', Validators.required ],
    persona:"",
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private MedicoService: MedicoService,
               private fileUploadService :FileUploadService,
               private router: Router ) { }


onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}
onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


  test(cpt){
    this.formSubmitted = cpt;

    console.log(this.formComplete);
    console.log(cpt);
  }

  crearUsuario(cpt) {
    this.formSubmitted = cpt;

    if ( this.registerFormUsuario.invalid || this.registerFormPersona.invalid || this.registerFormMedico.invalid) {
      return;
    }
    const mergedObject = {
      ...this.registerFormUsuario.value,
      ...this.registerFormPersona.value
    };

    console.log(mergedObject);

    // Realizar el posteo
    this.usuarioService.crearUsuario( mergedObject )
        .subscribe( resp => {
          const { nombre } = this.registerFormUsuario.value;
          const persona = resp.persona._id;
          const usuario = resp.usuario.uid;
          this.registerFormMedico.patchValue({persona:persona});

          this.MedicoService.crearMedico(this.registerFormMedico.value).subscribe((resp:any)=>{
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
      //       this.fileUploadService
      // .subirArchivo( this.files[0], 'medicos',usuario  )
      // .then( img => {
      //   Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

      // }).catch( err => {
      //   console.log(err);
      //   Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      // })
            // this.router.navigateByUrl(`/dashboard/estudio/${ resp.estudio._id }`)
          });


          // Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });


  }



  campoNoValido( formGroup: FormGroup,campo: string ): boolean {
    // if(this.registerFormUsuario.get(campo).value ==="")
    // return false;
    if ( formGroup.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas() {
    const pass1 = this.registerFormUsuario.get('password').value;
    const pass2 = this.registerFormUsuario.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  passwordsIguales(pass1Name: string, pass2Name: string ) {


    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }


    }
  }

}
