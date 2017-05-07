Meteor.methods({

    'sendLocation' : function(location){

        console.log("Request to send location for location " + location.latitude + " : " + location.longitude);
        var url = "http://13.228.23.221:9000/assign-ambulance/";
        url +=location.latitude+"/"+location.longitude;
        try {
            const result = HTTP.call('GET', url, {});
            console.log("Result of post : " + JSON.stringify(result));
            return true;
        } catch (e) {
            console.log(e);
            console.log("Got a network error, timeout, or HTTP error in the 400 or 500 range.");
       }
    }
});


Router.map(function () {
    this.route('assignAmbulance', {
        path: '/api/assign-ambulance',
        where: 'server',
        action: function () {
            // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var vehicle_id = this.params.query.vehicleID;
            var des_lat = this.params.query.lat;
            var des_long = this.params.query.long;
            var des_name = this.params.query.name;

            AssignedAmulance.insert({
                vehicle_id: vehicle_id,
                des_lat: des_lat,
                des_long: des_long,
                des_name: des_name,
                timestamp: new Date().valueOf()
            });

            this.response.statusCode = 200;
            this.response.end('success');
        }
    });

    this.route('unAssignAmbulance', {
        path: '/api/un-assign-ambulance',
        where: 'server',
        action: function () {
            // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var vehicle_id = this.params.query.vehicleID;

            AssignedAmulance.remove({
                vehicle_id: vehicle_id
            });

            this.response.statusCode = 200;
            this.response.end('success');
        }
    });


    this.route('logVehiclePosition', {
        path: '/api/vehicle/log',
        where: 'server',
        action: function () {
            // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var vehicleID = this.params.query.vehicleID;
            var latitude = this.params.query.latitude;
            var longitude = this.params.query.longitude;
            var speed = this.params.query.speed;
            var heading = this.params.query.heading;
            var accuracy = this.params.query.accuracy;
            var isOccupied = this.params.query.isOccupied;

            GPSLog.insert({
                vehicleID: vehicleID,
                latitude: latitude,
                longitude: longitude,
                speed: speed,
                heading: heading,
                accuracy: accuracy,
                isOccupied: isOccupied,
                timestamp: new Date().valueOf()
            });

            this.response.statusCode = 200;
            this.response.end('success');
        }
    });

    this.route('makePhoneCalls', {
        path: 'api/makecall',
        where: 'server',
        action: function () {
            // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var phonenumber = this.params.query.phonenumber;
            var ambulanceid = this.params.query.ambulanceid;

            var account_sid = "AC60d3c4a2882479b57c43890bb41b9300";
            var auth_token = "d7c478a80271f72f704ad0786f505a0b";
            var client = Npm.require('twilio')(account_sid, auth_token);

            call = client.calls.create({
                to: phonenumber,
                from: '+919790244477',
                url: 'http://13.228.23.221:9000/test/' + String(ambulanceid) + '/test.xml'
            }, function (err, data) {
                console.log('This call\'s unique ID is: ' + call.sid);
                console.log('This call was created at: ' + call.dateCreated);
            });
            this.response.statusCode = 200;
            this.response.end('success');
        }
    });
});
