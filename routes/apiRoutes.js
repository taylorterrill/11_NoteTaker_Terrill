const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    // GET
    app.get("/api/notes", (request, response) => {
        console.log("\n\nExecuting GET notes request");

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("\nGET request returning notes " + JSON.stringify(data));

        response.json(data);
    });

    // POST

    // DELETE


}