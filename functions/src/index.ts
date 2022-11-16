import * as functions from "firebase-functions";
var admin = require("firebase-admin");

export const quizReasonUpdate = functions.https.onRequest((request, response) => {
  admin.initializeApp({
    databaseURL: "https://bpr-dev.firebaseio.com/", // update with databaseURL https://bpr-production.firebaseio.com/
  });

  const ref = admin.database().ref("bikes");

  ref.on("value",(snapshot: any) => {
    console.log("Início da function");
    var bikes = snapshot.val();
    var bikesArray: any[] = [];

    Object.keys(bikes).forEach((key:any) => {
      bikesArray.push(bikes[key]);
    });
    console.log(`Bikes length: ${bikes.length}. BikesArray length: ${bikesArray.length}`);
    bikesArray.forEach((bike:any) => {
      let devolutions = bike["devolutions"];
      if (devolutions != undefined) {
        let devolutionsArray: any[] = [];
        Object.keys(devolutions).forEach((key:any) => {
          devolutionsArray.push(devolutions[key]);
        });
        
        devolutionsArray.forEach((devolution: any) => {
          if (devolution != undefined  && devolution["quiz"] != undefined) {
            let quiz = devolution["quiz"];
            /*
            <item>Seu local de trabalho</item>
          <item>Seu local de estudo</item>
          <item>Seu local de lazer / convivência social</item>
          <item>Seu local de compras</item>
          <item>Local de estudo da criança</item>
          <item>Outro motivo não especificado</item>
  
          - Para realizar entregas de aplicativos.
          - Deslocar para o local de trabalho.
          - Deslocar para o local de estudo.
          - Levar crianças para escola ou creche.
          - Resolver coisas do dia a dia. Ex: Mercado, lotéricas, banco.
          - Para passear, lazer.
            */
            //console.log(`Reason original: ${quiz.reason}`);
            switch (quiz.reason) {
              // Casos para DEV e PROD
              case "Seu local de trabalho":
                quiz.reason = 0;
                break;
              case "Seu local de estudo":
                  quiz.reason = 1;
                  break;
              case "Seu local de lazer / convivência social":
                  quiz.reason = 2;
                  break;
              case "Seu local de compras":
                quiz.reason = 3;
                break;
              case "Local de estudo da criança":
                quiz.reason = 4;
                break;
              case "Outro motivo não especificado":
                quiz.reason = 5;
                break;
              // Casos para DEV apenas
              case "Para realizar entregas de aplicativos":
              case "Para realizar entregas de aplicativos.":
                quiz.reason = 0;
                break;
              case "Deslocar para o local de trabalho":
              case "Deslocar para o local de trabalho.":
                  quiz.reason = 1;
                  break;
              case "Deslocar para o local de estudo":
              case "Deslocar para o local de estudo.":
                  quiz.reason = 2;
                  break;
              case "Levar crianças para escola ou creche":
              case "Levar crianças para escola ou creche.":
                quiz.reason = 3;
                break;
              case "Resolver coisas do dia a dia. Ex: Mercado, lotéricas, banco":
              case "Resolver coisas do dia a dia. Ex: Mercado, lotéricas, banco.":
                quiz.reason = 4;
                break;
              case "Para passear, lazer":
              case "Para passear, lazer.":
                quiz.reason = 5;
                break;
              default:
                console.log("Reason não encontrada: " + quiz.reason);
                break;
            }
            //console.log(`Reason atualizada: ${quiz.reason}`);
          }
        });
      }

    })

    var bikesUpdated: any = {}
    bikesArray.forEach((bike:any) => {
      bikesUpdated[bike.id] = bike
    })

    ref.set(bikesUpdated);

    console.log("Function finalizada.");

    },(errorObject: any) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
});
