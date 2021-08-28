// TODO: Cambiar el url de los servicios en prod

export const environment = {
  production: true,
  base_url: 'https://telemedicina-topicos.herokuapp.com/api',
  host_url: 'https://telemedicina-topicos.herokuapp.com',

  s3_url:'https://eventosbucket.s3.amazonaws.com',

  firebaseConfig : {
    apiKey: "AIzaSyCd4lZjWAeRDkToMpGZBKFiXrjbZEPF3OI",
    authDomain: "topicos-telemedicina.firebaseapp.com",
    projectId: "topicos-telemedicina",
    storageBucket: "topicos-telemedicina.appspot.com",
    messagingSenderId: "439041510953",
    appId: "1:439041510953:web:980a811698fc23b204d638",
    measurementId: "G-M3QLRZQVVB"
},
};
