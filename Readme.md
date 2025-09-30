# Backend Learning
Now going to start backend from Chai aur Code. with javascript

-[MODEL LINK]

## Setup of Backend ( day 1)

``` html
1. Installed dev dependies 

 *nodemon : which just refresh the project on saving changes on run time. (command : npm i -D nodemon)

*prettier : which make our project scalable for long period of time. (command : npm i -D prettier)
(for formatting purpose and common standardization)
```
### Basic commands for setup :
1.  <span style= "color: green"> npm i -D nodemon </span>
2.  <span style= "color: green"> npm i -D prettier </span>

## Project Directory structure created
```
node_modules/
public/
└── temp/
    └── .gitkeep

src/
├── controllers/
├── Db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── constans.js
└── index.js

.env
.env.sample
.gitignore
.prettierignore
.prettierrc
package-lock.json
package.json
Readme.md
```
Note :  Here we just creted the project directory structure. 
1. we are using '.gitignore' file to not upload important files on github.
2. also using '.prettierignore' file to not change the format of specific files. 

## Packages installed

1. <span style= "color: green"> npm i mongoose </span>
2. <span style= "color: green"> npm i express </span>
3. <span style= "color: green"> npm i dotenv </span>

## Day 2 (Connected MongoDb database )
```
today I learn about how to connect mongoDb data base. for that I use Online data base
```
here is the database site : [Monogo Db Database](https://cloud.mongodb.com/v2/68db99859b00603e6abeb0eb#/clusters)
### Steps for connecting Data Base
```
Note: I used free shared plan
```
```
1. need to create account on 'MongoDbAtlas' site
2. create a project 
3. Add new Database access
4. Add new Network access.
5. in cluster/database section click connect and copy that connection string ( we use compass)
```
```
connection string : mongodb+srv://Parth:<db_password>@cluster0.jrnfayp.mongodb.net/
```
```
use this above connection string in your Application to connect to data base 
```
I used this code to connect to data base and call this function from index.js file 
```javascript 
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance}`);
  } catch (error) {
    console.log("MONGODB Connection error");
    process.exit(1);
  }
};
export connectDB;
```


## Good Practices..
```
1. Always write code of data base in 'try - catch '
2. Your database is in another continent always use 'Async- await'
```