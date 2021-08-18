import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../../../models/persona.model';
import { Usuario } from '../../../models/usuario.model';
import { Medico } from '../../../models/medico.model';
import { UsuarioService } from '../../../services/usuario.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: [ './usuario.component.css' ]
})


export class UsuarioComponent implements OnInit {




  public usuario:Usuario;
  public persona:Persona;
  public medico:Medico;
  public fullurl:string;
  public cargando: boolean = true;





  constructor(
    private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private usuarioService : UsuarioService,
               ) { }



  ngOnInit(): void {
    this.activatedRoute.params.
    subscribe(({id})=>{
      this.cargarUsuario(id);

    });
  }

  cargarUsuario(id:String){
    this.cargando = true;
    this.usuarioService.cargarUsuario(id)

    .subscribe(user=>{
      this.usuario  = user.usuario;
      this.persona  = user.persona;
      this.medico  = user.data;
      this.cargando = false;
    });
  }

  urlfile(url):string{
    var fullurl ='https://docs.google.com/gview?url='+url+'&embedded=true';
    return fullurl;
  }
}

