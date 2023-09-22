const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.PORT || 3000;
const users = [];


app.get("/", (req, res) => {
    res.send('Hello World!!')
})

app.post("/account", (req, res) => {
    let name = req.body.name;
    let group = req.body.group;
    let variant = req.body.variant;
    let telephone = req.body.telephone;
    let isAdmin = req.body.isAdmin;
    // let photo = req.body.photo;
    let email = req.body.email;
    let password = req.body.password;

    if (
        !name || name.length == 0 ||
        !group || group.length == 0 ||
        !variant || variant.length == 0 ||
        !telephone || telephone.length == 0 ||
        // !photo || photo.length == 0 ||
        !email || email.length == 0 ||
        !password || password.length == 0
    ) {
        res.send({ status: "Missing attributes" });
        return;
    }

    users.forEach((user) => {
        if (user.email === email) {
            res.send({ status: "User already exists" });
            return;
        }
    });

    users.push({
        name,
        group,
        variant,
        telephone,
        isAdmin,
        // photo,
        email,
        password
    });

    console.log(users);
    res.send({ status: "Saved" });
})

app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (
        !email || email.length == 0 ||
        !password || password.length == 0
    ) {
        res.send({ status: "Missing attributes" });
        return;
    }

    users.forEach((user) => {
        if (user.email === email && user.password === password) {
            res.send({ status: "Ok" });
            return;
        }
    });

    res.send({ status: "Доступ заборонено" });
})

app.put("/account", (req, res) => {
    let name = req.body.name;
    let group = req.body.group;
    let variant = req.body.variant;
    let telephone = req.body.telephone;
    let isAdmin = req.body.isAdmin;
    // let photo = req.body.photo;
    let email = req.body.email;

    let user = null;
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if (u.email === email) {
            user = users[i];
            userIndex = i;
        }
    }

    if (!user) {
        res.send({ status: "User not found" });
        return;
    }

    let updatedUser = JSON.parse(JSON.stringify(user));

    if (name && name.length != 0) {
        updatedUser.name = name;
    }
    if (group && group.length != 0) {
        updatedUser.group = group;
    }
    if (variant && variant.length != 0) {
        updatedUser.variant = variant;
    }
    if (telephone && telephone.length != 0) {
        updatedUser.telephone = telephone;
    }
    // if (photo && photo.length != 0) {
        // updatedUser.photo = photo;
    // }
    updatedUser.isAdmin = isAdmin;

    console.log("name + " + name);
    console.log("updated user " + updatedUser.name);
    users[userIndex] = updatedUser;
    console.log(users);

    res.send({ status: "Saved" });
})

app.get("/account", (req, res) => {
    let email = req.query.email;

    let user = null;
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if (u.email === email) {
            user = users[i];
            userIndex = i;
        }
    }

    if (!user) {
        res.send({ status: "User not found" });
        return;
    }

    res.send({
        status: "Ok",
        user: {
            name: user.name,
            group: user.group,
            variant: user.variant,
            isAdmin: user.isAdmin,
            telephone: user.telephone,
            // photo: user.photo
        }
    });
})

app.delete("/account", (req, res) => {
    let email = req.body.email;
    console.log(email)

    let user = null;
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if (u.email === email) {
            user = users[i];
            userIndex = i;
        }
    }

    if (!user) {
        res.send({ status: "User not found" });
        return;
    }
    users.splice(userIndex, 1);
    res.send({ status: "Deleted" });
})

app.put("/password", (req, res) => {
    let email = req.body.email;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let user = null;
    users.forEach(u => {
        if (u.email === email) {
            user = u;
        }
    });

    if (!user) {
        res.send({ status: "User not found" });
        return;
    }

    if (user.password != oldPassword) {
        res.send({ status: "Wrong credentials" });
        return;
    }

    user.password = newPassword;

    res.send({ status: "Saved" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})