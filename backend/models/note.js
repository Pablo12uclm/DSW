// models/note.js

class Note {
    constructor(id, title, content, items = [], images = [], check = false) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.items = items; // Lista de ítems de texto
      this.images = images; // URLs de las imágenes
      this.check = check;
    }
  }
  