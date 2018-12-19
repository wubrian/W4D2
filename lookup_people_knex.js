const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
  });

// takes in argument
const command = process.argv[2];

/*
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
*/

knex.select('*').from('famous_people')
  .where('first_name', command)
  .orWhere('last_name', command)
  .asCallback(function(err, res) {
    if (err) return console.error(err);
    console.log("searching...");
    console.log("Found 2 person(s) by the name 'Paul':");
    var i = 1;
    res.forEach(function(element){
        const date = element.birthdate.toDateString()
        console.log("- "+i+": "+element.first_name, element.last_name, ", born " + date);
        i++;
    })
    knex.destroy();
  });