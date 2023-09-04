import './App.css';
import { Routes, Route} from 'react-router-dom'
import Header from './Components/Header';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import Footer from './Components/Footer';
import Missing from './Components/Missing';
import About from './Components/About';
import Nav from './Components/Nav';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';
import useWindowSize from './hooks/useWindowSize'
// import Data from './hooks/Context';
import useAxiosFetch from './hooks/useAxiosFetch'
import { useEffect } from 'react';
import {useStoreActions} from 'easy-peasy'
function App() {

  const setPosts = useStoreActions((actions)=>actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        setPosts(data)
    }, [data,setPosts])

  const { width } = useWindowSize();

  return (
    <div className="App">
     
      {/* <Data>  */}
        <Header title="BLOGHUT" width={width} />
        <Nav/>
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} fetchError={fetchError}/>}/>
          <Route path="post" element={<NewPost/>}/>
          <Route path="edit/:id" element={<EditPost/>} />
          <Route path='page/:id' element={<PostPage/>} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      {/* </Data> */}
    </div>
  );
}

export default App;
