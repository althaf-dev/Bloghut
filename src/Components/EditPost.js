import React, { useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
// import { DataContext } from '../hooks/Context';
import {useStoreState,useStoreActions}  from 'easy-peasy';
import { format } from 'date-fns'
function EditPost() {

    // const { posts,handleEdit, editTitle, setEditTitle, editBody, setEditBody} = useContext(DataContext);
    const { id } = useParams();

    // const posts = useStoreState((state)=>state.posts);
   const editTitle = useStoreState((state)=>state.editTitle);
   const editBody = useStoreState((state)=>state.editBody);

   const editPost = useStoreActions((actions)=>actions.editPost);
   const setEditTitle = useStoreActions((actions)=>actions.setEditTitle);
   const setEditBody = useStoreActions((actions)=>actions.setEditBody);
   const getPostById = useStoreState((state)=>state.getPostById);
   const post = getPostById(id);

   const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatePost);
}
    useEffect(() => {

        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    }, [post, setEditTitle, setEditBody])
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h1>Edit Post</h1>
                    <form className='newPostForm' onSubmit={e=>e.preventDefault()}>
                        <label htmlFor='postTitle'>Title</label>
                        <input
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle} 
                            onChange={e => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Post:</label>
                        <textarea
                            id='postBody'
                            type='text'
                            required
                            value={editBody}
                            onChange={e => setEditBody(e.target.value)}
                        />
                        <button onClick={()=>handleEdit(id)} type='submit'>submit</button>
                    </form>
                </>}
                {!editTitle && <>
          <h2>Post not found</h2>
          <p>Well that's disappoinitng.</p>
          <p><Link to='/'>Visit Home Page</Link></p>
        </>}

        </main>
    )
}

export default EditPost
