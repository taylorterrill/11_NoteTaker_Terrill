const { response } = require('express');
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
    app.post("/api/notes", (request, response) => {
        console.log("\n\nExecuting POST notes request");

        const newNote = request.body;
        newNote.id = uuidv4();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("Writing new note to db")
        
        data.push(newNote);

        fs.writeFile(
            './db/db.json',
            JSON.stringify(data),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes.')
          );

        console.log("\nPOST request returning notes " + JSON.stringify(data));
        

        response.json(data);
    });

    // DELETE
    app.delete("/api/notes/:id", (request, response) => {
        let noteId = request.params.id.toString();

        console.log(`\n\nDELETE note request for noteID: ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data, gets notes
        const newData = data.filter( note => note.id.toString() !== noteId);

        fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        response.json(newData);
    });
};