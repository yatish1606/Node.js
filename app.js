const getNotes = require('./notes.js')
const yargs = require('yargs')
const validator = require('validator')
const chalk = require('chalk')


yargs.command ({
    command:'Add',
    describe:'Add a new node',
    handler: function () {
        console.log('Adding a new note')
    }
})

yargs.command ({
    command:'Remove',
    describe: 'Remove a note',
    handler : function () {
        console.log('Removing a note')
    }
})

yargs.command ({
    command:'List',
    describe:'Display List of notes',
    handler : function () {
        console.log('Displaying the list')
    }
})

yargs.command ({
    command:'Read',
    describe:'Read List of notes',
    handler : function () {
        console.log('Read the list')
    }
})




console.log(yargs.argv)
