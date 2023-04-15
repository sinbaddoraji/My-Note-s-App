const form = document.querySelector('form');
const titleInput = document.getElementById('title-input');
const noteInput = document.getElementById('note-input');

function addNote() {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const newNote = {
        id: Date.now(),
        title: titleInput.value,
        text: noteInput.value
    };

    notes.push(newNote);

    localStorage.setItem('notes', JSON.stringify(notes));

    window.location.href = 'list.html';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addNote();
});
