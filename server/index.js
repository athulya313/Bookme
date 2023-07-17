const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const User=require("./models/user.js")
const Place=require("./models/place.js")
const Booking=require('./models/Bookings.js')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const imageDownloader=require('image-downloader')
const multer=require("multer");
const fs=require('fs');


const app=express()

const bcryptSalt= bcrypt.genSaltSync(10)
const jwtSecret="mayfarahbhggjashjhdh"


app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(cors(
    {
        credentials:true,
        origin:'http://127.0.0.1:5173',
       
    }
))


 mongoose.connect(process.env.MONGO_URL)

 function getUserDataFromToken(req){
  return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token,jwtSecret,{},async(err,userData)=>{
      if(err) throw err;
       resolve(userData)
    })
  })
}
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    
   try{
    const user=  await User.create({name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(user)
    
   }catch(error){
    res.status(422).json(error)
   }
  
   
})

app.post("/login",async(req,res)=>{
   
  
    const{email,password}=req.body;
    

    const user=await User.findOne({email})
    
        if(user){
        const passwordcomp=bcrypt.compareSync(password,user.password)

         if(passwordcomp){
            jwt.sign({email:user.email,
                id:user._id
              
            },jwtSecret,{},(err,token)=>{
                if(err) throw err
                 res.cookie('token',token).json(user)
            })
         
         }else{
         res.status(422).json("incorrect password")
         }
     }else{
            res.status(422).json("user not found")
        }
    
})

app.get("/userdata",(req,res)=>{
    const {token} =req.cookies;
     if(token){
    jwt.verify(token,jwtSecret, {}, async(err,userData)=>{
          if(err) throw err
     const {name,email,_id}=await User.findById(userData.id)
           res.json({name,email,_id})
     } );
    }
    
     else{
           res.json(null)
         }
        }

           )

    app.post("/logout",(req,res)=>{
       

      res.cookie('token','').json(true)
      
    })
   
    app.post("/uploadbylink",async(req,res)=>{
        const {link}=req.body;
        const newName='photo' + Date.now() + '.jpg'
       await imageDownloader.image({
            url:link,
            dest: __dirname+ '/uploads/' +newName
        })
        res.json( newName)
    })

    
    const photosMiddleware=multer({dest:'uploads/'})
 app.post("/upload" ,photosMiddleware.array('photos',100) ,(req,res)=>{
        const uploadedFiles=[];

      for(let i=0; i< req.files.length;i++){
        const{path,originalname}=req.files[i]
        const parts=originalname.split('.')
        const ext=parts[parts.length-1]
        const newPath=path + '.' + ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads',''))

      }

   res.json(uploadedFiles)
    })

   
    app.post('/places', (req,res) => {
        const {
            title,address,addedPhotos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,price}= req.body;
        
        const {token} =req.cookies;
       
       jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const placeDoc = await Place.create({
            owner:userData.id,
            title,address,photos:addedPhotos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,price
          });
          res.json(placeDoc)
        });
      });

      app.get("/places",(req,res)=>{
        const {token}=req.cookies;
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            const {id}=userData;
            res.json(await Place.find({owner:id}))
        })
      })
      app.get('/places/:id',async(req,res)=>{
        const{id}=req.params;
        res.json(await Place.findById(id))
      })
      app.put("/places", async (req, res) => {
        const { token } = req.cookies;
        const {
          id, title, address, addedPhotos, description,
          perks, extraInfo, checkIn, checkOut, maxGuests,price,
        } = req.body;
      
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const placeDoc = await Place.findById(id);
          
       if (placeDoc) {
            if (userData.id === placeDoc.owner.toString()) {
              placeDoc.title = title;
              placeDoc.address = address;
              placeDoc.photos = addedPhotos;
              placeDoc.description = description;
              placeDoc.perks = perks;
              placeDoc.extraInfo = extraInfo;
              placeDoc.checkIn = checkIn;
              placeDoc.checkOut = checkOut;
              placeDoc.maxGuests = maxGuests;
              placeDoc.price=price;
      
              await placeDoc.save();
              res.json("okk");
            } else {
              res.status(403).json({ error: "Unauthorized to update this place." });
            }
          } else {
            res.status(404).json({ error: "Place not found." })
          }
        });
      });

      app.get("/allplaces",async(req,res)=>{
        res.json(await Place.find())
      })

      app.post("/bookings",async(req,res)=>{
       
        const{name,place,checkIn,checkOut,numberOfGuests,phone,price}=req.body;
        const{token}=req.cookies;
        
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
          if (err) throw err;
          const BookingDoc= await Booking.create({name,place,checkIn,checkOut,numberOfGuests,phone,price,user:userData.id})  
          if(BookingDoc){
           res.json(BookingDoc)
          }else{
           res.json('some error happened'); 
          }
          
         }) 
      })  
       
      
      
      app.get('/bookings',async(req,res)=>{
        
        const {token}=req.cookies;
       
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if (err) throw err;
            res.json(await Booking.find({user:userData.id}).populate('place'))     
        })
      })    
   
      


app.listen(4000)    


//3RF5u2fQpRukavmV