export const setAuthorizationToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
}
