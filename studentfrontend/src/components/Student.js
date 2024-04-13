import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Paper } from '@material-ui/core';
import { useState } from 'react';



const paperstyle = {
  padding: "30px 10px",
  width: "600px",
  margin: "10px auto"
}

export default function Student() {
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [students, setstudents] = useState([])


  const handleclick = (e) => {
    e.preventDefault()
    const student = {name, phone, email, address};
    console.log(student);
    fetch("http://localhost:8080/student/add",{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(student)
        }).then(()=>{
          console.log("New student has been added.")
        })
  }

  useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res => res.json())
    .then((result)=>{
      setstudents(result);
    })
  },[])

  return (
    <Container>
      <Paper elevation={3} style = {paperstyle}>
        <h1 style={{color:"burlywood"}}><u>Create student entry</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Full name : " variant="standard" value={name} 
        onChange={(e) => setname(e.target.value)}/><br/>

      <TextField id="standard-basic" label="Phone no :" variant="standard" value={phone} 
        onChange={(e) => setphone(e.target.value)}/><br/>

      <TextField id="standard-basic" label="Email : " variant="standard" value={email} 
        onChange={(e) => setemail(e.target.value)}/><br/>

      <TextField id="standard-basic" label="Address :" variant="standard" value={address} 
        onChange={(e) => setaddress(e.target.value)}/><br/>

      <Button variant="contained" onClick={handleclick}>Submit</Button>

    </Box>
    </Paper>

    <Paper elevation={3} style={paperstyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
        {/* <div style={{ fontWeight: "bold" }}>Id:</div> {student.id}<br/> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", marginRight: "5px" }}>Id:</div>
          <div>{student.id}</div>
        </div>
        <div style={{ fontWeight: "bold" }}>Name:</div> {student.name}<br/>
        <div style={{ fontWeight: "bold" }}>Phone:</div> {student.phone}<br/>
        <div style={{ fontWeight: "bold" }}>Address:</div> {student.address}<br/>
      </Paper>
      ))}

    </Paper>
    </Container>
  );
}
