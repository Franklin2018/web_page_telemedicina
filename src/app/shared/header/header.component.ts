import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { NotificationService } from '../../services/notificacion-services/notification.service';
import { HandleNotificationService } from '../../services/handle-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;


  public notificacion: boolean  = false;

  constructor(
    private usuarioService: UsuarioService,
     private handleNotificationService: HandleNotificationService,

    private notificationService: NotificationService,

               private router: Router ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  ngOnInit(): void {
    this.handleNotificationService.ngOnInit();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.notificationService.messageEmitter.pipe(delay(100))
  .subscribe( payload => {
    this.notificacion = true;
  } );
  }


  logout() {
    this.usuarioService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

  desactivar(){
    this.notificacion = false;
    this.router.navigateByUrl(`/dashboard/fichamedicas`);

  }


}
