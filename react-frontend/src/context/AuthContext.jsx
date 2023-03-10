import { React, useState, useEffect, createContext } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    )
    const [loading, setLoading] = useState(true)

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong !')
        }
    }

    const logoutUser = (e) => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    const updateTokens = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens?.refresh
            })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else if( response.statusText === 'Unauthorized'){
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        if (loading) {
            updateTokens()
        }
        const fourMiutes = 1000 * 60 * 4
        const interval = setInterval(() => {
            if (authTokens) {
                updateTokens()
            }
        }, fourMiutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            { loading ? null : children }
        </AuthContext.Provider>
    )
}