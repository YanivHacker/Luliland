const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

module.exports = {getCurrentUser}