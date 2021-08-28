import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { OnInit, Component } from '@angular/core';

interface Genero {
  value: string;
};
interface Rol {
  value: string;
};
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})


export class RegisterAdminComponent implements OnInit {


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

}
  public formSubmitted = false;
  public formComplete = false;
  isLinear = true;

  files: File[] = [];

  generos: Genero[] = [
    {value: 'Hombre'},
    {value: 'Mujer'},
    {value: 'Otro'}
  ];
  roles: Rol[] = [
    {value: 'ADMIN_ROLE'},
    {value: 'USER_ROLE'},
  ];
  public registerFormUsuario = this.fb.group({
    // nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    role: ['ADMIN_ROLE', Validators.required ],
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


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
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

    if ( this.registerFormUsuario.invalid || this.registerFormPersona.invalid ) {
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
          const { nombre } = resp.persona;//this.registerFormUsuario.value;

            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');


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
