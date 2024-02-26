import { Avatar } from '@mui/material'
import React from 'react'

export default function UserDisplay() {
    return (
        <div className='d-flex py-1 flex-row'>
            <Avatar className='me-2' sx={{ width: 30, height: 30 }} src="https://source.unsplash.com/random/800x200?snowboard" alt="Cover" />
            <div className='d-flex flex-column justify-content-center'>
                My Name
            </div>
        </div>
    )
}
