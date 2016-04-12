var AWS = require('aws-sdk');

var task =  function(request, callback){

	var params = {
	  ImageId: '1393245935872', /* required */
	  MaxCount: 10, /* required */
	  MinCount: 0, /* required */
	  Monitoring: {
		Enabled: false /* required */
	  },
	};
	
	var ec2 = new AWS.EC2();
	ec2.runInstances(params, function(err, data) {
	  if (err)callback(null, err.stack); // an error occurred
	  else     callback(null,data);           // successful response
	});
	
}

exports.lab = task
