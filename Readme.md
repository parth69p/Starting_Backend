# Backend Learning
Now going to start backend from Chai aur Code. with javascript

-[MODEL LINK](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

<strong >Packages Used</strong>

```
npm i express
npm i cookie-parser
npm i cors
npm i dotenv
npm i mongoose
npm i mongoose-aggregate-paginate-v2
npm i jsonwebtoken
```

##  Day 1 (Setup of Backend)

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
## Day 3 (Making Utilities and Adding more packages)
```
Note for Day 3 : Today I just created the classes ApiError , ApiResponse, ayncHandler (Higher order function ) which is I am going to user to standardize the Api errors, Responses . so In case if i get errors it will be easier for me to resolve.
```
### Packages
1. <span style="color:green">npm i cors</span>
2. <span style="color:green">npm i cookie-parser</span>

## Work I have done today 
```
1.  Today I Created Utilities to handle Api Response and Api Eroor Response
```
```
2.  Added aynchandler for routes controllers which enforse Promise.
```

3.  Added Configrations in app.js 

``` javascript
app.use(Cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// configrations. 
app.use(express.json({limit:"16kb"})) // used to set 
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
```
## Day 4 (User Model and Video Model)
```
Today i created user and video models .
```
## Work I have done today
UserModel: 

1.<strong> Created user Model</strong>

2.<strong> Added Two packages </strong>
```javascript
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt"
```

3.<strong>Learn about Middlewares (HOOKS).</strong>
```
Middleware is like a middle layer (a bridge) between an incoming request/action and the final response/result.
```

```javascript
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})
```
```
In our case that pre(): is middleware we used,Accepts two arguments ("event",callbackfunction) 

callbackfunction : accepts next() as argument to call next middleware or passing the control.

Examples(event): "save", "validate", "remove", "find", "findOne", "updateOne", "aggregate",
``` 
4.<strong> Defining Schema methods:</strong>
```javascript
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}// adding function.
```

```javascript
userSchema.methods.generateRefreshToken = function(){
     jwt.sign({
        _id: this._id,
    },
process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}
```
here we have added function with schema to clean the code.

5.<strong> JWT tokens ( jason web tokens )</strong>

these are bearer token we are going to use in our code.
```
JWT is a compact, URL-safe token used for authentication and authorization.

Think of it as a digital ID card for your users.
```
Structure of jwt :
```
header.payload.signature
```
Used in Our code: (user.model)
```javascript
userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname : this.fullName
    },
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}
```
```
jwt.sign() :  this function is used to create the token which accepts  three arguments 

1. {object}: object on data which we going to pass in our token .
2. SecretKey : this key is used to encrypt the data ( this is wriiten by us)
3. Token Expiry : this will set the expiry time of the token .
```
6.<strong>Learn about Bcrypt</strong>
```
We Use bcrypt for the hashing password. basically used enscrypt the password. 
```
```javascript
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})
```
we can bcrypt with middle ware, before inserting password in the data base we are encrypting the password.

7.<strong>Learn about plugIn</strong>
```
A plugin is like an add-on or extension that you can attach to your schema to add extra functionality without writing all the code yourself.

Think of it as pre-built code you “plug in” to your schema to get new features.
```

```javascript 

videoSchema.plugin(mongooseAggregatePaginate)
```
Plugin we used in out code to add exptra functionality of paging videos.
#
## Good Practices..
```
1. Always write code of data base in 'try - catch '
2. Your database is in another continent always use 'Async- await'
3. app.use() is most of the time used in middlewares.
4. async function () always return promise. need to handle that for good practice.
```

# Note for errors 
```
1. In the import section write the complete name of the file with extension other wise it will throw error. ( only naming the directory will now work)
```
<strong>for eg : </strong>
### this will throw error
```javascript
import { DB_NAME } from "../constants";
```
### this will not throw error
```javascript
import { DB_NAME } from "../constants.js";
```
