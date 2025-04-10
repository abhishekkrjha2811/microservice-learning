import React from 'react'
import Navbar from './Navbar'
import CreateSnippet from './CreateSnippet'

const Home = () => {
  return (
    <div className='space-y-5 p-4 md:p-0'>
        <Navbar/>
        <CreateSnippet/>
    </div>
  )
}

export default Home