import React, { useEffect, useState } from 'react'
import Index from "../../index"
import "../sidebar/Sidebar.css";
import Userlist from '../../../component/userList/Userlist';
import { toast } from 'react-toastify';
import { DataService } from '../../../config/DataService';
import { Api } from '../../../config/Api';

const Search = Index.styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Index.alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: Index.alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = Index.styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = Index.styled(Index.InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const Sidebar = ({ setSelectedUser, selectedUser }) => {
    const [searchUser, setSearchUser] = useState("");
    const [name, setName] = useState('');
    
    useEffect(() => {
        const getToken = localStorage.getItem('userToken');

        if (getToken) {
            try {
                const parsedToken = JSON.parse(getToken); 
                fetchUserData(parsedToken.token || parsedToken); 
            } catch (e) {
                console.error("Error parsing token", e);
                toast.error("Invalid user token");
            }
        } else {
            console.log("No token found");
        }
    }, []);

    const fetchUserData = async (token) => {
        console.log(token,"token");
        
        try {
            const response = await DataService.get(Api.GET_SINGLE, {
                headers: {
                    'auth': token,
                },
            });
            const userDataCredential = response.data.data;
            localStorage.setItem('userDataCredential', JSON.stringify(userDataCredential));
            setName(userDataCredential.username);
        } catch (error) {
            if (error.response && [400, 500].includes(error.response.status)) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.response ? error.response.data.message : "An unexpected error occurred");
            }
            console.error("Error fetching user data", error);
        }
    };

    return (
        <Index.Box className='box-one'>
            <Index.Box className='box-two'>
                <Index.Box className='box-three'>
                    <Index.Box className='heading-logo'>
                        <Index.Box className='name'>
                            <Index.Box className='heading-name'><p>Messaging</p></Index.Box>
                        </Index.Box>
                        <Index.Box className='agent-filter'>
                            <Index.Box className='heading-agent'><p>{name}</p></Index.Box>
                            <Index.Box className='heading-filter'>
                                <Index.FilterListIcon className='agent-icon' />
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                    <Index.Box className='search-box'>
                        <Search className='search'>
                            <SearchIconWrapper>
                                <Index.SearchIcon className='search-icon' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search in dashboard"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchUser}
                                onChange={(e) => setSearchUser(e.target.value)}
                            />
                        </Search>
                    </Index.Box>
                </Index.Box>
                <Index.Box className='box-four'>
                    <Userlist
                        searchUser={searchUser}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                    />
                </Index.Box>
            </Index.Box>
        </Index.Box>
    );
};

export default Sidebar;
