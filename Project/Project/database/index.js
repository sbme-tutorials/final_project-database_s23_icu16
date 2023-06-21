const express=require("express");
const cors=require("cors")
const app=express();
const mysql2=require("mysql2");
app.use(express.json());
app.use(cors());


const connection =  mysql2.createConnection({

        host:"127.0.0.1",
        user:'root',
        password:'',
        database:'hospital'
})




app.get('/patient',(req,res,next)=>{

    

    const query= `SELECT patient.Fname, patient.Lname, patient.Department_name, patient.Age, patient.PhoneNum, patient.RoomID , patient.PSSN
    FROM patient  `;
    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err'})
        }
        
        return res.json({message:"done",result})

    })




})
 


app.get('/doctor',(req,res,next)=>{

    

    const query = `SELECT doctor.Doc_Name ,doctor.DSSN,doctor.Department FROM doctor`;
    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err'})
        }
        
        return res.json({message:"done",result})

    })




})



app.get('/statistics',(req,res,next)=>{

    

    const query= `SELECT icuroom.ROOM_num, icuroom.Capacity, icuroom.Capacity - COUNT(DISTINCT reservations.Pid) AS available_places, COUNT(DISTINCT reservations.Pid) AS used_places FROM icuroom LEFT JOIN reservations ON icuroom.ROOM_num = reservations.ROOMid GROUP BY icuroom.ROOM_num, icuroom.Capacity;`;
    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err'})
        }
        
        return res.json({message:"done",result})

    })




})



app.get('/nurse',(req,res,next)=>{

    

    const query = `SELECT nurses.Nurse_Name,nurses.TSSN,nurses.Department FROM nurses`;
    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err'})
        }
        
        return res.json({message:"done",result})

    })




})


app.delete('/patient',(req,res,next)=>{

    const { Pssn }=req.body;

    const query= `Delete FROM PATIENT WHERE PSSN=${Pssn }`

    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err'})
        }
        
        return result.affectedRows ? res.json({message:"done"}): res.json({message:"in valid"})

    })

    



})


app.post("/patient",(req,res,next)=>{

    const { Pssn, Fname, Lname, gender, birthdate, Address, PhoneNum, RoomID, department_name } = req.body;
     console.log( { Pssn, Fname, Lname, gender, birthdate, Address, PhoneNum, RoomID, department_name } );
   const query = `INSERT INTO patient (PSSN, Fname, Lname, gender, Age, Address, PhoneNum, RoomID, Department_name)
    VALUES (${Pssn}, '${Fname}', '${Lname}', '${gender}', ${birthdate}, '${Address}', '${PhoneNum}', ${RoomID}, '${department_name}'  )`;
    connection.execute(query,(err ,result ,field)=>{
        if(err){
            return res.json({message:'query err',err})
            
        }
        
        return result.affectedRows ? res.json({message:"done"}): res.json({message:"in valid"})

    })


})
 
app.get('/*',(req,res,next)=>{

    res.send('404 not found')
})


app.listen(5000,()=>{
   console.log("dkmfd "); 
})