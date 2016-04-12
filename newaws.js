var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();

var task = function(request, callback) {

        var params = {
            ImageId: 'ami-80f715e0',
            /* required */
            MaxCount: 1,
            /* required */
            MinCount: 1,
            /* required */
            Monitoring: {
                Enabled: true /* required */
            },
            NetworkInterfaces: [{
                AssociatePublicIpAddress: true,
                DeviceIndex: 0,
            }],

        };


        var params2 = {
            DryRun: false,
            MaxResults: 5
        };


        var ec2 = new AWS.EC2();
        ec2.runInstances(params, function(err, data) {
                if (err) callback(null, err.stack); // an error occurred
                else {

                    var rId = data.ReservationId;

                    ec2.describeInstances(params, function(err, data) {
                                if (err) callback(null, err.stack); // an error occurred
                                else {

                                    for (r in data.Reservations) {
                                        if (r.ReservationId == "rID") {
                                            var ip = r.Instances[0].PublicIpAddress;
                                            callback(null, ip);
                                        } // successful response
                                    };
                            }




                        }); // successful response
                };

        }
	}

        exports.lab = task