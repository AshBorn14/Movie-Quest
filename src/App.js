
import './App.css';
import { Outlet } from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageurl } from './store/movieoSlice';


function App() {

  const dispatch = useDispatch()

  const fetchTrendingData = async()=>{
    try{
      const response = await axios.get("/trending/all/day?language=en-US")
      dispatch(setBannerData(response.data.results))
    }catch(error){
      console.log("Error", error)
    }
  }
  
  const fetchConfiguration = async()=>{
    try {
      const response = await axios.get('/configuration')
      dispatch(setImageurl(response.data.images.secure_base_url+"original"))
    } catch (error) {
      console.log("Error", error)
      
    }
  }
  
  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  },[])

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      
      <Footer/>
      <MobileNavigation />
    </main>

  );
}

export default App;
