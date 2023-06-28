# Api end points

> There are 5 main routers on the app.
> All api endpoints url finish with `/api` 
  1. User
  2. Enterprise
  3. Unplastify
  4. Validators
  5. Chat
---
##  1. User
To render a a form with pertinent fields to be completed by the user you can fetch with a `get` method to the following route:
`'/user/login/api'`

For loging in you can `post` to the following route:
`'/user/login/api'` and the app expects to recieve on the body's request a data structure as following
```
const body = {
  email: 'user@email.com',
  password: 'userPassword'
}
```
This will return a JWT which will be used for further interactions with the app

Logout will destroy authentication token and can be achieved using `user/logout/api'`

router.get('/register/:api?', userIsLogged, userController.register);
router.post('/register/:api?', userController.processRegister);
router.get('/redirectUser/:api?', userController.redirectUser);