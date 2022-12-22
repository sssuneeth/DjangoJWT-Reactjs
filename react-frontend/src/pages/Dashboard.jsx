import { ArrowRight } from '@mui/icons-material'
import { Box, Button, Container, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

const Dashboard = () => {

    const [notes, setNotes] = useState([])
    const { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        const data = await response.json()

        if(response.status === 200){
            setNotes(data)
        } else if (response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    return (
        <Container>
            <Box mt={12} sx={{
                border: '1px solid lightgrey',
                padding: 5,
                borderRadius: 2
            }}>
                <Typography variant='h3' fontWeight={700} gutterBottom>Welcome to Dashboard</Typography>
                <Typography variant='h6' fontWeight={400} color='text.secondary' gutterBottom>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </Typography>
                <Button variant='contained' endIcon={<ArrowRight />} sx={{
                    borderRadius: 7,
                    padding: '10px 20px',
                    fontWeight: 600,
                    marginTop: 2,
                    marginBottom:5
                }}>Get started</Button>

                <TableContainer style={{width:'50%'}} component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Notes :</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notes.map((note) => (
                                <TableRow
                                    key={note.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {note.body}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Container>
    )
}

export default Dashboard