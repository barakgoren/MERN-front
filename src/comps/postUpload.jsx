import React from 'react'
import { Avatar } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { config } from '../config';

export default function PostUpload(props) {
    const [post, setPost] = useState('');

    const handlePost = (e) => {
        setPost(e.target.value);
    }

    const sendPost = () => {
        const newPost = {
            content: post
        }
        axios.post(`${config.api}/posts`, newPost, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res);
                const post = res.data.post;
                props.setPosts([post, ...props.posts]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='mx-3 my-3 px-3 py-1 bg-dark-subtle bg-gradient rounded rounded-4' style={{ flex: 0.25 }}>
            {/* Name line */}
            <div className='row m-1 p-2 w-75'>
                <div className="name-container d-flex p-0">
                    <Avatar className='me-2' src={props.user ? `${config.api}/uploads/${props.user.image}` : "None"} alt="Cover" />
                    <div className="d-flex  fs-4 fw-bold align-items-end">
                        {props.user ? props.user.name : 'Your Name'}
                    </div>
                </div>
            </div>
            <div className='col pb-2 w-100'>
                <textarea onChange={handlePost} className="w-100 p-2 text-area rounded rounded-4" placeholder='Write your post here...' rows="3"></textarea>
            </div>
            <button onClick={sendPost} className="btn mb-2 btn-info w-100 rounded rounded-4">Post</button>
        </div>
    )
}
