import React from 'react'
import { useParams, Link,useNavigate } from 'react-router-dom'
import {useStoreState,useStoreActions}  from 'easy-peasy';
function PostPage() {

  const navigate = useNavigate();
  const { id } = useParams();
  const deletePost = useStoreActions((actions)=>actions.deletePost);
  const getPostById = useStoreState((state)=>state.getPostById);
  const post = getPostById(id);
  async function handleDelete(id) {
    deletePost(id);
    navigate('/');
}
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>

          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button
          onClick={()=>handleDelete(post.id)}
          >Delete Post</button>
          <Link to={`/edit/${post.id}`}>
            <button className='editButton'>Edit Post</button>
          </Link>
          </>
        }

        {!post &&
        <>
          <h2>Post not found</h2>
          <p>Well that's disappoinitng.</p>
          <p><Link to='/'>Visit Home Page</Link></p>
        </>}
      </article>
      <h1>PostPage</h1>
    </main>
  )
}

export default PostPage
