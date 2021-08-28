// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  base_url: 'http://192.168.43.187:3000/api',
  host_url: 'http://192.168.43.187:3000',
  // base_url: 'https://telemedicina-topicos.herokuapp.com/api',
  // host_url: 'https://telemedicina-topicos.herokuapp.com',

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
