# Campertrek E commerce-Website

## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)


## Introduction

An Social media web application build using Node js, Express js in the backend, MongoDb for database management and React.js to render User Interfaces.

NOTE: Please read the RUN section before opening an issue.

## Demo

This is a Social media web application where users can post their pictures, view other people profiles, like post, add/remove friend. 


![This is an image](/Campertrek.png)
![This is an image](/ecommerce-1.png)
![This is an image](/ecommerce.png)
## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- NODE_ENV: Specify the enviroment as development of production

- PORT: Specify the port Number

- MONGO_URI: Specify the Mongodb URI to access the database

- JWT_SECRET: Specify the secret which is used to generate JWT token on authorization


After you've set these environmental variables in the .env file at the server folder of the project, and intsall node modules using  `npm install` in both server and client folder.

Now you can run `npm run dev` in the terminal to run server and 'npm start' to run client and the application should work.

## Technology

The application is built with:

- Node.js 
- MongoDB
- Express.js
- JWT authentication and authorization
- MVC architecture
- Request protection using helmet
- React.js
- Redux and Redux toolkit for global state management
- Redux persist to store redux store in localstorage
- React router dom for client routes
- Material UI for user interfaces
- Formik for form handling and Yup for validation
- Image upload using multer grid-fs storage
- Used Eslint airbnb configuration and some custom rules to maintain code standards


## Features

The application displays different posts posted by users, logged in users friends list and their posts

Users can do the following:

- Create an account, login or logout
- View friends list
- View friends of friend
- Add friend
- Remove friend
- Like/dislike post
- Change mode to dark/ light
- Upload a post




 Copyright 2022 © [Jafin Jahfar](https://github.com/jafi01)
