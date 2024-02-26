import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Paper, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Post from './post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {config} from '../config'


export default function UserProfile() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${config.api}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    console.log(response.data);
                    setUser(response.data);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        nav('/login');
                    } else {
                        console.log(err);
                    }
                });
        };
        getUser();
        getPosts();
    }, [setUser, nav]);

    const getPosts = async () => {
        axios.get(`${config.api}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const CoverImage = styled('img')({
        width: '100%',
        height: 200,
        objectFit: 'cover'
    });

    const ProfileAvatar = styled(Avatar)({
        width: 130,
        height: 130,
        border: '4px solid white',
        marginTop: '-65px',
        marginLeft: 'auto',
        marginRight: 'auto'
    });


    return (
        <div className='bg-body-secondary' >
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Paper elevation={0} square className=' rounded rounded-bottom-5'>
                    <CoverImage src="https://source.unsplash.com/random/800x200?snowboard" alt="Cover" />
                    <Box sx={{ p: 2 }}>
                        <ProfileAvatar src={user ? `${config.api}/uploads/${user.image}` : "default"} alt="Profile" />
                        <Typography variant="h5" align="center" gutterBottom>
                            {user ? user.name : 'Your Name'}
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary">
                            {user ? user.age : 'Your age'}, {user ? user.city : 'Your city'}
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" sx={{ mx: 1 }}>Follow</Button>
                            <Button variant="outlined" sx={{ mx: 1 }}>Contact</Button>
                        </Box>
                    </Box>
                </Paper>
                {/* Additional sections for posts, photos, friends, etc. can be added here */}
                <div className='w-100 px-5'>
                    <Grid container spacing={2} mt={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Posts
                            </Typography>
                        </Grid>
                        {/* Add more posts here */}
                        <Grid item xs={12}>
                            {posts.map((post, index) => {
                                return <Post key={index} post={post} />
                            })}
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </div >
    );
}
