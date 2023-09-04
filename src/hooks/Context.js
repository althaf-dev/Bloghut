import { createContext, useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from '../Api/posts'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from './useAxiosFetch'
export const DataContext = createContext();

const Data = ({ children }) => {


    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        setPosts(data)
    }, [data])


    useEffect(() => {

        const filteredResult = posts.filter(post => ((post.body).toLowerCase().includes(search.toLowerCase()))
            || ((post.title).toLowerCase().includes(search.toLowerCase())))

        setSearchResult(filteredResult.reverse());
    }, [posts, search])
    async function handleDelete(id) {
        try {
            await api.delete(`/posts/${id}`)
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/');
        } catch (e) {
            console.log(e.message)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const id = posts.length ? posts.length + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }
    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatePost)
            setPosts(posts.map(post => post.id === id ? response.data : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (e) {
            console.log(e.message)
        }
    }

    return <DataContext.Provider value={{
        posts,
        postTitle, setPostTitle,
        postBody, setPostBody, handleSubmit,
        search, setSearch,
        searchResult, setSearchResult,
        fetchError, isLoading, handleDelete,
        editTitle, setEditTitle,
        editBody, setEditBody, handleEdit

    }}>

        {children}
    </DataContext.Provider>
}

export default Data;