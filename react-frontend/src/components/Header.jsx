import { Dashboard } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
    const navigate = useNavigate()
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <Box>
            <AppBar>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to='/' style={{
                        textDecoration:'none',
                        color: 'inherit',
                        fontSize:20,
                        fontWeight:700
                    }}>
                        Dashboard
                    </Link>
                    {user && <Typography>{user.email}</Typography>}
                    <Box>
                        {
                            user ? (
                                <Button onClick={logoutUser} variant='text' color='inherit' sx={{ fontWeight: 500 }}>Logout</Button>
                            ) : (
                                <Button onClick={() => navigate('/login')} variant='text' color='inherit' sx={{ fontWeight: 500 }}>Login</Button>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header