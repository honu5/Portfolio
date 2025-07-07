const express = require('express');
// const path = require('path');        
const path = require('path'); // Importing the path module to handle file paths
// const express = require('express'); // Importing the express framework

const app=express();
const port=3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get("/about",(req,res)=>{
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
}   ); 
  app.get("/home",(req,res)=>{
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});   

app.get("/projects",(req,res)=>{
                res.sendFile(path.join(__dirname, 'views', 'projects.html'));
}
);  

 app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));

 });

 app.get("/education",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'education.html'));
 });

app.listen(port,()=>{
    console.log(`the server is running at http://localhost:3000 `);
})