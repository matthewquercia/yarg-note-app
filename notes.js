const fs = require('fs');
const chalk = require('chalk');
const { array } = require('yargs');

const readNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title === title);

    if (noteFound) {
        console.log(chalk.inverse(noteFound.title));
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
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
    const duplicateNotes = notes.filter((note) => title !== note.title);

    if (duplicateNotes.length < notes.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(duplicateNotes);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    });
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
    readNote,
    addNote,
    removeNote,
    listNotes
}