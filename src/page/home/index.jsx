import React, {useState, useEffect} from 'react'


import Header from '../../component/header'
import Footer from '../../component/footer'
import Cards from '../../component/cards'

import Hero from '../../assets/hero.png'
import card1 from '../../assets/card1.png'
import card2 from '../../assets/card2.png'
import card3 from '../../assets/card3.png'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { setAuthToken } from '../../utils/auth'

function Home() {
    const navigate = useNavigate()

    const [movies, setMovies] = useState([])

    setAuthToken(localStorage.getItem('token'))

    const getMovies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie/show?page=1&limit=5`)


            let genreMovie =[]
            let dataMovies = data.data.map((v) =>{
                v.genre.map((val) => {
                    genreMovie.push(val.value)
                })
                const data = {
                    ...v,
                    genre: genreMovie.join(', ')
                }

                
                genreMovie=[]
                return data
            })
            setMovies(dataMovies)
            console.log(dataMovies)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovies()
        console.log("movies: ", movies)

    }, [])
    return (
    <>
    <Header/>
    <main>
                <div className="hero mx-auto flex max-w-7xl sm:flex-row flex-col items-center justify-between p-5 lg:h-128">
                    <div className="flex-initial sm:text-left text-center">
                        <h3 className="lg:text-2xl font-normal leading-6 text-gray-400 md:pb-4">Nearest Cinema, Newst Movie</h3>
                        <h1 className="lg:text-6xl md:text-4xl text-2xl font-medium text-primary">Find Out Now!</h1>
                    </div>
                    <div className="flex-initial">
                        <img className="lg:h-auto md:h-96 h-80 md:w-auto" src={Hero} alt="logo" />
                    </div>
                </div>
                <section className="bg-graysmoth">
                    <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-5 py-10">
                        <div className="flex justify-between w-full mb-10">
                            <p className="md:text-2xl xs:text-1xl font-medium text-primary">
                                <span className="bg-gradient-to-r from-primary via-primary to-primary bg-[length:50%_3px] bg-no-repeat bg-bottom pb-2">Now Showing</span>
                            </p>
                            <Link to="/list/1" className="font-medium text-primary">
                                View all
                            </Link>
                        </div>
                        <div className="flex lg:flex-nowrap flex-wrap justify-between w-full">
                            <a href="/#" className="cards p-8 border-2 border-white h-60 lg:h-auto hover:border-primary">
                                <img className="max-h-full" src={card1} alt="cards" />
                            </a>
                            <a href="/#" className="cards p-8 border-2 border-white h-60 lg:h-auto hover:border-primary">
                                <img className="max-h-full" src={card2} alt="cards" />
                            </a>
                            <a href="/#" className="cards p-8 border-2 border-white h-60 lg:h-auto hover:border-primary">
                                <img className="max-h-full" src={card3} alt="cards" />
                            </a>
                            <a href="/#" className="cards p-8 border-2 border-white h-60 lg:h-auto hover:border-primary">
                                <img className="max-h-full" src={card1} alt="cards" />
                            </a>
                            <a href="/#" className="cards p-8 border-2 border-white h-60 lg:h-auto hover:border-primary">
                                <img className="max-h-full" src={card2} alt="cards" />
                            </a>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="mx-auto max-w-7xl p-5 mt-10">
                        <div className="flex justify-between w-full mb-10">
                            <p className='md:text-2xl xs:text-1xl font-medium'>
                                Upcoming Movies
                            </p>
                            <Link to="/list/1" className="font-medium text-primary">
                                View all
                            </Link>
                        </div>
                        <div className="block overflow-auto whitespace-nowrap gap-x-2 text-primary font-medium my-8 py-2">
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">January</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 mx-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">February</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">March</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 mx-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">April</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">May</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 mx-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">June</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">July</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 mx-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">August</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50 ">September</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 mx-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">October</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">November</button>
                            <button className="border border-primary rounded-lg h-10 px-6 w-32 ml-4 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary active:opacity-50">Desember</button>
                        </div>
                        <div className='flex gap-x-4 justify-between flex-wrap'>
                            {
                                movies.map((v)=>{
                                    return <Cards name={v.title_movie} genre={v.genre} image={v.url_image_movie} id_movie={v.id_movie} />
                                    
                                })
                            }
                        </div>

                    </div>
                </section>
                <section class='mt-10 px-5 max-w-7xl mx-auto  '>
                    <div className='bg-white drop-shadow-lg py-10 '>
                        <div className='text-center mb-10'>
                            <p className='text-gray-500 tracking-wider md:text-xl'>Be the vanguard of the</p>
                            <p className='tracking-wider text-primary text-4xl font-medium md:text-5xl md:tracking-wide'>Moviegoers</p>
                        </div>
                        <form className='flex flex-col max-w-7xl md:flex-row md:justify-center md:gap-x-4 mx-auto  px-10 gap-y-4 '>
                            <input class=' border border-gray-300 h-10 pl-5 tracking-wider text-sm w-[100%] max-w-sm mx-auto md:max-w-[250px] md:mx-0' type='text' placeholder='Type your email'></input>
                            <input class=' border border-gray-300 bg-primary text-white tracking-wider h-10 w-[100%] text-sm max-w-sm mx-auto md:max-w-[100px] md:mx-0' type='submit' value='Join Now'></input>
                        </form>
                        <p className='mt-10 tracking-widest text-gray-500 text-center w-[85%] max-w-xl mx-auto text-sm'>By joining you as a Tickitz member, we will always send you the latest updates via email .</p>

                    </div>
                </section>
    </main>
    <Footer/>
    </>
    
  )
}

export default Home