import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';
import { query } from '@angular/animations';
import { Persona } from '../models/persona.model';
import { Medico } from '../models/medico.model';
import { NotificationService } from './notificacion-services/notification.service';
import { HandleNotificationService } from './handle-notification.service';

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private notificationService: NotificationService,
    // private handleNotificationService: HandleNotificationService
  ) {
    // this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | 'MEDICO_ROLE' | 'PACIENTE_ROLE'{
    return this.usuario.role;
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // googleInit() {

  //   return new Promise( resolve => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //       });

  //       resolve();
  //     });
  //   })

  // }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }

  logout() {
    this.notificationService.borrarTokenFCM().subscribe(data=>{
      localStorage.removeItem('token');
      localStorage.removeItem('menu');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });


    // this.auth2.signOut().then(() => {


    // });

  }

  // trabaja con guard
  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );


//  console.log('renenw token');
//         this.handleNotificationService.ngOnInit();
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      catchError( error => of(false) )
    );

  }


  crearUsuario( formData: RegisterForm ) {

    console.log(formData);

    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                map((resp:{ok:boolean,usuario:Usuario, persona:Persona})=>resp)
                // tap( (resp: any) => {
                //   // this.guardarLocalStorage( resp.token, resp.menu );
                // })
              )
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );

  }

  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    // this.handleNotificationService.ngOnInit();

                    this.guardarLocalStorage( resp.token, resp.menu );

                  })
                );

  }

  loginGoogle( token ) {

    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );

  }

  cargarUsuario(id:String){
    const url = `${base_url}/usuarios/usuario/${id}`;
    return this.http.get(url,this.headers).pipe(
      map((resp:{ok:boolean,usuario:Usuario, persona:Persona, data:Medico})=>resp)
    )
  }


  cargarUsuarios( desde: number = 0, entrada:number = 10, role:string, estado : string, sort: number= 1) {
    const query = this.generarQuery(['role','estado'],[role,estado]);
    console.log(query);

    const url = `${ base_url }/usuarios?desde=${ desde }&entrada=${ entrada }${ query }&sort=${ sort }`;
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid, user.createdAt, user.estado)
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }

  generarQuery(names:any,values:any){
    var query = '';
    for (let i = 0; i < values.length; i++) {
      if (values[i] != "todos") {
        query +=`&${names[i]}=${values[i]}`;
      }
    }
    return query
  }




  eliminarUsuario( usuario: Usuario ) {

      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/usuarios/${ usuario.uid }`;
      return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }

}
