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

            GPSLog.insert({
                vehicleID : vehicleID,
                latitude: latitude,
                longitude: longitude,
                speed: speed,
                heading: heading,
                accuracy: accuracy
            });

            this.response.statusCode = 200; 
            this.response.end( 'success' );
        }
    });
});
