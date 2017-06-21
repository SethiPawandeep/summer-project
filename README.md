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

> Step 6

`npm start` the project and type `localhost:3000` in your browser and you are ready to go! :smiley:


**Progress as of 19/06:** A simple register and login form implemented. Sessions managed properly. Database(PostgreSQL) connected.

**Progress as of 21/06:** reCAPTCHA added to registration form.
