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
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler : function (argv) {
        notesFunctionsLib.removeNote(argv.title)
    }
})

yargs.command ({
    command:'List',
    describe:'Display List of notes',
    handler : function () {
        notesFunctionsLib.listNotes()
    }
})

yargs.command ({
    command:'Read',
    describe:'Read List of notes',
    builder : {
        title : {
            describe: 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : function (argv) {
        notesFunctionsLib.readNote(argv.title)
    }
})


yargs.parse()
