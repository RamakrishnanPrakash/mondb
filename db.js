const mongoose=require('mongoose');


const dbconnect=()=>{
try{
const MONGODB_URL=`mongodb+srv://wwwramkrish98:cPdzHsxyuinjSeSM@cluster0.w6gtxnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(MONGODB_URL);
const connect=mongoose.connection;
connect.on('error',console.error.bind(console,'mongodb connection error'));
connect.once('open',()=>{
console.log("Mongodb was connected succesfully");
    });
return connect;
}catch{
    console.log("Internet issue");
}
}


module.exports=dbconnect;