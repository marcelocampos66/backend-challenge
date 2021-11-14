const API_URL = process.env.REACT_APP_API_URL || 'http://localhost';
const PORT = process.env.REACT_APP_API_PORT || 3001;

class Api {

  constructor(url, port) {
    this.url = `${url}:${port}`;
    this.content = 'application/json';
  };

  async registerUser(newUser) {
    const endpoint = `${this.url}/users`;
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': this.content,
      },
      body: JSON.stringify({ ...newUser }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => err);
  };

  async getAllUsers() {
    const endpoint = `${this.url}/users`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': this.content,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => err);
  };

}

export default new Api(API_URL, PORT);
