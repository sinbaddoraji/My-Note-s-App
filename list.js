const notesList = document.getElementById('notes-list');
const clearAllBtn = document.getElementById('clear-all-btn');

function truncateText(text, length) {
    if (!text) {
        return '';
    }

    const truncated = text.length > length ? text.substr(0, length) + '...' : text;
    return truncated.replace(/(<([^>]+)>)/gi, '');
}

function displayNotes(notes) {
    notesList.innerHTML = '';

    notes.forEach((note) => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        h3.textContent = note.title;
        p.textContent = truncateText(note.text, 165);

        li.appendChild(h3);
        li.appendChild(p);

        li.addEventListener('click', () => {
            window.location.href = `edit.html?id=${note.id}`;
        });

        notesList.appendChild(li);
    });
}

function clearAllNotes() {
    const confirmed = confirm('Are you sure you want to clear all notes?');
    if (confirmed) {
        localStorage.removeItem('notes');
        displayNotes([]);
    }
}

clearAllBtn.addEventListener('click', clearAllNotes);

const storedNotes = localStorage.getItem('notes');
const notes = storedNotes ? JSON.parse(storedNotes) : [];

displayNotes(notes);
