HOST: http://localhost:3000
 
# meetfood
## Documentation
## Users
### getUsers
+ href: "/users"
+ type: "GET"
+ rel: Returns data for all users.
  
### getUserById
+ href: "/user/:userId"
+ type: "GET"
+ rel: Returns the data of a single user.

### createUser
+ href: "/user"
+ type: "POST"
+ rel: Create a new user.

### updateUserRole
+ href: "/user/:userId"
+ type: "PUT"
+ rel: Edit the user's role.

### deleteUser
+ href: "/user/:userId"
+ type: "DELETE"
+ rel: Deletes the user.