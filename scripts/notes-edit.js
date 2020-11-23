const noteId = location.hash.substring(1)
const notes = getSavedNotes()
const titleEle = document.querySelector('#note-title')
const bodyEle = document.querySelector('#note-body')
const dateElement = document.querySelector('#last-edited')

const note = notes.find( (note) =>  note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleEle.value = note.title
bodyEle.value = note.body
dateElement.textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`

//updating title
titleEle.addEventListener('input', (e) => {
    // notes.forEach(function (note) {
    //     if (note.id === note.id) {
    //         note.title = document.querySelector('#note-title').value
    //         note.updatedAt = moment().valueOf()
    //     }
    // })

    note.title = e.target.value //this works too
    saveNotes(notes)
})

//updating body
bodyEle.addEventListener('input', (e) => {
    // notes.forEach(function (note) {
    //     if (note.id === note.id) {
    //         note.body = document.querySelector('#note-body').value
    //         note.updatedAt = moment().valueOf()
    //     }
    // });

    note.body = e.target.value
    saveNotes(notes)
})

//removing note from edit page
document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')//redirection
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)

        note = notes.find( (note) => note.id === noteId//arrow shorthand
        )
        
        if (!note) {
            location.assign('/index.html')
        }
        
        titleEle.value = note.title
        bodyEle.value = note.body
    }
})