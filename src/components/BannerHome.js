import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight } from "react-icons/fa6"
import { FaAngleLeft } from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom'

const BannerHome = () => {

    const navigate = useNavigate()
    const bannerData = useSelector(state=>state.movieoData.bannerData)
    const imageUrl = useSelector(state => state.movieoData.imageUrl)
    const [ currentImage, setCurrentImage ] = useState(0)

    const handleNext = ()=>{
        setCurrentImage((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1))
    }
    const handlePrevious = ()=>{
        setCurrentImage((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1))
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            handleNext()
        },5000)

        return ()=>clearInterval(interval)
    },[bannerData, imageUrl, currentImage])


    const getBanner = (data) => {
        navigate("/"+data?.media_type+"/"+data.id)
    }

  return (
    <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
            {
                bannerData.map((data,index)=>{
                    return(
                        <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full relative group transition-all' style={{transform: `translateX(-${currentImage*100}%)`}}>
                            <div className='w-full h-full'>
                                <img src={imageUrl+data.backdrop_path} className='h-full w-full object-cover' alt=''/>
                            </div>

                            {/* previous and next button */}
                            <div className='absolute top-0 w-full h-full hidden items-center z-10 justify-between px-4 group-hover:lg:flex'>
                                <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                    <FaAngleLeft />
                                </button>
                                <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                    <FaAngleRight />
                                </button>
                            </div>


                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>

                            </div>
                            <div className='container mx-auto'>
                                <div className=' absolute bottom-0 max-w-md px-3'>
                                    <h2 className='font-bold text-2xl lg:text-5xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                                    <p className='text-ellipsis line-clamp-3 my-2 lg:text-[20px]'>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating : { Number(data.vote_average).toFixed(1)}</p>
                                        <span>|</span>
                                        <p>View : { Number(data.popularity).toFixed(0)}</p>
                                    </div>
                                    <button
                                        onClick={()=>getBanner(data)} 
                                        className='bg-white px-4 py-2 text-black rounded mt-4 font-bold mb-2 hover:bg-gradient-to-l from-red-700 to-orange-500 transition-all hover:scale-105 z-60'>
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        

                    )
                })
            }
        </div>
    </section>
  )
}

export default BannerHome