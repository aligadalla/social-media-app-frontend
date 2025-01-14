import {NavLink} from 'react-router-dom';

export default function SideBar() {
    return (
        <>
            <p>SideBar</p>
            
            <nav>
                <NavLink to='/feed'> Feed </NavLink>
            </nav>
        </>
    );
}