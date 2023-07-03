
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cards from '../../component/cards'

import { setAuthToken } from "../../utils/auth";
import axios from 'axios'

function DashboardAdmin({role}) {
    const [title_movie, setTitleMovie] = useState('')    
    const [director_movie, setDirectorMovie] = useState('')    
    const [casts_movie, setCastsMovie] = useState([])    
    const [release_date_movie, setReleaseDateMovie] = useState('')    
    const [genre, setGenre] = useState([])
    const [synopsis_movie, setSynopsisMovie] = useState('')
    const [duration_movie, setDurationMovie] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [inputGenre, setInputGenre] = useState('')
    const [movies, setMovies] = useState([])
    const [id_movie, setIdMovie] = useState('')
    
    
    const [detailMovie, setDetailMovie] = useState([])
    const [genres, setGenres] = useState([])
    const [url_image_movie, setUrlImageMovie]=useState()

    setAuthToken(localStorage.getItem('token'))
    
    const getMoviesById = (e) =>{
        try {
            e.preventDefault()

            console.log("ID MOVIE ",id_movie)
   

        } catch (error) {
            
        }
    }
  
    const getMovies = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie/show?limit=999`)

            setMovies(data.data)
            console.log(data.data)
    
    
        } catch (error) {
            console.log(error)
        }
      }
    const getGenres = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/genre/show`)
            setGenres(data.data)        
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
      }
      
    const addGenre = (v) => {
        if(inputGenre){
            if(!genre.includes(inputGenre)){
                setGenre(genre, genre.push(inputGenre))
            }

            setInputGenre('')
        }
      }
    
    const addCastsMovie = () =>{
        if(inputValue){
            setCastsMovie(casts_movie, casts_movie.push(inputValue))
            setInputValue('')
        }
    }

    const deleteGenre = (e) => {
        const name = e;
        console.log(e)
        setGenre(
          genre.filter( (item) => {
            return item !== name;
          })
        );

      };

    const deleteItem = (e) => {
        const name = e;
        console.log(e)
        setCastsMovie(
          casts_movie.filter( (item) => {
            return item !== name;
          })
        );

      };

    const updateMovie = async (e) =>{
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append('title_movie', title_movie)
            formData.append('genre', genre)
            formData.append('director_movie', director_movie)
            formData.append('casts_movie', casts_movie)
            formData.append('synopsis_movie', synopsis_movie)
            formData.append('release_date_movie', release_date_movie)
            formData.append('duration_movie', duration_movie)
            formData.append('image', url_image_movie)
            const data = await axios.patch(`${process.env.REACT_APP_API_URL}/movie/update/${id_movie}`, formData)

        } catch (error) {
            
        }
    }

    const createNewMovie = async (e) =>{
        try {
            e.preventDefault()
            const formData = new FormData()
            console.log(genre)
            formData.append('title_movie', title_movie)
            formData.append('genre', genre)
            formData.append('director_movie', director_movie)
            formData.append('casts_movie', casts_movie)
            formData.append('synopsis_movie', synopsis_movie)
            formData.append('release_date_movie', release_date_movie)
            formData.append('duration_movie', duration_movie)
            formData.append('image', url_image_movie)
            console.log(localStorage.getItem('token'))
            // const data = await axios.post('http://localhost:8888/movie/insert', {title_movie, genre, url_image_movie, director_movie, casts_movie, release_date_movie,  duration_movie, synopsis_movie})
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/movie/insert`, formData)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        // createNewMovie()
        getGenres()
        getMovies()
        getMoviesById()
        // console.log(casts_movie)

    },[genre, detailMovie])

    
    
    
    if(role !== 'admin'){
        return (

            <p>You are not an admin</p>

          )
    }else{
        return (
            <>
                <h1 className='text-5xl'>Dashboard Admin</h1>
                <h2 className='my-10 text-4xl '>Create Database</h2>

                <form className="mt-4 w-[100%] max-w-md" method='POST' onSubmit={createNewMovie} encType="multipart/form-data">
                    <div>
                    <label className="block mt-4 mb-2">Title Movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={title_movie}
                        onChange={e => setTitleMovie(e.target.value)}
                        placeholder="Write title movie"
                    />
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Director Movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={director_movie}
                        onChange={e => setDirectorMovie(e.target.value)}
                        placeholder="Write your director movie"
                    />
                    </div>
                    <div className='relative '>
                        <label className="block mb-2 mt-4">Casts_movie</label>

                        <div className='flex justify-between'>                        
                            <input
                            className="h-14 border border-gray-300 w-[80%] pl-5"
                            type="text"
                            id="email"
                            name="email"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Write your casts movie"
                        />
                        <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer' onClick={addCastsMovie}>+</p>
                        </div>
                        <p className='text-sm'>Cast Movies Added: </p>
                        {
                            casts_movie.map((e)=>{
                                return <p onClick={val => deleteItem(val.target.innerText)} className=' inline text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1'>{e}</p>
                            })
                        }
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Release Date Movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="date"
                        id="email"
                        name="email"
                        value={release_date_movie}
                        onChange={e => setReleaseDateMovie(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Genre</label>
                    <div className='flex justify-between'>
                        <input
                            className="h-14 border border-gray-300 w-[80%] pl-5"
                            type="text"
                            id="email"
                            name="email"
                            value={inputGenre}
                            onChange={e => setInputGenre(e.target.value)}
                        />
                        <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer' onClick={addGenre}>+</p>
                    </div>
                    <p className='text-sm'>Genre Added: </p>
                    {
                        genre.map((e)=>{
                            return <p onClick={val=> deleteGenre(val.target.innerText)} className='inline text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1 text-center'>{e}</p>
                        })
                    }
                    <select className="select select-ghost max-w-xs block">                          
                          <option selected>Check id genre</option>
                          {genres ? (genres.map((v) => {
                              return <option>{[v.id_genre, ': ', v.name_genre]}</option>
                          })) : (
                            <option></option>
                          )}
                      </select>
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Synopsis Movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="email"
                        name="email"
                        value={synopsis_movie}
                        onChange={e => setSynopsisMovie(e.target.value)}
                    />

                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Duration Movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="text"
                        id="email"  
                        name="email"
                        value={duration_movie}
                        onChange={e => setDurationMovie(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="block mt-4 mb-2">Url image movie</label>
                    <input
                        className="h-14 border border-gray-300 w-full pl-5"
                        type="file"
                        id="file"  

                        onChange={e => setUrlImageMovie(e.target.files[0])}
                    />
                    </div>
                    <div className="">
                    <input
                        className="h-14 mt-8 bg-primary text-white tracking-wider w-full rounded-xl cursor-pointer"
                        type="submit"
                        // onclick="location.href='index.html';"

                    />
                    </div>
                </form>
                <h2 className='my-10 text-4xl '>Update Database</h2>
                <select className="select select-ghost max-w-xs block">                          
                          <option selected>Check id movie</option>
                          {movies ? (movies.map((v) => {
                              return <option>{[v.id_movie, ': ', v.title_movie]}</option>
                          })) : (
                            <option></option>
                          )}
                </select>
                <div className='flex'>
                    <form className="mt-4 w-[100%] max-w-md" method='PATCH' onSubmit={updateMovie} encType="multipart/form-data">
                        <div>
                        <label className="block mt-4 mb-2">Id Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={id_movie}
                            onChange={e => setIdMovie(e.target.value)}
                            placeholder=''
                        />
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Title Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={title_movie}
                            onChange={e => setTitleMovie(e.target.value)}
                            placeholder=''
                        />
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Director Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={director_movie}
                            onChange={e => setDirectorMovie(e.target.value)}
                            placeholder="Write your director movie"
                        />
                        </div>
                        <div className='relative '>
                            <label className="block mb-2 mt-4">Casts_movie</label>

                            <div className='flex justify-between'>                        
                                <input
                                className="h-14 border border-gray-300 w-[80%] pl-5"
                                type="text"
                                id="email"
                                name="email"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Write your casts movie"
                            />
                            <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer' onClick={addCastsMovie}>+</p>
                            </div>
                            <p className='text-sm'>Cast Movies Added: </p>
                            {
                                casts_movie.map((e)=>{
                                    return <p onClick={val => deleteItem(val.target.innerText)} className=' inline text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1'>{e}</p>
                                })
                            }
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Release Date Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="date"
                            id="email"
                            name="email"
                            value={release_date_movie}
                            onChange={e => setReleaseDateMovie(e.target.value)}
                        />
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Genre</label>
                        <div className='flex justify-between'>
                            <input
                                className="h-14 border border-gray-300 w-[80%] pl-5"
                                type="text"
                                id="email"
                                name="email"
                                value={inputGenre}
                                onChange={e => setInputGenre(e.target.value)}
                            />
                            <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer' onClick={addGenre}>+</p>
                        </div>
                        <p className='text-sm'>Genre Added: </p>
                        {
                            genre.map((e)=>{
                                return <p onClick={val=> deleteGenre(val.target.innerText)} className='inline text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1 text-center'>{e}</p>
                            })
                        }
                        <select className="select select-ghost max-w-xs block">                          
                                <option selected>Check id genre</option>
                                {genres ? (genres.map((v) => {
                                    return <option>{[v.id_genre, ': ', v.name_genre]}</option>
                                })) : (
                                <option></option>
                                )}
                            </select>
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Synopsis Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="text"
                            id="email"
                            name="email"
                            value={synopsis_movie}
                            onChange={e => setSynopsisMovie(e.target.value)}
                        />

                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Duration Movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="text"
                            id="email"  
                            name="email"
                            value={duration_movie}
                            onChange={e => setDurationMovie(e.target.value)}
                        />
                        </div>
                        <div>
                        <label className="block mt-4 mb-2">Url image movie</label>
                        <input
                            className="h-14 border border-gray-300 w-full pl-5"
                            type="file"
                            id="file"  

                            onChange={e => setUrlImageMovie(e.target.files[0])}
                        />
                        </div>
                        <div className="">
                        <input
                            className="h-14 mt-8 bg-primary text-white tracking-wider w-full rounded-xl cursor-pointer"
                            type="submit"
                            // onclick="location.href='index.html';"

                        />
                        </div>
                    </form>

                    <form className="mt-10 ml-20 w-[100%] max-w-md" method='GET' >
                            
                            <p className='my-4'>Title Movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.title_movie : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>Director Movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.director_movie : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>Casts Movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.casts_movie.join(', ') : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>release_date_movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.release_date_movie : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>Genre</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.genre.map((e) =>{return e.id + ': '+ e.value +', '}) : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>synopsis_movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.synopsis_movie : ''}</p>
                                    })) : ( <p></p>      )}
                            <p className='mt-6 mb-4'>duration_movie</p>
                            {movies ? (movies.map((v) => {
                                return  <p>{v.id_movie == id_movie ? v.duration_movie : ''}</p>
                                    })) : ( <p></p>      )}                            
                       
                    </form>

                </div>

            </>

          )
    }

}

export default DashboardAdmin