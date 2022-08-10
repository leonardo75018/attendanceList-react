import React, {useState,useEffect} from "react";

import "./styles.css"

import Card from "../../components/Card";


function Home(){
  const [studentName, setStudentName] = useState("");
  const [students,setStudents] = useState([]);
  const [user,SetUser] = useState({name:"", avatar:""})

  function handleAddStudent(){
    const newStudent = {
      name : studentName,
      time : new Date().toLocaleTimeString("fr-fr",{
        hour: "2-digit",
        minute : "2-digit",
        second : "2-digit"
      })
    }

    setStudents(prevState => [...prevState,newStudent]);
  }

  useEffect(() =>{
    fetch("https://api.github.com/users/leonardo75018")
    .then(response  => response.json())
    .then(data => {
       SetUser({
         name : data.name,
         avatar : data.avatar_url
       })
    })
    .catch(error => console.error(error))
  },[])

  
  return(
    <div className="container">
        <header>
          <h1>Liste de Présence</h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="Image de profile" />
          </div>
         </header>
          
          <input 
            type="text"  
            placeholder="Digite o nome"
            onChange={e => setStudentName(e.target.value)}
          />
          <button 
            type="submit" 
            onClick={handleAddStudent}
          >
            Adicionar
          </button>

         {
          students.map(student  => 
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time} /> 
          )
         }
          
        
    </div>

  )
}

export default Home;



