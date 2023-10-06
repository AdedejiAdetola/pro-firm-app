import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './navigation.css'

const Navigation = () => {
    const navigate = useNavigate()
    return ( 
        <div className="navigation">
            <div className="surround">
                <Button variant="outlined" color="error" className="hover-thing"><Link to='/dashboard' style={{ textDecoration: 'none', color:'inherit' }}>Dashboard</Link></Button>
            </div>

            <div className="surround">
                <Button variant="outlined" color="error" className="hover-thing"><Link to='/dashboard/agreement' style={{ textDecoration: 'none', color:'inherit' }}>Agreement</Link></Button>
            </div>

            <div className="surround">
                <Button variant="outlined" color="error" className="hover-thing"><Link to='/dashboard/purchased' style={{ textDecoration: 'none', color:'inherit' }}>Check Purchases</Link></Button>
            </div>

            <div className="surround">
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={
                    () => {
                        localStorage.clear()
                        navigate('/')
                    }}>
                        Log Out
                </Button>
            </div>
            
        </div>
     );
}
 
export default Navigation;