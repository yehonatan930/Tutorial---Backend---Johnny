# Training template - Backend

## Description
Initial template for training.

## Initial Run
Enter the database connection details in the .env file

To create database tables based on your entities, do the following:
1. Create the entity file
2. Go to src/utils/data-source.ts, and change 'synchronize' value to 'true'
3. Run npm start

Don't forget to change 'synchronize' to false after you're done, it's not an option meant for production.

## Installation
```bash
$ npm install
```

## Running the app
```bash
$ npm run start
```
<br>

## Project Structure
### **models**
Contains a folder for each entity. 
Each folder contains:
*  Controller - DB actions
*  Entity - DB model
*  Route - Linking api routes with DB actions

### **utils/cors.ts**
Contains middleware that's supposed to prevent CORS errors

### **utils/data-source.ts**
Contains all the configurations for the DB connection

### **index.ts**
Main file, server setup