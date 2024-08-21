import { useContext, useState } from "react";
import {useIdleTimer} from 'react-idle-timer'
import {AuthContext} from './AuthProvider'


const useIdleTimeout = ({ onIdle, idleTime = 1}) => {
    const idleTimeout = 1000 * idleTime
    const [isIdle, setIsIdle] = useState(false)
    const { logoutAction } = useContext(AuthContext)
    const handleIdle = () => {
        setIsIdle(true)
    }

    const IdleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptTimour: idleTimeout / 2,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    })

    return {
        isIdle,
        setIsIdle,
        IdleTimer
    }
}

export default useIdleTimeout