export const authHeader = () => {
    const Token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
    if (Token) {
      return { Authorization: Token };
    }
    return {};
};