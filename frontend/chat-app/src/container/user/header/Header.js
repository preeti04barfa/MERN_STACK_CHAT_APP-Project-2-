import React from 'react';
import Index from '../../index';
import '../header/Header.css';
import avtarImage from '../../../assets/png/avtar.png';
  

const Header = () => {
    return (
        <Index.Box className="main-header">
            <Index.Box className="user-profile">
                <Index.Box className="user-image">
                    <img src={avtarImage} alt="User Avatar" />
                </Index.Box>
                <Index.Box className="username-offon">
                    <Index.Box className='username-name'>
                        <p><strong>Durgesh</strong></p>
                    </Index.Box>
                    <Index.Box className='user-status'>
                        <Index.Box className='status-icon'> <Index.FiberManualRecordIcon className='onoff-icon'/></Index.Box>
                        <Index.Box className='status-OnOffline'> <p>Online</p></Index.Box>
                    </Index.Box>
                </Index.Box>
            </Index.Box>
            <Index.Box className="call-icons">
                <Index.Box>
                    <Index.VideocamIcon />
                </Index.Box>
                <Index.Box>
                    <Index.CallIcon />
                </Index.Box>
                <Index.Box>
                    <Index.GridViewIcon />
                </Index.Box>
            </Index.Box>
        </Index.Box>
    );
};

export default Header;
