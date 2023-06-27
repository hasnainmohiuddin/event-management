### Phone App

The Phone Book application is a user-friendly software program that enables individuals to manage and organize their contact information on their device. With this application, users can easily store, update, and retrieve contact details such as names and phone numbers. The application provides an intuitive interface for managing contacts, making it easy to add new entries, delete or edit existing ones and search for specific contacts.

## Stacks
This project utilizes a combination of technologies including `React, Express, Node.js, Mysql, and Docker`. The frontend of the application is built using React, along with Material UI for design elements. No routing libraries have been implemented in this project. On the backend, the application is powered by a MySQL database, with Express and Sequelize used for data management and API routing. `Nginx` is utilized to coordinate the connection between the frontend and backend, directing API calls to the appropriate routes within the same container. Overall, this project is designed to be containerized and deployed with Docker.

## How to run
In order to build and run all the services, you can use the docker-compose up command. This will start the React, Node.js, Nginx and Postgres services and make them available at the specified ports.

`docker-compose up --build`

it will spin up four containers, one for the React app, one for the Node.js server, one for nginx and one for postgres, and map the ports 3000, 4000, 80 and 5432 respectively to the host. You should then be able to access the React app by going to http://localhost:3000 and the Node.js server by going to http://localhost:4000.

### Create Database

To set up a database for this project, you will first need to connect to the PostgreSQL container. This can be done by running the command

- `docker exec -it <image-name> bash`

Once connected to the container, you will need to access the psql command line interface by running

- `mysql -U root`

Finally, you can create a new database by executing the command
- `CREATE DATABASE event_manager;`

within the mysql interface. This will create a new database named "event_manager" that can be used to store the contact information for the Phone Book application. Keep in mind that you need to replace the `<image-name>` with the name of your container.

### You can now access the application by visiting the following URL:

- http://localhost:3080

This URL will direct you to the application running on port 3080.
