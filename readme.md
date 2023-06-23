# About this project: Holiday fun!
The project successfully created a web application that allows users to register, log in, input and browse activity information, and generate recommendations based on that data.

## How to run?
1. In the config.db file, change the username, password and port to your own account to link to the MongoDB database.

2. Install some package, for example:
```
npm install express
```

3. connect to mongoDB through unnelling with a jump host:
```
ssh -J <username>@<username>.host.cs.st-andrews.ac.uk <username>@<some lab pc>.cs.st-andrews.ac.uk -L 8888:localhost:8888 -N
```

4. insert initial data about default posts:(this command only need to be run the first time to run the project)
```
node insertdata.js
```

5. Input the following code on another terminal and run.
```
node server.js
```

## Usage
1. Use sign in to create an account or login by the default account
 _id: Joe
 password: password

2. on the index.html, click on the map to get the location and it's weather, or use the search bar to get the weather of the location input

3. click 'Home' to back to index.html

4. click 'Upload Post' to go upload page, fill in each part including img and then click make post to upload a new post

5. click the dropdown options of 'Categories' or directly click on the navigation bar 'Beach','Food' and else to view posts of this type, use filter on the top-right to filter the posts by time and rating, click 'view' to read the detial of the post and its relative comments

6. On the main page, you can view the 5 most recent posts posted by users and also view five random posts from the database.


