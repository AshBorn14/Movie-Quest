import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from "../components/Divider"
import profile from "../assets/profile.jpg"
import useFetch from '../hooks/useFetch'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'

const DetailPage = () => {

  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const imageUrl = useSelector(state => state.movieoData.imageUrl)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [ playVideo, setPlayVideo] = useState(false)
  const [ playVideoId, setPlayVideoId ] = useState("")


  console.log("similar data", castData)

  const duration= (Number(data?.runtime)/60).toFixed(2).split(".")

  const filterCrew = (job)=>{
    if(castData && Array.isArray(castData.crew)){

      const filterCrew = (castData?.crew).filter(crew => (crew?.department).toLowerCase() === job)
      console.log(filterCrew)
      const crew = filterCrew.map(crew => crew?.name).join(", ")
      
      return crew
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.explore, params.id]);
  
  const handlePlayVideo = (data) => {
    setPlayVideoId(data.id)
    setPlayVideo(true)
  }


  return (
    <div> 
      <div className='w-full h-[370px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img 
            src={imageUrl+data?.backdrop_path}
            className='w-full h-full object-cover'
          />
          
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent '></div>
      </div>
      <div className='container mx-auto px-3 py-20 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto  lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img 
              src={imageUrl+data?.poster_path}
              className='w-60 h-80 object-cover rounded'
            />
            <button onClick={()=>handlePlayVideo(data)} className='w-full mt-5 py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-700 to-orange-500 transition-all hover:scale-105'>Watch Trailer</button>
        </div>
        <div className=''>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>
          <Divider />

          <div className='flex items-center gap-3'>
              <p>
                Rating : {Number(data?.vote_average).toFixed(1)}
              </p>
              <span>|</span>
              <p>
                View : {Number(data?.vote_count)}
              </p>
              <span>|</span>
              <p>
                Duration : {duration[0]+"h "+duration[1]+"m"}
              </p>
          </div>
          <Divider />
          <div>
              <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
              <p>{data?.overview}</p>
              <Divider/>
              <div className='flex items-center gap-3 text-center'>
                <p>Status : {data?.status}</p>
                <span>|</span>
                <p>Release Date : {moment(data?.release_date).format("MMM Do YYYY")}</p>
                <span>|</span>
                <p>Revenue : {Number(data?.revenue)}</p>
              </div>
              
          </div>
          <div>
            
            {filterCrew("directing") && (
                <div>
                  <Divider/>
                  <p><span className='text-white'>Directed by : {filterCrew("directing")}</span></p>
                </div>
                
            )}
            
            {filterCrew("writing")  && (
                <div>
                  <Divider/>
                  <p><span className='text-white'>Written by: {filterCrew("writing")}</span></p>
                </div>
            )}
            
          </div>
            <Divider />
            <h2 className='text-lg font-bold'>Cast:</h2>
            <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5' >
              { 
                castData?.cast?.map((cast,index)=>{
                  return (
                    <div >
                        <div>
                          
                          <img src={cast?.profile_path ? imageUrl+cast?.profile_path : profile} className='w-24 h-24 rounded-full object-cover'/>
                        </div>
                        <p className='font-bold text-center text-sm'>{cast?.name}</p>
                        <p className='text-center text-xs text-neutral-400'>{cast?.character}</p>
                        
                    </div>
                  )
                })
              }
            </div>

        </div>
      </div>
      <div>
        <HorizontalScrollCard data={similarData} heading={`Similar ${params?.explore === "tv" ? "Tv Shows" : "Movies"}`} media_type={params?.explore}/>
        <HorizontalScrollCard data={recommendationData} heading={`Recommended ${params?.explore === "tv" ? "Tv Shows" : "Movies"}`} media_type={params?.explore}/>
      </div>
      {
        playVideo && (
        <VideoPlay videoId={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore} />)
      }
      
    </div>
  )
}

export default DetailPage