<h1>Full Stack website created using react, express, and mysql</h1>

CSS was not my main concern, which is why I didn't focus on it a whole lot. The main reason for this app was to learn nodes and express and how to integrate mysql with node applications.
</br>
The reason I used MySQL and not mongoDB was because I want to get better with relational database. It is because, I think that I can learn more with relational database.

<h3>What I used for this website</h3>
<ul>
  <li>React for frontend</li>
  <li>Node js and express for backend</li>
  <li>Sequelize package to help communicate with the MySQL databse</li>
  <li>MySQL as a database</li>
</ul>

A few interesting concepts I was introduced to by this project: Sequelize and Context variables in react.
</br>

Below are a few screenshots of the website: 

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/a15e8bea-159b-4f48-a21f-666314f2282c)

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/a97a308b-91b7-41cb-b9ac-1a03d928976f)

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/3b5bebff-0eff-4ad8-88f1-36eb2d8db652)

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/667890ab-b2e6-42af-b94d-512e11d58c9a)

</br>
To start the react app, go to the client folder. After that run the command "npm i" to install node modules and then run "npm start"

</br>
Starting the express app is a little more work. I can't upload my database schema here, which is why you will need to create a schema. I also didn't add the config.json file here, because it containted information about my database. So, to start, you will first need to create a folder "config" and inside of if, you need to add a config.json file. 

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/df45605a-abf9-4ba2-a80c-32ca02544865)

</br>
and you need to fill the config file like this:

![image](https://github.com/IbrahimBM2714/full-stack-posts-website/assets/115867055/abd90cc6-8715-4fa5-9c32-2a1462c7c62a)

</br>
After this, you just need to run the command "npm i" to install the node modules folder. At the end, run "npm start" to run the app. With this, hopefully, the website will start functioning. 
</br>
You will also need to instal libraries such as: bcrypt, cors, express, jsobwebtoken, mysql2, nodemon, sequelize, sequelize-cli for the backend. And axios and react-router-dom for the frontend


