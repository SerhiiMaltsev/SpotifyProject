Friendify Documentation
Introduction:
The Friendify App, using Spotify’s API, provides Spotify users with authentication to have access to social components via React App, Express, and Firebase.

In using the Spotify API, all developers will need access to the Spotify Developer Account that provides a client id and secret that will be used to grant an access token. 

Most of the app incorporates Material UI Components such as Buttons, AppBar, Toolbar, IconButton, Typography, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Dialog, DialogTitle, Divider, Grid, TextField, FormControl, DialogContent, DialogActions, and various other icons to represent sending and clearing.

This app consists of 7 main components within 6 pages to this application:

Login page
Home page
Navbar
Inbox
Discover
Top Music
Forum 

Login page:
The Login page allows for users to log into their Spotify accounts so that they receive a valid access token. The Spotify authentication feature allows us to have a unique access token for each user so that we are able to use the Spotify API calls to get their username, liked songs, top songs, and top artists.

Navigation Bar:
Once logged in, a material ui navbar is accessible at the top of the app to switch between all of the main pages using react router. At the right of the navbar is a logout button that will take you back to the login page. The navbar is a reusable component at the top of every page except for the login page. It mainly uses the react router to link all the pages together.

Home page:
The Home page, synonymous with our User Profile Page, where users can view and edit their bio as well as display artists and songs from their Top/Liked pages or change their privacy setting. This is the page that is immediately displayed after the log in and authentication process. There are 4 main API calls made through Express. The first two make API calls to Spotify’s API for “Top [songs/artists]”, respectively. The remaining two make API calls to our Firebase database for the current user’s bio and privacy setting. Because the bio and privacy are editable from the user perspective, the API calls use post to send any edits back to the database and ensure the most updated selection is displayed on the frontend.

Discover Page:
Discover Page allows users to find all the other users of the application (however, only if their privacy settings are set to public). This page contains a list of all users of the application with a send message button right next to each name of the user. By clicking this button, a user can send a text message to another user. By clicking the send message button, use opens a separate component called MessageIcon. Each MessageIcon is attributed to a specific user and has two input fields for title and body of the message. It also contains two buttons “send” and “exit” that allow the user to send a message and close the MessageIcon component. After clicking the “send” button, the message is passed and stored in the database. 

Inbox Page:
Inbox Page allows users to access the history of their text messages. It shows all messages that the user either sent or received in the chronological order. Each message contains information about the sender, recipient, topic, and body of the message. All messages are retrieved from the database. In the Inbox component there is an API call that allows to get all the messages of the user from the database. After retrieving the messages from the database, messages are mapped on the inbox page.

Liked Songs Page:
In the Liked Songs Page, the user’s liked songs with album pictures are displayed. This is through the Spotify API for “tracks”.
The Spotify API is accessed on the backend using the access token and the limit of liked songs is set to 20. 
The object returned by the API has a name field and an album image field which is accessed and displayed using material UI

Top Music Page:
Each Song or Artist displays a picture and a name
Uses the Spotify API to pull data using the unique access token provided during the login
Ability to toggle either the User’s top ten songs or artists through a dropdown
Forum Page:
It displays all of the discussion boards
Displays messages/announcements openly. Users can add new posts and view existing posts
It makes an API call using express to the backend. On the backend, the getdocs command is used to pull data from the firebase database and is then displayed. When trying to make a new post, the addDoc command is used to add new data to the firebase database.



react-router-dom usage:
It is mainly used to link all the pages together in the navbar. The Browser Router, Routes, and link to are the most used functions of the react-router.

Firebase usage: 
The firebase.js is the file on the backend with all the database information which is exported as db and used extensively on all the backend files to connect to the database.
We have 3 collections in our Firebase database: “users”, “textmessages”, and “forums”. In the users collection, we save data based on 4 fields: name, private, token, and bio. In the textmessages collection, we use 5 fields: message, recipient, sender, time, and title. Lastly in the forums page, we use 3 fields: message, name and title. All of these fields are required.

Links: Tutorials and screencasts discussing different ways of using the API used in Friendify.

Spotify API + Methods
Spotify App Settings
Spotify Authorization (don’t use PKCE extension) + Scopes
Express
Firebase
Material UI
