import React, { useEffect } from 'react'
import Post from './post'
import PostUpload from './postUpload'
import UserDisplay from './userDisplay'
import { Avatar } from '@mui/material'
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { config } from '../config';



export default function Home() {

    const nav = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUser();
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts.length]);

    const getPosts = async () => {
        axios.get(`${config.api}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getUser = async () => {
        let token = localStorage.getItem('token');
        if (!token) {
            nav('/login');
        } else {
            axios.get(`${config.api}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setUser(response.data);
            }).catch(err => { console.log(err) });
        }

    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        nav('/login');
    }

    const handleRouting = () => {
        nav('/userprofile');
    }

    return (
        <div className='row home-container'>
            <div className='col-3 p-0 ps-4 d-flex flex-column'>
                <div className='p-2 mt-3 bg-dark-subtle bg-gradient rounded rounded-4 p-0' style={{ flex: 0.75 }}>
                    <div className='d-flex ps-2 flex-row'>
                        <Avatar className=' ' sx={{ width: 50, height: 50 }} src={user ? `${config.api}/uploads/${user.image}` : "None"} alt="Cover" />
                        <button onClick={handleRouting} className='profile-router ps-3 w-75 fw-bolder fs-5 d-flex flex-column justify-content-center'>
                            {user ? user.name : 'Your Name'}
                        </button>
                        <button onClick={handleLogOut} className='logout-btn fs-4 p-0'><IoIosLogOut /></button>
                    </div>
                    <hr />
                </div>
                <div className='my-3 bg-dark-subtle bg-gradient rounded rounded-4' style={{ flex: 0.25 }}>

                </div>
            </div>
            <div className='col scrolable-section'>
                <PostUpload user={user} posts={posts} setPosts={setPosts} />
                {/* Creating mapping of posts */}
                {posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })}
            </div>
            <div className='col-3 p-0 pe-4 d-flex flex-column'>
                <div className=' px-2 mt-3 bg-dark-subtle bg-gradient rounded rounded-4' style={{ flex: 0.98 }}>
                    <div className=' fw-bold fs-4'>
                        Who is here?:
                    </div>
                    <div>
                        <UserDisplay />
                        <UserDisplay />
                        <UserDisplay />
                        <UserDisplay />
                        <UserDisplay />
                        <UserDisplay />
                    </div>
                </div>

            </div>
        </div>
    )
}
