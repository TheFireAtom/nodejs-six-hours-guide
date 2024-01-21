const userDB = {
    users: require("../model/users.json"),
    setUser: function (data) { this.users = data}
}

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) res.status(400).json({"message": "Username and password are required"});
    // check for duplicate user in db
    const duplicate = userDB.users.find(user => user.username === username);
    if (duplicate) res.sendStatus(409);
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // store new user
        const newUser = {"username": username, "password": hashedPassword }
        userDB.setUser([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"), 
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({ "succes": `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ "message": err.message});
    }
}

module.exports = { handleNewUser };