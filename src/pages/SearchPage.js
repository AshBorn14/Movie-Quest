import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {

    const location = useLocation()
    const [ data, setData ] = useState([])
    const [ pageNo, setPageNo ] = useState(1)
    const [ totalPageNo, setTotalPageNo ] = useState(0)
    const navigate = useNavigate()

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchData = useCallback(
        debounce(async(query, reset = false) => {
        try {
            const response = await axios.get(`/search/multi`, {
                params : {
                    query: query,
                    page : pageNo
                }
            })
            setData((prev)=>{
                return reset ? response.data.results : [
                    ...prev,
                    ...response.data.results
                ]
            })

            // setTotalPageNo(response.data.total_pages)
            setTotalPageNo(response.data.total_pages)

            console.log("Search", response)
            
        } catch (error) {
            console.log("Error", error)
        }
    },500), [pageNo, location.search])


    const handleScroll = () =>{
        if((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight -1){
            if(pageNo < totalPageNo)
            setPageNo(prev => prev+1)
        }
    }

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        const query = queryParams.get('q') || ''
        if (query) {
            setData([])
            setPageNo(1)
            window.scrollTo(0, 0);
            fetchData(query, true)
        }
    },[location?.search])

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        const query = queryParams.get('q') || ''
        if (query && pageNo > 1) {
            fetchData(query)
        }
    },[pageNo])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
        }
    })

    
      

  return (
    <div className='py-16'>
        <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
            <input 
                type="text" 
                placeholder="Search here...." 
                onChange={(e)=>navigate(`/search?q=${e.target.value}`)} 
                className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
                value={location?.search?.slice(3).split("%20").join(" ")}
            />
        </div>
        <div className='container mx-auto'> 
            <h3 className='capitalize  text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
            <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                {
                    data.map((searchData, index)=>{
                        return (
                            <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default SearchPage