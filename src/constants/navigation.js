import { MdHomeFilled } from "react-icons/md"
import { PiTelevisionFill } from "react-icons/pi"
import { MdLocalMovies } from "react-icons/md"
import { IoSearchOutline } from "react-icons/io5"

export const navigation = [
    {
        label: "Tv Shows",
        href: "tv",
        icon: <PiTelevisionFill />
    },
    {
        label:"Movies",
        href:"movie",
        icon: <MdLocalMovies />
    }
]

export const mobileNavigation = [
    {
        label: "Home",
        href:"/",
        icon: <MdHomeFilled />
    },
    ...navigation,
    {
        label: "Search",
        href:"/search",
        icon: <IoSearchOutline />
    }
]