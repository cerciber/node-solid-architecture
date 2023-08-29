// Entity
class User {
  #id;

  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  set id(newId) {
    this.#id = newId;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  toString() {
    return `User: { id: ${this.#id}, name: ${this.#name} }`;
  }
}

// Exports
module.exports = User;
