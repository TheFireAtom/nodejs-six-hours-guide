const userDB = {
    users: require("../model/employees.json"),
    setUser: function (data) { this.users = data }
}

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password ) res.status(400).json({ "message": "Username and password are required"});
    // username handling
    const foundUser = userDB.users.find(user => user.username === username);
    if (!foundUser) res.status(401).json({ "message": `User with username ${username} not found`});
    // password handling
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // creating JWT (in future)
        res.status(200).json({ "success": `Username ${username} has been found!`};)
    } else {
        res.status(401);
    }
}

module.exports = { handleLogin };