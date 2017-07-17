# NIC Night Duty App

A project made at NIC in front end technologies (HTML, CSS and JavaScript) and server made using Node.JS. PostgreSQL used as DBMS. 
Apache Cordova to be used as well.

## Description

Employees at NIC have Night Duty at their Data Centers. The app is supposed to manage the duties of all employees.
This will be ensured using geolocation services. The employees will be supposed to send geotagged images at the datacenters along with timestamp.

## Key Features

- User registration
- User profile. User can edit details
- Creating a data centers
- Creating location for verification at data centers
- Photo sharing and notification to admin when photo has been shared. (To be implemented)

## How to run:
> Step 1

Install node on your machine.
> Step 2

Install postgres.

Type `sudo apt-get update` and then `sudo apt-get install postgres postgres-contrib` on the terminal.

Configure postgres as in credentials var in `dbConnect.js` in the root directory of the project.

> Step 3

Clone project on your machine.  `cd` into the project directory and type `npm install`.

> Step 4

Register for reCAPTCHA V2 on the domain `localhost` [here](https://www.google.com/recaptcha/intro/android.html).
Create a file called recaptcha.js in the main project directory and type
```
module.exports = {
  'key': 'YOUR_SERVER_SIDE_SECRET'
}
```

> Step 5

`npm start` the project and type `localhost:3000` in your browser and you are ready to go! :smiley:
