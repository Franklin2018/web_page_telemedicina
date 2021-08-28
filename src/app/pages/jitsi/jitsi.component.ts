import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta.model';

declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements OnInit, AfterViewInit {

  public myEvent: EventEmitter<void>;


  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = true;
  isVideoMuted = true;


  public consulta:Consulta;


  public cargando: boolean = true;


  constructor(
      private router: Router,
      private usuarioService: UsuarioService,
      private consultaService: ConsultaService,
      private activatedRoute: ActivatedRoute,

      ) {
        this.myEvent = new EventEmitter<void>();

       }

  ngOnInit(): void {

    this.activatedRoute.params.
    subscribe(({id})=>{
      this.cargarConsulta(id);

    });




  }

  cargarConsulta(id:String){
    this.cargando = true;

    this.consultaService.cargarConsulta(id)

    .subscribe(consulta=>{
      this.consulta  = consulta;



      this.room = consulta.sala.room;

      this.user = {
          name: this.usuarioService.usuario.nombre // set your username
      }

      console.log(consulta);
      console.log(this.consulta);
      this.consultaService.habilitarSala(id).subscribe(data =>{

        this.cargando = false;
        this.myEvent.emit();

      });


    });
  }

  ngAfterViewInit(): void {

    this.myEvent.subscribe(
      () => {
        this.options = {
          roomName: this.room,
          width: 500,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
      },
      (err: Error) => console.error(err)
    );

  }


  handleClose = () => {
      console.log("handleClose");
  }

  handleParticipantLeft = async (participant) => {
      console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
      const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant) => {
      console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
      const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant) => {
      console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
      const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
      console.log("handleVideoConferenceLeft");
      // this.router.navigate(['/thank-you']);
  }

  handleMuteStatus = (audio) => {
      console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video) => {
      console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(this.api.getParticipantsInfo()); // get all participants
          }, 500)
      });
  }

  // custom events
  executeCommand(command: string) {
      this.api.executeCommand(command);
      if(command == 'hangup') {
          // this.router.navigate(['/thank-you']);
          return;
      }

      if(command == 'toggleAudio') {
          this.isAudioMuted = !this.isAudioMuted;
      }

      if(command == 'toggleVideo') {
          this.isVideoMuted = !this.isVideoMuted;
      }
  }
}
