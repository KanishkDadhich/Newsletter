const express= require("express");   //making express server
const bodyParser= require("body-parser");   
const request= require("request");   // to make request on other server to post data on them
const https=require("https");     // to make request on other server to receive data from them
const { json } = require("body-parser");

const app= express();

app.use(express.static("public"));  // so that express can take care of all the static file into consideration
app.use(bodyParser.urlencoded({extended: true}))
// Body-parser to access the data fields taken input by the user on our web page

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email = req.body.email;

   var data= {
    members: [
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME: lastName
            }
        }
    ]    // ye ek object banake server pe bhejna hai

   }
   const jsonData= JSON.stringify(data);
   const url= "https://us13.api.mailchimp.com/3.0/lists/915c040144"
   const options={
    method:"POST",
    auth:"kanishk:0603de61a3109b4d19b5b8727df1fd32-us13"

   }
  const request= https.request(url,options,function(response){
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+ "/success.html");
    }
    else
    {
        res.sendFile(__dirname+"/failure.html")
    }
    
    
    response.on("data",function(data)
     {
        console.log(JSON.parse(data));
     })
   })

   request.write(jsonData);
   request.end();
    
});

app.post("/failure",function(req,res){
    res.redirect("/");
})




app.listen(process.env.PORT || 3000,function()
{
    console.log("Server is running on port 3000");
})

//0603de61a3109b4d19b5b8727df1fd32-us13

// list id-  915c040144.






