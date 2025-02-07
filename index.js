const cool = require('cool-ascii-faces');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {

    const { username } = req.body;
    const { password } = req.body;

    if (!username) {
        res.status(418).send({ message: `Ты серьёзно??` });
    } else if (!password) {
        res.status(418).send({ message: `Блин ты чё? Где парол!?` });
    }
    if (username == "nik@gmx.de" && password == "123456") {
        res.status(200).send({
            status: "ok",
            message: `Logged in`,
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imthcm4ueW9uZ0BtZWNhbGxhcGkuY29tIiwiaWF0IjoxNjUwNDY3NzExfQ.sZoNO6DOw_4mtuCGRb68xW_gTfdeKdUPelucRndsN6I",
            user: {
                id: 1,
                fname: "Nikas",
                lname: "Kovalev",
                username: "nik@gmx.de",
                email: "nik@gmx.de",
                avatar: "https://www.mecallapi.com/users/1.png"
            }
        });
    } else {
        res.status(418).send({ message: `Login failed` });
    };
});

app.get('/api/auth/user', (req, res) => {
    res.status(200).send({
        status: "ok",
        user: {
            id: 1,
            fname: "Nikas",
            lname: "Kovalev",
            username: "nik@gmx.de",
            email: "nik@gmx.de",
            avatar: "https://www.mecallapi.com/users/1.png"
        }
    });
});

//JSON object to be added to cookie
let users = {
    name: "Nikas",
    Age: "18"
}

//Route for adding cookie
app.get('/setuser', (req, res) => {
    res.cookie("userData", users);
    res.send('user data added to cookie');
});

//Iterate users data from cookie
app.get('/getuser', (req, res) => {
    //shows all the cookies
    res.send(req.cookies);
});

//Route for destroying cookie
app.get('/logout', (req, res) => {
    //it will clear the userData cookie
    res.clearCookie('userData');
    res.send('user logout successfully');
});


//server listens to port 3000
app.listen(3000, (err) => {
    if (err)
        throw err;
    console.log('listening on port 3000');
});