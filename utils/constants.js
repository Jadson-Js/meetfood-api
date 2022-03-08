const logDefault = {
    invalidId: "Invalid id.",
    invalidName: "Invalid name.",
    invalidEmail: "Invalid email.",
    invalidPassword: "invalid password.",
    invalidDescription: "Invalid description",
    nameAlreadyExist: "Email already exist.",
    emailAlreadyExist: "Email already exist.",
    somethingGoesWrong: "Something goes wrong."
}

const logUser = {
    userNotFound: "User not found.",
    invalidCredentials: "Name or password are incorrect.",
    tokenNotProvide: "No token provide.",
    tokenUnauthentic: "unauthentic token",
    requiredLogged: "Need to be logged in",
    AccessDenied: "Logged in user does not have access to this content",
    notAllowedSetRole: "It is not allowed to set role"
}

const logRole = {
    roleNotFound: "Role not found.",
}

const logPermission = {
    permissionNotFound: "Permission not found.",
}

const logRolePermission = {
    relationshipNotFound: "Relationship not found.",
}

module.exports = {logDefault, logUser, logRole, logPermission}