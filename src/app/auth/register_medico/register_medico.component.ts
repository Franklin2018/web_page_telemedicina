import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { MedicoService } from '../../services/medico.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Medico } from 'src/app/models/medico.model';
import { Especialidad } from '../../models/especialidad.model';
import { EspecialidadService } from '../../services/especialidad.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Genero {
  value: string;
}

@Component({
  selector: 'app-register-medico',
  templateUrl: './register_medico.component.html',
  styleUrls: [ './register_medico.component.css' ]
})
export class RegisterMedicoComponent {

  public especialidades : Especialidad [] = [];
  myControl = new FormControl();
  filteredOptions: Observable<Especialidad[]>;


  public formSubmitted = false;
  isLinear = true;

  files: File[] = [];

  generos: Genero[] = [
    {value: 'Hombre'},
    {value: 'Mujer'},
    {value: 'Otro'}
  ];




  public registerFormUsuario = this.fb.group({
    // nombre: ['', Validators.required ],
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
    descripcion: ['', Validators.required ],
    cv:'',
    credencialMedico: ['', Validators.required ],
    especialidad: ['',Validators.required],
    persona:"",
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private MedicoService: MedicoService,
               private fileUploadService :FileUploadService,
               private especialidadService:EspecialidadService,
               private router: Router ) { }

ngOnInit(): void {

  this.cargarEspecialidades();


  this.filteredOptions = this.registerFormMedico.get('especialidad').valueChanges.pipe(
            startWith(''),
            map((value:string)=>this._filter(value))
          )

}


private _filter(value: string): Especialidad[] {
  const filterValue = value.toLowerCase();
  return this.especialidades.filter((especialidad:Especialidad) => especialidad.nombre.toLowerCase().includes(filterValue));
}

onSelect(event) {
  this.files.push(...event.addedFiles);
}
onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1);
}


  test(cpt){
    this.formSubmitted = cpt;

  }

  crearUsuario(cpt) {
    this.formSubmitted = cpt;

    if ( this.registerFormUsuario.invalid || this.registerFormPersona.invalid || this.registerFormMedico.invalid || !(this.files.length>0)){
      return;
    }
    const mergedObject = {
      ...this.registerFormUsuario.value,
      ...this.registerFormPersona.value
    };

    // Realizar el posteo
    this.usuarioService.crearUsuario( mergedObject )
        .subscribe( resp => {
          const { nombre } = resp.persona;//this.registerFormUsuario.value;
          const persona = resp.persona._id;
          this.registerFormMedico.patchValue({persona:persona});

          this.MedicoService.crearMedico(this.registerFormMedico.value).subscribe((medico:Medico)=>{
            this.fileUploadService.subirArchivo(this.files[0],medico._id).then(img=>{

              Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');

            }).catch(err =>{

              Swal.fire('Error', 'No se pudo subir la imagen', 'error');

            });

          });


          // Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });


  }

  cargarEspecialidades(){
    this.especialidadService.cargarEspecialidades().subscribe((especialidades: Especialidad[])=>{
      this.especialidades = especialidades;
    });
  }

  campoNoValido( formGroup: FormGroup,campo: string ): boolean {

    if ( formGroup.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  campoFileNoValido(fls:File[]){
    return (!(fls.length>0) && this.formSubmitted);
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


