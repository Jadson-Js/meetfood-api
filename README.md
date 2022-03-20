HOST: http://localhost:3000
 
# meetfood
## Documentation

## Login
### loginUser
+ href: "/login"
+ type: "POST"
+ rel: Create session with user data and generate an authentication token.
+ body: {email, password}
  
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
+ body: {name, email, password}

### updateUserRole
+ href: "/user/:userId"
+ type: "PUT"
+ rel: Edit the user's role.
+ body: {newRoleId}

### deleteUser
+ href: "/user/:userId"
+ type: "DELETE"
+ rel: Delete the user.


## Role
### getRoles
+ href: "/roles"
+ type: "GET"
+ rel: Returns data for all roles.
  
### getRoleById
+ href: "/role/:roleId"
+ type: "GET"
+ rel: Returns the data of a single role.

### createRole
+ href: "/role"
+ type: "POST"
+ rel: Create a new role.
+ body: {title, description}
  
### deleteRole
+ href: "/role/:roleId"
+ type: "DELETE"
+ rel: Delete the role.

## Permission
### getPermissions
+ href: "/permissions"
+ type: "GET"
+ rel: Returns data for all permissions.
  
### getPermissionById
+ href: "/permission/:permissionId"
+ type: "GET"
+ rel: Returns the data of a single permission.

### createPermission
+ href: "/permission"
+ type: "POST"
+ rel: Create a new permission.
+ body: {title, description}

### deletePermission
+ href: "/permission/:permissionId"
+ type: "DELETE"
+ rel: Delete the permission.