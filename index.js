// Express library to create server.
const express = require ('express');
const app= express();
// Library to allow cross origin.
const cors = require ('cors');
// Set of the port.
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running in ${PORT}`));
// Library to allow the data from the front-end.
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Structure

const user={
    name:'',
    email:'',
    password:''
};
const validation={
    email: '',
    password: ''
};
// Methods
app.post('/register',(req,res)=>{
    user.name = req.body.user;
    user.password = req.body.pwd;
    user.email =req.body.email;
    res.send({registered: user});
});
app.put('/login',(req,res)=>{
    validation.email = req.body.email;
    validation.password= req.body.password;
    if (validation.email == user.email && validation.password== user.password){   
        res.send({logged : validation});
    }else{
        res.status(404).send({ error : 'This account is invalid'});
    }
});

