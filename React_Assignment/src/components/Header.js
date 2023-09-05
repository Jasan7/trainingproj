import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='Header'>
        <h2>Blog Spot</h2>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">New Blog</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
