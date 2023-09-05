const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const urlencodedParser = bodyparser.urlencoded({ extended: false });
const { check, validationResult } = require("express-validator")

const app = express();
app.use("/assets", express.static("assets"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "nodejs",
    dateStrings: true
});

//connect to DB
connection.connect(function (error) {
    if (error) throw error
    else console.log("connection successful!")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/main.html");
})

app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/student", function (req, res) {
    res.sendFile(__dirname + "/student.html");
})

app.get("/add", function (req, res) {
    res.render('user_add', {
        title: 'Add New Student'
    })
})


app.post('/save', (req, res) => {
    let data = { rollno: req.body.rollno, stuname: req.body.stuname, dob: req.body.dob, score: req.body.score }
    let sql = "INSERT INTO students SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/user_index');
    });
});

app.post("/result", urlencodedParser, (req, res) => {
    const errors = validationResult(req)
    var rollno = req.body.rollno;
    var dob = req.body.dob
    connection.query("select * from students where rollno = ? and dob = ?", [rollno, dob], function (error, results, fields) {
        if (results.length > 0 && errors.isEmpty()) {
            res.render("results", {
                name: results[0].stuname,
                score: results[0].score,
                sdob: dob,
                srollno: rollno
            });
        } else {
            res.redirect("/invalid3");
        }
        res.end();
    })
})

app.post('/update', (req, res) => {
    const stuId = req.body.id;
    let sql = "UPDATE students SET rollno = '" + req.body.rollno + "', stuname = '" + req.body.stuname + "', dob = '" + req.body.dob + "', score = '" + req.body.score + "' where id = " + stuId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/user_index');
    });
});


app.get('/edit/:stuId', (req, res) => {
    const stuId = req.params.stuId;
    let sql = `SELECT * from students where id = ${stuId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user_edit', {
            title: 'Edit Student Details',
            student: result[0]
        });
    });
});

app.get('/delete/:stuId', (req, res) => {
    const stuId = req.params.stuId;
    let sql = `DELETE from students where id = ${stuId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/user_index');
    });
});

app.post("/index", urlencodedParser, [
    check('email', 'Email must be valid')
        .isEmail()
        .normalizeEmail()

], (req, res) => {
    const errors = validationResult(req)
    var email = req.body.email;
    var password = req.body.password
    connection.query("select * from users where email = ? and password = ?", [email, password], function (error, results, fields) {
        if (results.length > 0 && errors.isEmpty()) {
            res.redirect("/user_index");
        } else {
            res.redirect("/invalid");
        }
        res.end();
    })
})

app.post("/student", urlencodedParser, [
    check('email', 'Email must be valid')
        .isEmail()
        .normalizeEmail()

], (req, res) => {
    const errors = validationResult(req)
    var email = req.body.email;
    var password = req.body.password
    connection.query("select * from teachers where temail = ? and tpassword = ?", [email, password], function (error, results, fields) {
        if (results.length > 0 && errors.isEmpty()) {
            res.redirect("/stu_dash");
        } else {
            res.redirect("/invalid2");
        }
        res.end();
    })
})


app.get('/user_index', (req, res) => {
    let sql = "select * from students";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('user_index', {
            title: 'Student Data Dashboard',
            students: rows
        })
    })
})


app.get('/stu_dash', (req, res) => {
    let sql = "select * from teachers";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('stu_dash', {
            title: 'Find Your Score',
            students: rows
        })
    })
})

//set view file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');


//success login
app.get("/user_index", function (req, res) {
    res.render('user_index');
})
app.get("/invalid", function (req, res) {
    res.render('invalid');
})
app.get("/results", function (req, res) {
    res.render('results');
})
app.get("/stu_dash", function (req, res) {
    res.render('stu_dash');
})
app.get("/invalid2", function (req, res) {
    res.render('invalid2');
})
app.get("/invalid3", function (req, res) {
    res.render('invalid3');
})

//app port
app.listen(4500);