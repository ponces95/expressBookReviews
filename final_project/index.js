const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"secretPass",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
 if (!req.session.accessToken){
  return res.status(401).json({message: "Unauthorized"});
 }
 const accessToken = req.session.accesToken;
 try{
  const decodedToken = jwt.verify(accessToken, "secretPass");
  const userPassword = decodedToken.userPassword;
  req.userPassword = userPassword;
  next();
 } catch (err){
  return res.status(401).json(err);
 }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, ()=>console.log("Server is Running"));
