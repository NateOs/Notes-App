//Read existing notes from local storage 
const getSavedNotes = () => {
    //Check for existing saved data
    const notesJSON = localStorage.getItem('notes')
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// Save notes    
const saveNotes =  (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))    
}

//remove notes
const removeNote =  (id) => {
    const noteIndex = notes.findIndex( (note) =>  note.id === id ) //arrow short syntax used here

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate NoteDOM
const generateNoteDom = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const button = document.createElement('button')
    const statusEl = document.createElement('p')

    //setup the remove notes button
    button.textContent = 'x'
    noteEl.appendChild(button)
    
    button.addEventListener('click', () => {        
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup the status message  
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort( (a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1 
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1 
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else  if (sortBy === 'alphabetical') {
        return notes.sort( (a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes 
    }
}

// Render Application Notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter( (note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

//Generate Last Edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}