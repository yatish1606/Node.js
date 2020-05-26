const fs = require('fs')
const chalk = require('chalk')

const addNote = function (title,body) {
    const notes = loadNotes()

    const duplicateNote = notes.find( function (note) {
        return note.title === title
    })

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)
        console.log('New note added successfully')
    } else {
        console.log('Duplicate note')
    }
    
}

const removeNote = function (title) {
    const notes = loadNotes()

    console.log('remove note funciton called for note of title ' + title)

    const newNotes = notes.filter( function (note) {
        return note.title !== title
    })

    if(notes.length === newNotes.length) {
        console.log(chalk.red('Given title does not exist!'))
    } else {
        console.log(chalk.green('Note removed successfully'))
        saveNotes(newNotes)
    }

}

const listNotes = function () {
    const notes = loadNotes()
    console.log(chalk.blue('Your Notes'))
    notes.forEach(eachNote => {
        console.log(chalk.white(eachNote.title))
    });
}

const readNote = function (title) {
    const notes = loadNotes()
    const foundNote = notes.find( (note) => note.title === title)
    
    if(foundNote) {
        console.log(chalk.greenBright('Note found'))
        console.log( chalk.yellow('Title : ') + chalk.white(foundNote.title))
        console.log( chalk.yellow('Body : ') + chalk.white(foundNote.body))
    } else {
        console.log(chalk.bgRedBright('ERROR'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNote: readNote
}