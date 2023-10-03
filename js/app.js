const addBtn = document.querySelector("#addBtn");
const main = document.querySelector(".main");

addBtn.addEventListener("click", function () {
  addNote(); // Call the addNote function
});

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tool">
        <i class="save fa fa-save"></i>
        <i class="trash fa fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`;

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  note.querySelector("textarea").addEventListener(
    "focusout",
    function(){
        saveNotes();
    }
  )
  main.appendChild(note);
  saveNotes();
};

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes")) || [];
  lsnotes.forEach((lsnote) => {
    addNote(lsnote);
  });
  
  if (lsnotes.length === 0) {
    addNote();
  }
})();
