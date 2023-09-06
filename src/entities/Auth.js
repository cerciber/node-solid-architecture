// Imports
const jwt = require('jsonwebtoken');
const config = require('@src/utils/config');

// Entity
class Auth {
  #sectetKey;

  #duration;

  constructor() {
    this.#sectetKey = config.application.jwtSectetKey;
    this.#duration = config.application.jwtDuration;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.#sectetKey, {
      expiresIn: this.#duration,
    });
  }
}

// Exports
module.exports = Auth;
