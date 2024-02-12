import express from 'express';
import {Book} from '../Models/bookModel.js';
const router = express.Router();//after declaring router new router replces app with router




// Route for save a new book with mongoose
router.post('/books', async(request, response)=> {
    try{
       if(
           !request.body.title ||
           !request.body.author ||
           !request.body.publishYear
       ){
           return response.status(400).send({
               message: 'Send all required fields: title, author, publishYear',
       });
       }
       const newBook= {
           title: request.body.title,
           author: request.body.author,
           publishYear: request.body.publishYear,
       };
       const book = await Book.create(newBook);

       return response.status(201).send(book);

    }catch(error){
       console.log(error.message);
       response.status(500).send({message: error.message});

    }
});
// Route for all books from database

router.get('/books',async (request, response)=>{
   try{
     const books= await Book.find({});
     return response.status(200).json({
       count: books.length,
       data: books
     });
   }catch(error){
       console.log(error.message);
       response.status(500).send({message: error.message});

   }
});

// Route for get one book from database by id

router.get('/:id',async (request, response)=>{
   try{
       const {id}= request.params;
     const book= await Book.findById(id);
     return response.status(200).json(book);
   }catch(error){
       console.log(error.message);
       response.status(500).send({message: error.message});

   }
});

// Route for update a book
router.put('/:id', async (request, response)=> {
   try{
       if(
           !request.body.title ||
           !request.body.author ||
           !request.body.publishYear 
       ){
           return response.status(400).send({
               message: 'Send all required fields: title , author, publishYear',
           });
       }
       const {id}= request.params;

       const result= await Book.findByIdAndUpdate(id, request.body);
       if(!result){
           return response.status(404).json({message: 'Book not Found'});
       }
       return response.status(200).send({message: 'Book updated successfully'});

   }catch(error){
       console.log(error.message);
       response.status(500).send({message:error.message});

   }

});

// Route for delete a Book
router.delete('/:id', async (request, response)=>{
   try{
       const {id}= request.params;
       const result= await Book.findByIdAndDelete(id);
       if(!result){
           return response.status(404).json({message: 'Book not Found'});
       }
       return response.status(200).send({message: 'Book Deleted successfully'});

   }catch(error){
       console.log(error.message);
       response.status(500).send({message: error.message});

   }
});


export default router;

