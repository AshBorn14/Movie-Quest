import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5"
import useFetch from '../hooks/useFetch'

const VideoPlay = ({videoId, close, media_type}) => {

    const { data: videoData } = useFetch(`/${media_type}/${videoId}/videos`)
    console.log("VideoData", videoData)

    const getTrailer = () => {
        const trailerData = videoData?.filter(data => data?.type=="Trailer")
        if(trailerData.length > 0){
            return trailerData
        }
        else{
            return videoData
        }
    }

    

    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='w-full bg-black max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
                <button onClick={close} className='absolute text-4xl right-0 -top-10'>
                    <IoClose />
                </button>
                {
                    videoData && (
                    <iframe 
                        src={`https://www.youtube.com/embed/${getTrailer()[0]?.key}`}
                        className='w-full h-full'
                        
                    />)
                }
                
            </div>
        </section>
    )
}

export default VideoPlay