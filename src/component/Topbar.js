import {Link} from 'react-router-dom';
export default function Topbar(){
    return(
        <div className='container Topbar'>
        <div>Store</div>    
        <Link to="/Home" className='link-item' >Go to HomePage</Link>
        </div>
    )
} 