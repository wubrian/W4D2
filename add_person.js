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

knex('famous_people').insert({
    first_name: process.argv[2],
    last_name: process.argv[3],
    birthdate: process.argv[4]
})
.returning('id')
.then((id => {
    console.log(id, "Knex insert is a success!");
}))

knex.select("*").from("famous_people")
.then(function (people) {
    people.forEach(function(person){
      console.log(person);
    });
  }).catch(function(err) {
    // All the error can be checked in this piece of code
    console.log(err);
  }).finally(function() {
    // To close the connection pool
    knex.destroy();
  });