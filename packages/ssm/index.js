const AWS = require('aws-sdk');
const path = require('path');

module.exports = () =>
  new Promise(async (resolve, reject) => {
    if (process.env.AWS_ROLE_ARN) {
      const sts = new AWS.STS();
      AWS.config.credentials = sts.credentialsFrom(
        await sts
          .assumeRole({
            RoleArn: process.env.AWS_ROLE_ARN,
            RoleSessionName: process.env.AWS_ROLE_SESSION_NAME || require(path.join(process.cwd(), 'package.json')).name,
          })
          .promise()
      );
    }

    const ssm = new AWS.SSM({ region: process.env.AWS_REGION || 'eu-central-1' });
    const ssmParams = {
      Path: process.env.AWS_SSM_PATH || '/',
      WithDecryption: true,
      Recursive: true,
    };

    const parameters = {};
    (function get(ssmParams) {
      ssm.getParametersByPath(ssmParams, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        for (const parameter of data.Parameters) {
          const splittedName = parameter.Name.split('/');
          parameters[splittedName[splittedName.length - 1]] = parameter.Value;
        }
        if (data.NextToken) {
          ssmParams.NextToken = data.NextToken;
          get(ssmParams);
        } else {
          resolve(parameters);
        }
      });
    })(ssmParams);
  });
