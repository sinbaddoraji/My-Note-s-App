const form = document.querySelector('form');
const titleInput = document.getElementById('title-input');
const noteInput = document.getElementById('note-input');
const deleteBtn = document.getElementById('delete-btn');

function getNoteIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getNoteById(id) {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    return notes.find((note) => note.id === parseInt(id));
}

function updateNoteById(id, updatedNote) {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const index = notes.findIndex((note) => note.id === parseInt(id));
    if (index !== -1) {
        notes[index] = updatedNote;
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function deleteNoteById(id) {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const filteredNotes = notes.filter((note) => note.id !== parseInt(id));
    localStorage.setItem('notes', JSON.stringify(filteredNotes));

    window.location.href = 'list.html';
}

function populateFormWithNoteData(note) {
    titleInput.value = note.title || '';
    noteInput.value = note.text || '';
}

const noteId = getNoteIdFromUrl();
const note = getNoteById(noteId);

if (note) {
    populateFormWithNoteData(note);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const updatedNote = {
            id: note.id,
            title: titleInput.value,
            text: noteInput.value
        };

        updateNoteById(note.id, updatedNote);
        window.location.href = 'list.html';
    });

    deleteBtn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to delete this note?');
        if (confirmed) {
            deleteNoteById(note.id);
        }
    });
} else {
    window.location.href = 'list.html';
}
