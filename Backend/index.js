import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './Models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app=express();


app.use(express.json());

// Middleware for handling cors policy(Cross- origin resource sharing)
// Option 1: Allow all Origins with default of cors(*)


app.use(cors());
// Option 02 : Allow Custome origins
//app.use(cors(
 //  {
 //     origin:'http://localhost:5000',
 //    methods: ['GET','POST','PUT','DELETE'],
 //   allowedHeaders: ['Content-Type'],
 // }
 // ));

 

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Welcome to Bookstore')
}); //getting results from server
app.use('/books',booksRoutes);//Adding middleware 



mongoose
.connect(mongoDBURL)
.then(()=>{
console.log('App connected to database');
app.listen(PORT, ()=> {
    console.log(`App is listening to port:${PORT}`);
});
})
.catch((error)=>{
    console.error(error);
})
