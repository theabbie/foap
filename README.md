# Foap API

![FOAP](https://user-images.githubusercontent.com/17960677/102477690-af8b4c00-4082-11eb-824c-8a0527b514dd.png)

>**Unofficial Foap API**

## Example

The Following Code snippet will help you understand how to use this.

```js
var Foap = require("foap");
var foap = new Foap();

(async function() {
  await foap.login("email@example.com","password");
  // or
  foap.addToken(token) // recommended

  await foap.upload("path_to_image","caption",["tags"]);
  // Upload An Image

  await foap.getRandom(n); // get n random posts

  await foap.getProfile(id); // get Profile by ID

  await foap.rate(image_id); // Rate an image
})();
```

## Contributing

Thank you for your interest in contributing, If you feel like there's something missing or any new feature can be added, just create a PR and I will see the rest.

## Help

You can contact me on social media, Everything about me can be found [here](https://theabbie.github.io)

## Installation

### Requirements

* Node.Js installed

### Dev Dependencies

* Axios
* Form-Data

## Credits

* [FOAP](https://foap.com) For Creating an excellent Platform.

## Contact

Contact me anywhere, just visit [my portfolio](https://theabbie.github.io)

## License

This project is licensed under MIT License, See [LICENSE](/LICENSE) for more information

