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

  addToken(token) {
    this.token = token;
  }
  
  async getRandom(n) {
    var posts = await axios({
      url: this.root + '/photos/random?limit=' + (n || 10) + '&access_token=' + this.token
    });
    return posts.data;
  }

  async getProfile(id,page) {
    var profile = await axios({
      url: this.root + '/users/' + id + '/photos?access_token=' + this.token + '&page=' + (page || 1) + '&order%5Bcreated_at%5D=desc&statuses%5B%5D=on_market&statuses%5B%5D=in_mission&force_cache_miss=true'
    });
    return profile.data;
  }
  
  async rate(id,rating) {
    var res = await axios({
      url: this.root + '/photos/' + id + '/ratings',
      method: 'POST',
      data: {
        "access_token": this.token,
        "rating": {
          "value": rating || 5
        }
      }
    });
    return res.data;
  }

  async upload(path,caption,tags) {
    var data = new fd();
    data.append("photo[image_attachment]",fs.createReadStream(path));
    var res = await axios({
      url: this.root + '/photos?access_token=' + this.token,
      method: 'POST',
      data: data,
      headers: data.getHeaders()
    });
    var img_id = res.data.photo.id;
    var img = await axios({
      url: this.root + '/photos/' + img_id + '?access_token=' + this.token,
      method: 'PUT',
      data: {
        "photo": {
	  "caption": caption,
          "license_faces_recognized": false,
          "license_permissions_granted": false,
          "license_with_people": false,
          "tags": tags
        }
      }
    });
    return img.data;
  }
}
