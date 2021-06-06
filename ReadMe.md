# Super Bank MEVN app

A REST API and a web site to manage checking accounts.

## Steps to run locally:
1. Ensure docker installed and functioning.
2. Navigate to root folder.
3. Run command: **docker compose up**
4. App should be accessible at: http://localhost:3000
5. Click on Register to signup and login.
6. For admin login, use default admin credentials: 
      `admin@sb.com` / `1234`
7. App demo at: https://youtu.be/LQlGg6DW3Z4
8. To run tests: 
   1. Ensure live db instance is down: `docker compose down`
   2. Copy `.env-test` file to `backend` folder.
   3. Start test db instances: `docker compose -f docker-compose-test.yml up`
   4. `npm test`
9. That's all.

## Documentation:
1. Api documentation: https://documenter.getpostman.com/view/151089/TzY1jGyv
2. Importable Postman collection: https://www.getpostman.com/collections/3eba135fe45d9c24ee85
3. Screencast/Demo Video: 

## Stack used:

1. Express Backend api
2. VueJs frontend
3. Mongo db

## Main Features:
### User Area
1. User signup
2. User Login
3. Add saving accounts
4. Withdraw from account
5. Deposit to account
6. Transfer between accounts

### Admin Area
1. User creation
2. User activate/deactive

##### On Frontend, Vue Notus theme is used.