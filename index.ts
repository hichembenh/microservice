const express = require('express')
const Book = require('./models/book.ts')
const bodyParser = require('bodyParser')
const serveStatic = require('serveStatic')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();
app.use(bodyParser.json());
app.use(serveStatic("public"));
app.use(cors());
const uri: string = "mongodb://localhost:27017/biblio";
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Mongo db connection sucess");
    }
});
app.post("/books",(req:Request,resp:Response)=>{
    let book=new Book(req.body);
    book.save(err=>{
        if (err) resp.status(500).send(err);
        else resp.send(book);
    })
});
app.put("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,(err,book)=>{
        if (err) resp.status(500).send(err);
        else{
            resp.send("Successfuly updated book");
        }
    })
});
app.delete("/books/:id",(req:Request,resp:Response)=>{
    Book.deleteOne({_id:req.params.id},err=>{
        if(err) resp.status(500).send(err);
        else resp.send("Successfuly deleted Book");
    });
});
app.listen(8700,()=>{
    console.log("Server Started on port %d",8700);
});
app.get("/pbooks",(req:Request,resp:Response)=>{
    let p:number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 5);
    Book.paginate({}, { page: p, limit: size }, function(err, result) {
        if(err) resp.status(500).send(err);
        else resp.send(result);
    });
});
app.get("/books-serach",(req:Request,resp:Response)=>{
    let p:number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 5);
    let keyword:string=req.query.kw || '';
    Book.paginate({title:{$regex:".*(?i)"+keyword+".*"}}, { page: p, limit:
        size }, function(err, result) {
        if(err) resp.status(500).send(err);
        else resp.send(result);
    });
});