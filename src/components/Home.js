import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './home.css'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        navigate('/')
    },[navigate])
    
    

    return ( 
        <div className='home'>
            <h1>WELCOME TO PRO-FIRM!</h1>
            <nav>
                <ul>
                    <li>
                        <Button variant="outlined" color="error"><Link to="/auth/login">Login</Link></Button>
                    </li>
                    <li>
                        <Button variant="outlined" color='error'><Link to="/auth/signup">Signup</Link></Button>
                    </li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Home;