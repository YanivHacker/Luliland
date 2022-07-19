const getCurrentUser = () => {
    const res = localStorage.getItem("user");
    debugger
    console.log()
    if(res) {
        const user = JSON.parse(JSON.stringify(res));
        if (user)
            return user
        else
            return null
    }
    return null;
}

module.exports = {getCurrentUser}