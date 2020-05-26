const fs = require('fs')
const chalk = require('chalk')


const getNotes = function () {
    return 'These are your notes'
}

const addNote = function (title,body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter( function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
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
    getNotes: getNotes,
    addNote : addNote,
    removeNote : removeNote
}