import React from 'react'
import {useStoreState,useStoreActions}  from 'easy-peasy';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
function NewPost() 
{

    const navigate = useNavigate();
  // const {postTitle,setPostTitle,postBody,setPostBody,handleSubmit} = useContext(DataContext);
   const posts = useStoreState((state)=>state.posts);
   const postTitle = useStoreState((state)=>state.postTitle);
   const postBody = useStoreState((state)=>state.postBody);

   const savePost = useStoreActions((actions)=>actions.savePost);
   const setPostTitle = useStoreActions((actions)=>actions.setPostTitle);
   const setPostBody = useStoreActions((actions)=>actions.setPostBody);


   async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts.length + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
}

  return (
    <main className='NewPost'>
      <h1>NewPost</h1>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title</label>
        <input
        id='postTitle'
        type='text'
        required
        value={postTitle}
        onChange={e=>setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
         id='postBody'
         type='text'
         required
         value={postBody}
         onChange={e=>setPostBody(e.target.value)}
         />
         <button type='submit'>submit</button>
      </form>
    </main>
  )
}

export default NewPost
