HOST: http://localhost:3000
 
# meetfood
## Documentation
## Users
### getUsers
+ path: ['/']
+ method: [GET]
+ rel: Returns data for all users.
  
### getUserById
+ path: ['/user/:userId']
+ method: [GET]
+ rel: Returns the data of a single user.

### createUser
+ path: ['/user']
+ method: [POST]
+ rel: Create a new user.

### updateUserRole
+ path: ['/user/:userId']
+ method: [PUT]
+ rel: Edit the user's role.

### deleteUser
+ path: ['/user/:userId']
+ method: [DELETE]
+ rel: Deletes the user.