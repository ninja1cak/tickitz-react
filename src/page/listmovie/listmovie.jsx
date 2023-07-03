import React, {useState, useEffect} from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Cards from '../../component/cards'
import { setAuthToken } from '../../utils/auth'
function Listdetail() {
  const navigate = useNavigate()
  const params = useParams()
  
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState('')
  setAuthToken(localStorage.getItem('token'))

  const getGenres = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/genre/show`)
        setGenres(data.data)        
        console.log(data.data)
    } catch (error) {
        console.log(error)
    }
  }

  const changeFilter = (v) => {
    if (v.target.value !== 'All') {
        setFilter(v.target.value)
    } else {
        setFilter('')
    }
  }

  const inputSearch = (v) => {
    if (v.target.value !== '') {
        setSearch(v.target.value)
    } else {
        setSearch('')
    }
  }

  const getMovies = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie/show?page=${params.id}&limit=8&genre=${filter}&search=${search}`)


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
        const meta ={
          meta: {
            ...data.meta,
            prev: data.meta.prev || (data.meta.next - 1),
            next: data.meta.next || (data.meta.prev + 1),
            a: 'b'
          }
        }
        setMovies(dataMovies)
        setPage(meta.meta)



    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    getMovies()
  }, [filter, search, page, movies])

  useEffect(() =>{
    getGenres()
    getMovies()
  }, [])

  return (
    <>
        <Header />
        <main className="bg-gray-100">

            <div className="mx-auto max-w-7xl p-5 mt-10">
                <div className="flex flex-col sm:flex-row sm:justify-between  w-full  sm:items-center">
                  <h2 className="md:text-2xl xs:text-1xl font-medium">List Movie</h2>
                  <div className="flex gap-x-5  w-[320px] ">
                      <select onChange={changeFilter} className="select w-[30%] max-w-xs">
                          
                          <option selected>All</option>
                          {genres ? (genres.map((v) => {
                              return <option>{v.name_genre}</option>
                          })) : (
                            <option></option>
                          )}
                      </select>
                      <input onChange={inputSearch} type="text" placeholder="Search Movie Name" className="input input-bordered w-[70%] max-w-xs" />
                  </div>
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
                <div className='bg-white p-10 rounded-lg'>
                  <div className='flex gap-x-8 justify-center sm:justify-start flex-wrap w-[100%] max-w-[63rem] mx-auto   '>
                    {
                        movies ? (
                          movies.map((v)=>{
                            return <Cards name={v.title_movie} genre={v.genre} image={v.url_image_movie} id_movie={v.id_movie}/>
                            
                        })) : (
                          <h1>Data not found</h1>
                        )

                    }
                 </div>

                </div>
                <div className=' flex gap-x-4 justify-center mt-5'>
                  <button onClick={() => navigate(`/list/${page.prev}`)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Previous</button>
                  <button onClick={() => navigate(`/list/${page.next}`)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Next</button>
                </div>

            </div>
        </main>      
        <Footer />
    </>

  )
}

export default Listdetail