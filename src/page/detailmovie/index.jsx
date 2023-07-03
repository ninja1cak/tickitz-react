import React, {useState, useEffect} from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import CardSchedule from '../../component/cardSchedule'
import card1 from '../../assets/card1.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { setAuthToken } from '../../utils/auth'

function DetailMovie() {
    const params = useParams()
    const [movies, setMovies] = useState([])

    setAuthToken(localStorage.getItem('token'))


    const getMovies = async () =>{
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie/show?id_movie=${params.id}`)

            const stringDate = new Date(data.data[0].release_date_movie)

            const newData = {
                ...data.data[0],
                casts_movie: data.data[0].casts_movie.join(', '),
                genre: data.data[0].genre.map((v) => {return v.value}).join(', '),
                release_date_movie: stringDate.toDateString().split(' ').slice(1).join(' ')
            }

            console.log(newData)

            setMovies(newData)
        } catch (error) {
            
        }
    }

    useEffect(() =>{
        getMovies()
        console.log(params.id, 'aaaaas')
    },[])

  return (
    <>
        <Header />
        <main>
            <div class='max-w-7xl mt-10 mx-auto  px-4 flex flex-col md:flex-row md:gap-x-10'>
                
                <img class='p-8 mx-auto h-96  border border-gray-300 rounded-xl' src={movies.url_image_movie}></img>
                <div class=' mt-5 md:mt-0 max-w-7xl'>
                    <div class='text-center md:text-left'>                            
                        <h1 class='font-medium text-xl tracking-wide'>{movies.title_movie}</h1>
                        <h3 class='text-gray-500 mt-3 tracking-wider'>{movies.genre}</h3>
                    </div>
                    <div class='mt-5 border-b border-gray-300 pb-8'>
                        <div class='flex gap-x-14 mb-5'>
                            <div class='w-[30%] max-w-[155px]'>
                                <h4 class='text-gray-500 tracking-wide text-sm'>Release date</h4>
                                <p class='tracking-wider'>{movies.release_date_movie}</p> 
                            </div>
                            <div>
                                <h4 class='text-gray-500 tracking-wide text-sm'>Directed By</h4>
                                <p class='tracking-wider'>{movies.director_movie}</p> 
                            </div>
                        </div>
                        <div class='flex gap-x-14 '>
                            <div class='w-[30%] max-w-[155px]'>
                                <h4 class='text-gray-500 tracking-wide text-sm'>Duration</h4>
                                <p class='tracking-wider'>{movies.duration_movie}</p> 
                            </div>
                            <div class=' w-[50%] max-w-sm'>
                                <h4 class='text-gray-500 tracking-wide text-sm '>Casts</h4>
                                <p class=''>{movies.casts_movie}</p> 
                            </div>
                        </div>
                    </div>
                    <div class='mt-8'>
                        <h2 class='font-medium tracking-wider mb-5'>Synopsis</h2>
                        <p>
                            {movies.synopsis_movie}
                        </p>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mt-10 mx-auto py-10  px-4 bg-gray-100 '>
                <h3 className='font-bold text-xl text-center my-8'>Showtimes and Tickets</h3>
                <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
                    <select className="select select-ghost w-[80%] max-w-[250px] bg-gray-200 tracking-wider">                          
                            <option selected>Set a date</option>
                            <option></option>                        
                    </select>
                    <select className="select select-ghost w-[80%] max-w-[250px] bg-gray-200 tracking-wider">                          
                            <option selected>Set a city</option>
                            <option></option>                        
                    </select>
                </div>
                <div className='flex'>
                    <div className='flex flex-wrap justify-center gap-8'>
                        <CardSchedule />
                        <CardSchedule />                    
                    </div>
                    <div className='hidden lg:flex flex-wrap justify-center gap-8'>
                        <CardSchedule />
                        <CardSchedule />                    
                    </div>  
                    <div className='hidden lg:flex flex-wrap justify-center gap-8'>
                        <CardSchedule />
                        <CardSchedule />                    
                    </div>  
                </div>

                <div className='relative flex justify-between my-10'>
                    <div className='border-b border-primary sm:w-[40%] w-[30%]'></div>
                    <p className='absolute w-[100%] max-w-7xl text-center text-primary top-[-14px]'>view more</p>
                    <div className='border-b border-primary sm:w-[40%] w-[30%]'></div>

                </div>



            </div>
        </main>

        <Footer />
    </>

  )
}

export default DetailMovie