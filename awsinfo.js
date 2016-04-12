var task =  function(request, callback){
var params = {
	  DryRun: true || false,
	  MaxResults: 5
	};
	ec2.describeInstances(params, function(err, data) {
	  if (err) callback(null, err.stack); // an error occurred
	  else     callback(null,data);           // successful response
	});
}

exports.lab = task