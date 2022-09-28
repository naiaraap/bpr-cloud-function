import * as functions from "firebase-functions";
var admin = require("firebase-admin");

export const helloWorld = functions.https.onRequest((request, response) => {
  admin.initializeApp({
    databaseURL: "", // update with databaseURL
  });

  const ref = admin.database().ref("users");

  ref.on("value",(snapshot: any) => {
    var users = snapshot.val()
    var array: any[] = [];

    Object.keys(users).forEach((key:any) => {
      array.push(users[key]);
    });
    
    array.forEach((user:any) => {
      var userQuiz = user["userQuiz"]
      if (userQuiz != undefined  && userQuiz["motivationOpenQuestion"] != undefined) {
        userQuiz["motivation"] = 5
      }
    })

    var usersUpdated: any = {}
    array.forEach((user:any) => {
      usersUpdated[user.id] = user
    })

    ref.set(usersUpdated)

    },(errorObject: any) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
});
