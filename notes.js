const fs = require('fs');
const chalk = require('chalk');
const { array } = require('yargs');

const getNotes = function () {
    return "your notes";
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return title !== note.title;
    });

    if (duplicateNotes.length < notes.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(duplicateNotes);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
}