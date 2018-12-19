const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// takes in argument
const command = process.argv[2];

function listPeople(db) {
    db.query(`SELECT * FROM famous_people WHERE first_name = '${command}' OR last_name = '${command}';`, (err, res) => {
        if (err) throw err;
        console.log("searching...");
        console.log("Found 2 person(s) by the name 'Paul':");
        var i = 1;
        res.rows.forEach(function(element){
            const date = element.birthdate.toDateString()
            console.log("- "+i+": "+element.first_name, element.last_name, ", born " + date);
            i++;
        })
      db.end();
    });
  }

client.connect((err) => {
    listPeople(client);
  });