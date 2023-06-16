import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';


export function Hamburgermenu(){

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (<>
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>

         <FontAwesomeIcon icon={faBars} />
         
    </div>
    </>)
}