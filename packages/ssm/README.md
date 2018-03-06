# Usage

```javascript
(async () => {
  process.env = Object.assign(await require('@maxdome/ssm')(), process.env);
})();
```

*Attention:* Only the last part of the parameter name will be used as key. If
the name of the parameter is `/my-path/MY_VAR` it will be indexed by `MY_VAR`.

# Environment variables

* `AWS_REGION`: The AWS region (default: `eu-central-1`)
* `AWS_SSM_PATH`: The path to restrict the used parameters (default: `/`).
  Helpful if having multiple services and/or environments in the same AWS
  account (e.g. `/${service}-${environment}`)
* `AWS_ROLE_ARN`: The role to get the parameters.
  Helpful for local development to start the app with the parameters of an
  AWS environment. For this its also needed to provide the access key id and
  secret of an AWS account which have the permission to assume this role
* `AWS_ROLE_SESSION_NAME`: The name of the session if assuming a role (default:
  `name` from the `package.json`)
