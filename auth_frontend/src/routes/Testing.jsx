import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import makeServer from "../server"


const Testing = () => {  
    makeServer();
    let { listId } = useParams()
    const [reminders, setReminders] = useState()
    const [error, setError] = useState(null)
    
    useEffect(() => {
        let isCurrent = true
        let url = `api/reminders`

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (isCurrent) {
                    console.log(json.reminders)
                    setReminders(json.reminders)
                }
            })
            .catch((e) => {
                if(isCurrent) {
                    setError("We couldn't load your reminders. Try again soon.")
                    console.log(error(e))
                }
            })
        return () => {
            isCurrent = false
        }
    },[listId])
    
    return (
        <div>
            <h1>Reminders</h1>
            <p>There are {reminders.length} reminders</p>
            <ul>
                {reminders?.length > 0 ? (
                    reminders.map((reminder, i) => {
                        <li key={i}>{reminder.text}</li>
                    }
                )): "All done!"}
            </ul>
        </div>
    )
}

export default Testing