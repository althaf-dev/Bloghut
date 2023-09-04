import React from 'react'
import { useStoreState } from 'easy-peasy';

function Footer() {
  const today = new Date();
  const postCount = useStoreState(state=>state.postCount)
  return (
    <footer className='Footer'>
      <p>Copyright &copy; {today.getFullYear()}</p>
      <p>{postCount} posts</p>
    </footer>
  )
}

export default Footer
