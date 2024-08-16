import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Welcome to IRT</h1>
            <Link to="/login">Please Login</Link>
        </div>
    )
}

export default Home