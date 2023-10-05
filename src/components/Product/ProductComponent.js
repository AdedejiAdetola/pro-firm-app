import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './productcomponent.css';

const Product = ({ product }) => {


    const oneProduct = product
    return ( 
        <div className="productComponent">
            <h3>{oneProduct.productTitle}</h3>

            <p><span>Price:</span> <span>{oneProduct.productPrice.toFixed(2)} NGN</span></p>

            <p><span>Cycle:</span> <span>{oneProduct.productCycle} days</span></p>

            <p><span>Daily Income:</span> <span>{oneProduct.productDailyIncome.toFixed(2)} NGN</span></p>
            <p><span>Total Income:</span> <span>{oneProduct.productTotalIncome.toFixed(2)} NGN</span></p>

            <div className="button">
                <Button variant="outlined" color="error" className="custom-link"><Link to={`/products/${oneProduct._id}`} style={{ textDecoration: 'none', color:'inherit', transition: 'color 0.2s' }} >Product Information</Link></Button>
            </div>
            
        </div>
    );
}
 
export default Product;