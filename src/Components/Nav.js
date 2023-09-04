import React from 'react'
import { Link } from 'react-router-dom'
// import { DataContext } from '../hooks/Context'
import { useEffect } from 'react';
import {useStoreState,useStoreActions}  from 'easy-peasy';
function Nav() {

  // const {search,setSearch} = useContext(DataContext);
  const posts = useStoreState((state)=>state.posts);
  const search = useStoreState((state)=>state.search);
  const setSearch = useStoreActions((actions)=>actions.setSearch);
  const setSearchResult = useStoreActions((actions)=>actions.setSearchResult);

  useEffect(() => {

    const filteredResult = posts.filter(post => ((post.body).toLowerCase().includes(search.toLowerCase()))
        || ((post.title).toLowerCase().includes(search.toLowerCase())))

    setSearchResult(filteredResult.reverse());
}, [posts, search,setSearchResult])

  return (
    <nav className='Nav'>
        <form className='SearchForm' onSubmit={e=>e.preventDefault()}>
        <label htmlFor='search'>Search Posts</label>
        <input 
            id = 'search'
            type='text'
            placeholder='Search post'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
        </form>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='post'>Post</Link></li>
            <li><Link to='about'>About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav
