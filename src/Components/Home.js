import React from 'react'
import Feed from './Feed'
// import { DataContext } from '../hooks/Context'
import {useStoreState}  from 'easy-peasy';
function Home({isLoading,fetchError}) {
  
  const searchResult = useStoreState((state)=>state.searchResult);
  return (
    <main className='Home'>
        

        {isLoading && <p className='statusMsg'>Loading posts...</p>}
        {fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResult.length ?(<Feed posts={searchResult}/>):(<p style={{marginTop:"2rem"}}>
            No Posts to display
        </p>)) }
    </main>
  )
}

export default Home
