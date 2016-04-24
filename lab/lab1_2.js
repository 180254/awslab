var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

var aws_info = function (request, callback) {
    var params = {
        DryRun: false,
        MaxResults: 99
    };

    ec2.describeInstances(params, function (err, data) {
        if (err) callback(null, err.stack);
        else     callback(null, data);
    });
};

var aws_new = function (request, callback) {
    var params = {
        ImageId: 'ami-80f715e0',
        MaxCount: 1,
        MinCount: 1,
        Monitoring: {
            Enabled: false
        },
        InstanceType: 't1.micro',
        KeyName: 'SuperKlucz'
    };

    var params2 = {
        DryRun: false
    };

    ec2.runInstances(params, function (err, data) {
        if (err) callback(null, err.stack);

        else {
            params2.InstanceIds = [data.Instances[0].InstanceId];
            ec2.describeInstances(params2, function (err, data) {
                if (err) callback(null, err.stack);

                else {
                    var result = {
                        PublicIpAddress: data.Reservations[0].Instances[0].PublicIpAddress,
                        PublicDnsName: data.Reservations[0].Instances[0].PublicDnsName
                    };
                    callback(null, result);
                }
            });
        }
    });
};

var aws_terminate = function (request, callback) {
    var paramsDesc = {
        DryRun: false,
        MaxResults: 99
    };

    var paramsTerm = {
        InstanceIds: [],
        DryRun: false
    };
    var exceptions = [/*instanceids*/];

    ec2.describeInstances(paramsDesc, function (err, data) {
        if (err) callback(null, err.stack);

        else {
            data.Reservations.forEach(function (reservation) {
                reservation.Instances.forEach(function (instance) {
                    if (exceptions.indexOf(instance) == -1) {
                        paramsTerm.InstanceIds.push(instance.InstanceId);
                    }
                });
            });

            ec2.terminateInstances(paramsTerm, function (err, data) {
                if (err) callback(null, err.stack);

                else {
                    var termStates = [];
                    data.TerminatingInstances.forEach(function (termInst) {
                        termStates.push(termInst.CurrentState.Name);
                    });
                    callback(null, termStates);
                }
            });
        }
    });
};

exports.aws_info = aws_info;
exports.aws_new = aws_new;
exports.aws_terminate = aws_terminate;