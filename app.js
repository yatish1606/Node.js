const notesFunctionsLib = require('./notes.js')
const yargs = require('yargs')
const validator = require('validator')
const chalk = require('chalk')


yargs.command ({
    command:'Add',
    describe:'Add a new note',
    builder: {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe: 'Note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler: function (argv) {
        notesFunctionsLib.addNote(argv.title, argv.body)
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


yargs.parse()
