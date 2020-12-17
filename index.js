var axios = require("axios");
var fd = require("form-data");
var fs = require("fs");

module.exports = class Foap {
  constructor() {
    this.root = 'https://api.foap.com/v3'; 
  }
 
  async login(email,password) {
    this.email = email;
    this.password = password;
    var token = await axios({
      url: this.root + '/users/authenticate',
      method: 'POST',
      data: {
        "user": {
          "email_username": this.email,
          "password": this.password
        }
      }
    });
    this.token = token.data["access_token"];
    this.uid = token.data.user.id;
    this.username = token.data.user.username;
    return token.data;
  }
}
