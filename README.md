# Intent
This code has two intents:
1. Immediate: serve as a starting point for hackathons. In particular, the DePaul hackathon sponsored by BCG DV (https://dvimagines.bemyapp.com)
2. In the future: serve as the starting point for future projects. To reach that stage, it would need further development, listed below.

# Demo
The ministack is accessible at https://ministackapi.nokdo.com/ping

# Pre-requisite
1. Setup Auth0
1.1 Create an account on Auth0 (free)
1.2 Go to Application and create a new application of type Regular Web Applications (while you are there you can also remove the "Test Application" that was created with your API)
1.3 In Settings, get the Client ID and copy it in website/project.tfvars.json
1.4 In Settings, get the Client Secret and copy it in website/.env
1.5 In Settings, get the Client Secret and run "now secret add auth0_client_secret VALUE" where VALUE is replaced by the Client Secret value
1.6 In Settings, set the Callbacks URLs to the domains where your app will run followed by the callback url (http://localhost:3000/api/callback,https://ministack.nokdo.com/api/callback)
1.7 In Settings, set the Logout URLs to the domains where your app will run (http://localhost:3000,https://ministack.nokdo.com)
1.8 Go to APIs > Create API and create an API.
1.9 Give it the same identifier as the website https://ministack.nokdo.com

# Content
## Structure
This codebase contains the following, organised in folders:
1. a CD pipeline implemented by CircleCI in the .circleci folder. The pipeline is very basic and does the following: package the lambda functions, deploy them and the rest of the infrastructure via the execution of terraform scripts. At midnight every day, the pipeline also swaps the infrastructure as detailed below.
2. an infrastructure. The infrastructure folder has two structures: active and dormant. Active correspond to the working stack, dormant correspond to the remaining assets that we don't want to delete on a regular basis (at time of writing, only a cert since AWS has a limit of 20 certs creations per year).
3. an API layer in the api folder. This is deployed as a lambda and currently implements a basic Create/List/Delete interface alongside a user creation/validation/deletion flow.
4. a static react website in the website folder. This is deployed on S3.

## The API
The API exposes the following endpoints:
- `GET /ping` will simply return `pong`
- `POST /register` with payload `{"email": "john@doe.com"}` will create a user, send him a 6 digit code for validation and return `{"username": "john@doe.com", "password": "ABC"}`
- `POST /validate` with payload `{"username': "john@doe.com", "code": "123456"}` will validate the user
- `GET /user` with basic auth will return the user
- `DELETE /user` with basic auth will delete the user

The api also implements a generic Create/List/Delete endpoint. For example, if a Dynamo table named `Article` exists, the following endpoints will work:
- `GET /article` with basic auth will return a list of all articles
- `POST /article` with  basic auth and payload `[{"author": "Emile Zola"}]` will create an article object. It will append to the given payload a unique id and a parent id matching the user that created it.
- `GET /article/{xyz}` with basic auth will return article whose id match xyz if that object was created by the user.
- `DELETE /article/{xyz}` with basic auth will delete article xyz if such an object exists AND is associated with the user

# How to
## Add a generic Create/List/Delete endpoint
Simply create a dynamo table. For example by duplicating the `aws_dynamodb_table.article` block from `infrastructure/dynamo.tf`. The table will need to:
- have its name prepended by the name of the project,
- have a hash key being derived from the name of the table, as per the example.
- have a range key of ParentId,
- have a second index whose name is ParentIdIndex and whose hash_key is ParentId

# Next steps
This is a very basic first implementation, and avenues for improvements would include:
1. Frontend, supporting the creation of a user, his log in, the creation/listing/deletion of an object (an article to follow the API example) and his logout.
2. Automated tests. Currently, there aren't any.
3. CI pipeline. Currently, there is only one environment, but it would make sense to have the concept of test and production environments.
4. Monitoring/Logging.
