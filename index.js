const express=require('express');
const app=express();
const PORT=4000;
const bodyParser=require('body-parser');



app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine','ejs');

app.use('',require('./routes/pages'));




// app.get('/',(req,res)=>{
// res.render('index');
// });

app.listen(PORT,()=>console.log(`Server running on localhost:${PORT}`));