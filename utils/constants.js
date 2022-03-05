const logDefault = {
    invalidName: "Invalid name.",
    invalidEmail: "Invalid email.",
    invalidPassword: "invalid password.",
    invalidId: "Invalid id.",
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
    AccessDenied: "Logged in user does not have access to this content"
}

const logRole = {
    roleNotFound: "Role not found.",
}

module.exports = {logDefault, logUser, logRole}