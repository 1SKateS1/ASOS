
import { Link } from '@mui/material'
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import './header.css'
import Logo from "../../images/Logo.svg"
import user from "../../images/user.svg"
import cart from "../../images/cart.svg"
import like from "../../images/like.svg"
import search from "../../images/search.svg"




const Header = () => {
    return(
        <>
            <div className='mainblock'>
                <div className='first col-3'>
                    <div className='links'>
                        <Link className='headerText' >Customer Service</Link>
                        <Link className='headerText'>Shopping Form</Link>
                    </div>
                    <div className='searchItem '>
                        <img src={search}/>
                        <input className='search' type="search"/>
                    </div> 
                    <div className="line"/>
                </div>
                <div className='second col-6'>
                    <img src={Logo} alt="" />
                </div>

                <div className='third col-3'>
                    <div className='links'>
                        <Link className='headerText'>Newsletter</Link> 
                        <Link className='headerText'>FAQs</Link>
                        <Link className='headerText'>More</Link>
                    </div>

                            <div className='userIcons'>
                                <Link><img src={user} alt="" className='noneM'/></Link>
                                <Link><img src={cart} alt="" className='noneM'/></Link>
                                <Link><img src={like} alt="" /></Link>
                            </div> 
                </div>
            </div>
        
        </>
    )
} 

export default Header

