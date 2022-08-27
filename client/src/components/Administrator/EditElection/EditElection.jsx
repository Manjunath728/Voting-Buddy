import { Container ,Box, Paper, CssBaseline } from '@mui/material'
import React from 'react'
import LinearStepper from './LinearStepper'


function EditElection() {
  return (
    <>
    <CssBaseline/>
    <Container component={Box} p={4}>
            <Paper component={Box}p={3} elevation={3}>
                <LinearStepper/>
            </Paper>
    </Container></>
  )
}

export default EditElection