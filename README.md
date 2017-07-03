# summer-project

A project in node for the summer of '17.

## How to run:
> Step 1

Install node on your machine.
> Step 2

Install postgres.

Type `sudo apt-get update` and then `sudo apt-get install postgres postgres-contrib` on the terminal.

Configure postgres as in credentials var in `controllers/authController.js`.

> Step 4

Clone project on your machine.  `cd` into the project directory and type `npm install`.

> Step 5

Register for reCAPTCHA V2 on the domain `localhost` [here](https://www.google.com/recaptcha/intro/android.html).
Create a file called myRecaptcha.js in the main project directory and type
```
module.exports = {
  secretKey: 'YOUR_SERVER_SIDE_SECRET'
}
```

> Step 6

Create a directory called `SSL` in the root directory of the project. Type the following commands in the terminal to generate your self signed SSL Certificate
```
$ openssl genrsa -out key.pem 1024 
$ openssl req -new -key key.pem -out certrequest.csr
$ openssl x509 -req -in certrequest.csr -signkey key.pem -out cert.pem
```

> Step 7

`npm start` the project and type `localhost:3000` in your browser and you are ready to go! :smiley:


**Progress as of 19/06:** A simple register and login form implemented. Sessions managed properly. Database(PostgreSQL) connected.

**Progress as of 21/06:** reCAPTCHA added to registration form.

**Progress as of 25/06:** Node module `bcrypt` used to encrypt password on the server.

**Progress as of 30/06:** HTML5 Geolocation implemented. Latitude and Longitude submitted through register form.

**Progress as of 03/07:** HTTPS server used. Self-signed SSL certificate created.
