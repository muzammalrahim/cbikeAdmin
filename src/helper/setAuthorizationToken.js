export const setAuthorizationToken = (token) => {
    localStorage.setItem("adminToken", JSON.stringify(token));
}
