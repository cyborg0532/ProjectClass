document.addEventListener("DOMContentLoaded", () => {
    let notes = window.loadData('dlm_notes', []);
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note-btn");
    const notesList = document.getElementById("notes-list");

    if (notesList) {
        function renderNotes() {
            notesList.innerHTML = ""; 
            
            notes.forEach((note, index) => {
                const li = document.createElement("li");
                li.className = "list-item fade-in"; 
                li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${note.completed ? "checked" : ""} data-index="${index}">
                        <span>${note.text}</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;
                notesList.appendChild(li);
            });
        }
        renderNotes();

        addNoteBtn.addEventListener("click", () => {
            const text = noteInput.value.trim(); 
            
            if (text) {
                notes.push({ text: text });
                
                window.saveData('dlm_notes', notes);
                noteInput.value = ""; 
                renderNotes(); 
            }
        });

        
        notesList.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const index = e.target.getAttribute("data-index");
                if (index === null) return;
                
                notes.splice(index, 1);
                
                window.saveData('dlm_notes', notes);
                renderNotes();
            }
        });
    }
});