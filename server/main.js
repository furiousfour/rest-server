
Router.map(function() {
    this.route('logVehiclePosition', {
        path: '/api/vehicle/log',
        where: 'server',
        action: function() {
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
                vehicleID : vehicleID,
                latitude: latitude,
                longitude: longitude,
                speed: speed,
                heading: heading,
                accuracy: accuracy,
                isOccupied: isOccupied
            });

            this.response.statusCode = 200;
            this.response.end( 'success' );
        }
    });

    this.route('makePhoneCalls', {
        path: 'api/makeCall',
        where: 'server',
        action: function() {
           // GET, POST, PUT, DELETE
            var requestMethod = 'GET';
            // Data from a POST request

            var phoneNumber = this.params.query.phoneNumber; 
            var account_sid = "AC60d3c4a2882479b57c43890bb41b9300";
            var auth_token = "d7c478a80271f72f704ad0786f505a0b";
            var client = Npm.require('twilio')(account_sid, auth_token);

            client.calls.create({
                to:phoneNumber,
                from:'+919790244477',
                url:'http://52.77.53.23:9000/test/test.xml'
            }, function(err, data) {
                console.log('This call\'s unique ID is: ' + call.sid);
                console.log('This call was created at: ' + call.dateCreated);
            });

            this.response.statusCode = 200; 
            this.response.end( 'success' );
        }
    });
});
