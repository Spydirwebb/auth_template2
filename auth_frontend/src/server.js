import { createServer, Model, Response } from 'miragejs'


let todos = [
    {text: "Buy groceries", isDone: false},
    {text: "Walk Dog", isDone: false},
    {text: "learn Mirage", isDone: false},
]
let users = [
    {name: "Harry Potter", email: "harry.potter@hogwarts.edu", password: "Password", loginAttempts: 0, locked: false, 
      permissions: [
                {studyId: "1", permissions: "admin"},
                {studyId:"2", permissions: "coordinator"},
                {studyId: "3", permissions: "coordinator"}
            ]
    },
    {name: "Hermione", email: "hermione.granger@hogwarts.edu", password: "Password1", loginAttempts: 0, locked: false,
      permissions: [
          {studyId: "1", permissions: "coordinator"},
          {studyId: "2", permissions: "coordinator"}
      ]
    },
    {name: "Albus Dumbledore", email: "Albus.Dumbledore@hogwarts.edu", password: "password", loginAttempts: 0, locked: false,
      permissions: [
          {studyId: "1", permissions: "Investigator"}
      ]
    }
]

let studies = [
        {name: "PAT", siteNumber: "100", investigatorId: ["3"], coordinatorId: ["1","2"], randomization_sequence: "TCTCTCTCTCTCTCTCTCTC",
            "subjects": [
                {id:"100-1", yearOfBirth: "1991", treatmentGroup: "T", interventionNumber: "1111"},
                {id:"100-2", yearOfBirth: "1992", treatmentGroup: "C", interventionNumber: "2221"},
                {id:"100-3", yearOfBirth: "1993", treatmentGroup: "T", interventionNumber: "1112"},
                {id:"100-4", yearOfBirth: "1994", treatmentGroup: "C", interventionNumber: "2222"}
            ] 
        },
        {name: "AGNOS", siteNumber: "1038", investigatorId: [], coordinatorId: ["1","2"], randomization_sequence: "",
            "subjects": [
                {id:"1038-1", yearOfBirth: "1991", treatmentGroup: null, interventionNumber: "1111"},
                {id:"1038-2", yearOfBirth: "1992", treatmentGroup: "T", interventionNumber: "2221"},
                {id:"1038-3", yearOfBirth: "1993", treatmentGroup: null, interventionNumber: "1112"}
            ] 
        },
        {name: "Proseek", siteNumber: "153", investigatorId: [], coordinatorId: ["1"], randomization_sequence: "",
            "subjects": [
                {id:"153-1", yearOfBirth: "1991", treatmentGroup: "T", interventionNumber: "1111"},
                {id:"153-2", yearOfBirth: "1992", treatmentGroup: null, interventionNumber: "2221"},
                {id:"153-3", yearOfBirth: "1993", treatmentGroup: "C", interventionNumber: "1112"}
            ] 
        }
    ]


export default function makeServer({environment = 'test'} = {}) {
    let server = createServer({
        models: {
          user: Model,
          todo: Model,
          study: Model,
        },
      
        routes() {
          // Auth
          this.namespace = "auth"
          this.get("/users", (schema, request) => {
            return schema.users.all()
          })
          this.post("/login", (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            const reqUsername = attrs.username
            const reqPassword = attrs.password
            try{
                // check username exists
                let user = schema.users.findBy({username: reqUsername})
                
                if(user){                                   // user exists
                    if(!user.locked) {                      // user not locked
                        if(reqPassword === user.password){  // password correct 
                            user.update({loginAttempts: 0})
                            //set data
                            let headers = {}
                            let data = {name: user.username, studies: user.studies}
                            //return passing response
                            //console.log(data)
                            return new Response(200, headers, {data: data})
                        } else {                            // password incorrect
                            user.update({loginAttempts : user.loginAttempts + 1})
                            if(user.loginAttempts > 3){     // exceeded password attempts
                                user.update({locked : true})
                            }
                            //return invalid response
                            console.log("Incorrect Password. LoginAttempts: "+user.loginAttempts)
                        }
                    } else{                                 // user locked
                        // return forbidden
                        console.log("Account locked")
                    } 
                } else{                                     // user does not exist
                    // return invalid response
                    console.log("User does not exist")
                }
            } catch(err){
                console.log(err)
            }
        })
          this.post("/register", (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            const reqUsername = attrs.username
            const reqPassword = attrs.password
            let newUser = {username: reqUsername, password: reqPassword, loginAttempts: 0, locked: false, studies: []}
            //users.push(newUser)
            return schema.users.create(newUser)
          })
          
          // API
          this.namespace = "api"
      
          // todos
          this.get("/todos", (schema, request) => {
            return schema.todos.all()
          })
          //POST Request
          this.post("todos", (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            return schema.todos.create(attrs)
          })
          //DELETE Request
          this.delete("todos/:id", (schema, request) => {
              const id = request.params.id
              return schema.todos.find(id).destroy()
          })

          studies
          this.get("/studies", (schema, request) => {
            return schema.studies.all()
          })
        },
      
        seeds(server) {
            server.db.loadData({
                todos,
                users,
                studies
            })
            
        },
      
    })
    return server
}