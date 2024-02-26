import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar } from '@mui/material';
import { config } from '../config';

export default function Post(props) {
    const post = props.post;
    return (
        <div className='mx-3 my-3 px-3 py-1 bg-primary-subtle shadow bg-gradient rounded rounded-4' style={{ flex: 0.25 }}>
            {/* Name line */}
            <div className='row m-1 p-2 w-75'>
                <div className="name-container d-flex p-0">
                    <Avatar className='me-2' src={`${config.api}/uploads/${post.authorId.image}`} alt="Cover" />
                    <div className="d-flex  fs-4 fw-bold align-items-end">
                        {post.authorId.name}
                    </div>
                </div>
                <div className="col d-flex align-items-end">
                    <div className="text-secondary pb-1">
                        {new Date(post.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                        , {new Date(post.createdAt).getDate()}/{new Date(post.createdAt).getMonth()}/{new Date(post.createdAt).getFullYear().toString().slice(2, 4)}
                    </div>
                </div>
            </div>
            {/* Content Line */}
            <div className='row ps-3 w-100'>
                <div className="">
                    {post.content}
                </div>
                <div className=' mt-2 m-0 row text-secondary text-center'>
                    <button className="col post-button d-flex justify-content-center border-end border-secondary">
                        <div className='h-100 d-flex px-1 flex-column justify-content-center'>
                            <AiOutlineLike />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            Like
                        </div>
                    </button>
                    <button className="col post-button d-flex justify-content-center border-end border-secondary">
                        <div className='h-100 d-flex px-1 flex-column justify-content-center'>
                            <FaRegComment />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            Comment
                        </div>
                    </button>
                    <button className="col post-button d-flex justify-content-center">
                        <div className='d-flex h-100 px-1 flex-column justify-content-center'>
                            <RiShareForwardLine />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            Share
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
