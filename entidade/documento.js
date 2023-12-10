export class Documento {
    #documento;
    constructor(documento = "") {
      this.#documento = documento.replace(/\D/g, "");
    }
    isValid() {
      return this.#documento.length === 11 || this.#documento.length === 14;
    }
  
    equals(documento) {
      return this.toString() === documento.toString();
    }
  }
  