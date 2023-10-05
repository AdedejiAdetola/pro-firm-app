import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './agreement.css';

const Agreement = () => {
    const userExists = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()

    useEffect(() => {

        if (!userExists) {
            localStorage.clear()
            navigate('/')
        }
    })
    return ( 
        <div className="agreement">
            <Navigation />

            <h1>PRODUCT RENTAL AGREEMENT</h1>

            <p>This Agreement is strictly in compliance with the , and the parties hereby affirm and declare that:</p>
            <p>1. PRO-FIRM Nigeria Office: 28 St, 500420, Federal Capital Territory, Nigeria</p>
            <p>2. enters into a product rental agreement with PRO-FIRM to achieve their respective objectives of which rae set out below.</p>
            <p>a) The contracted party and PRO-FIRM rent products, share economy, and joint operation of high-quality service business, and the contracted party’s income will be cashed in accordance with the contract</p>
            <p>b) The signatory promises to be over 18 years old, strictly abide by the principle of one person, one account, and will not register false accounts in PRO-FIRM Company</p>
            <p>c) After signing the agreement, the signatory will become a PRO-FIRM partner.</p>
            <p>d) PRO-FIRM promises to pay the contractor's income according to the profit described in the product, and guarantee the safety of the contractor's funds.</p>
            <p>e) The contractor acknowledges the risk involved in trading Forex and the company will not be liable for any loss.</p>
            <p>f) In the case of loss, all members will be compensated with an amount that will be determined by the Company; PRO-FIRM.</p>
            <p>Validity period of this agreement:14/08/2023-14/08/2025</p>
            <p>Signatory's PRO-FIRM account:</p>
            <p>Signatory:</p>

        </div>
     );
}
 
export default Agreement;