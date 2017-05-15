var firebase = require("firebase");

// Configure firebase
var config = {
    apiKey: "AIzaSyB0oxarY3aGc4I7749K5nBXvoS61rnblzQ",
    authDomain: "node-restify-demo.firebaseapp.com",
    databaseURL: "https://node-restify-demo.firebaseio.com",
    projectId: "node-restify-demo",
    storageBucket: "node-restify-demo.appspot.com",
    messagingSenderId: "563332249024"
};
firebase.initializeApp(config);

function TimeController() {

    // Get a reference to the database service
    var database = firebase.database();

    function writeTimeObject(req_id, req_time) {
      firebase.database().ref('id/' + req_id.toString()).set({
        id: req_id,
        time: req_time.toString()
      });
    }

    var parseTimeZone = function(req) {
        if (req.params.time_zone) {
            return req.params.time_zone;
        } else if (req.params.time_zone1 && req.params.time_zone2) {
            return req.params.time_zone1 + "/" + req.params.time_zone2;
        }
    } 

    this.getByID = function(req, res, next) {

        var req_id = parseInt(req.params.id);

        if (!isNaN(req_id)) {
            var ref = firebase.database().ref('id/' + req_id.toString());
            ref.once("value")
              .then(function(snapshot) {
                if (snapshot.exists()) {
                    var entry = snapshot.val();
                    console.log(entry);
                    var time = new Date(Date.parse(entry.time));
                    var zone = parseTimeZone(req);
                    console.log("time zone: " + zone);
                    try {
                        time = time.toLocaleString('en-US', { timeZone: zone});
                        res.send(200, {req_id, time});
                    } catch (e) {
                        res.send(400, "Error: Invalid Time Zone Provided.");
                    }
                    res.send(200, entry);  

                } else {
                    res.send(400, "Error: ID not found.");
                }

              });
        } else {
            res.send(400, "Error: Please provide a valid ID.");
        }     
    }

    this.post = function(req, res, next) {
        // Check for a valid post request
        var req_id = parseInt(req.params.id);
        var req_time = parseInt(req.params.UTCtime);

        if (!isNaN(req_id)) {
            // Check if UTCtime was provided, otherwise default to current time
            if (!isNaN(req_time)) {
                console.log("Req Time: " + req_time.toString());
                req_time = new Date(req_time);
            } else {
                req_time = new Date(new Date().getTime());
            }

            writeTimeObject(req_id, req_time);

            res.send(200, "Success: Created entry " + req_id.toString() + " with time = " + req_time.toString());

        } else {
            res.send(400, "Error: Please provide a valid ID.");
        }
    }

    this.del = function(req, res, next) {
        var req_id = parseInt(req.params.id);
        if (!isNaN(req_id)) {
            var ref = firebase.database().ref('id/' + req_id.toString());
            ref.once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    console.log(entry);
                    var entry = snapshot.val();
                    ref.remove();
                    res.send(200, "Success: Time object id " + req_id.toString() + " was deleted.");  
                } else {
                    res.send(400, "Error: Entry does not exist.");
                }
            });
        } else {
            res.send(400, "Error: Please provide a valid ID.");
        }
    }
}

module.exports = new TimeController();