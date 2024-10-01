import {useEffect, useState} from 'react'
import { useResolvedPath } from 'react-router-dom'

const Testing = () => {
  const [todos, setTodos] = useState([])
  const [users, setUsers] = useState([])
  const [studies, setStudies] = useState([])
  const [display, setDisplay] = useState(todos)
  const [name, setName] = useState("Todos:")

  useEffect(() => {
    getTodos(),
    getUsers(),
    getStudies()
  }, [])

  const getTodos = () => {
    fetch("api/todos")
    .then(response => response.json())
    .then(data => setTodos(data.todos))
    .catch(err => console.log(err))
  }

  const getUsers = () => {
    fetch("auth/users")
    .then(response => response.json())
    .then(data => setUsers(data.users))
    .catch(err => console.log(err))
  }

  const getStudies = () => {
    fetch("api/studies")
    .then(response => response.json())
    .then(data => setStudies(data.studies))
    .catch(err => console.log(err))
  }

  const createStudy = async () => {
    try {
      await fetch("api/studies", {
         method: 'POST', 
         headers: {
            "Content-Type": "application/json"
         },
          body: JSON.stringify({ 
            text: name,
            isDone: false
        }) 
      })
      .then((res) => {
        console.log(res.json())
        getStudies()
        setName("")
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createStudy()
  }

  const handleDisplay = (e) => {
    e.preventDefault()
    let type = e.target.value
    if(type=="todos"){
        setDisplay(type)
        setName("Todos:")
    }else if(type=="users"){
        setDisplay(type)
        setName("Users:")
    }else if(type=="studies"){
        setDisplay(type)
        setName("Studies: ")
    }
  }

  return (
    <>
      <h3>Pick which dataset you are testing</h3>
      <button value="todos" onClick={handleDisplay}>Todos</button>
      <button value="users" onClick={handleDisplay}>Users</button>
      <button value="studies" onClick={handleDisplay}>Studies</button>
      <h1>{name}</h1>
      <ul>
      {display == "todos" ? 
        todos.map((todo) => (
            <li key={todo.id}>{todo.id}: {todo.text}</li>
        )) :
        display == "users" ? 
        users.map((user) => (
            <li key={user.id}>{user.id}: {user.name}</li>
        )) :
      (display == "studies") ?
      studies.map((study) => (
        <li key={study.id}>{study.id}: {study.name}</li>
      )) : ""
      } 
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="study" value={name} onChange={(e)=> setName(e.target.value)} />
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default Testing