import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from '../hooks/useFetch'

const Home = () => {
    
    const trendingData = useSelector(state => state.movieoData.bannerData)
    const { data: nowPlayingData } = useFetch("/movie/now_playing")
    const { data: topRatedData } = useFetch("/movie/top_rated")
    const {data: popularTvShowData } = useFetch("/tv/popular")
    const { data: upcomingMoviedData } = useFetch("/movie/upcoming")


  return (
    <div>
        <BannerHome />
        <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
        <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} trending={false} media_type={"movie"}/>
        <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} trending={false} media_type={"movie"}/>
        <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Shows"} trending={false} media_type={"tv"}/>
        <HorizontalScrollCard data={upcomingMoviedData} heading={"Upcoming Movies"} trending={false} media_type={"movie"}/>

        
    </div>
  )
}

export default Home