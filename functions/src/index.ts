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

 export const updateCommunitId = functions.https.onRequest((request, response) => {
  admin.initializeApp({
    databaseURL: "", // update with databaseURL
  });

  const ref = admin.database().ref("bikes");

  ref.on("value",(snapshot: any) => {
    var bikes = snapshot.val()
    var array: any[] = [];

    Object.keys(bikes).forEach((key:any) => {
      array.push(bikes[key]);
    });
    
    array.forEach((bike:any) => {
      var bikeCommunityId = bike["communityId"]
      var devolutions: any[] = []

      if (bike["devolutions"] != undefined) {
        Object.keys(bike["devolutions"]).forEach((key: any) => {
          devolutions.push(bike["devolutions"][key])
        })

        devolutions.forEach((devolution: any) => {
          var user = devolution["user"]
          if(user !== undefined && user["communityId"] === undefined || user["communityId"] === "") {
            user["communityId"] = bikeCommunityId
            console.log("Devoluçoes das bikes: ", bike["id"])
          }
        })

        // console.log("first devolutions: ", devolutions[0])
      }
    })

    var bikesUpdated: any = {}
    array.forEach((bike:any) => {
      bikesUpdated[bike.id] = bike
    })



    ref.set(bikesUpdated)

    },(errorObject: any) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
})

export const updateWithDrawsCommunityId = functions.https.onRequest((request, response) => {
  admin.initializeApp({
    databaseURL: "https://bpr-production.firebaseio.com/", // update with databaseURL
  });

  const ref = admin.database().ref("bikes");

  ref.on("value",(snapshot: any) => {
    var bikes = snapshot.val()
    var array: any[] = [];

    Object.keys(bikes).forEach((key:any) => {
      array.push(bikes[key]);
    });
    
    array.forEach((bike:any) => {
      var bikeCommunityId = bike["communityId"]
      var withdraws: any[] = []

      if (bike["withdraws"] != undefined) {
        Object.keys(bike["withdraws"]).forEach((key: any) => {
          withdraws.push(bike["withdraws"][key])
        })

        withdraws.forEach((withdraw: any) => {
          var user = withdraw["user"]
          if(user !== undefined && user["communityId"] === undefined || user["communityId"] === "") {
            user["communityId"] = bikeCommunityId
            console.log("Emprétimo das bikes: ", bike["id"])
          }
        })

        // console.log("first devolutions: ", devolutions[0])
      }
    })

    //  var bikesUpdated: any = {}
    // array.forEach((bike:any) => {
    //   bikesUpdated[bike.id] = bike
    // }) 



    // ref.set(bikesUpdated)

    },(errorObject: any) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
})
