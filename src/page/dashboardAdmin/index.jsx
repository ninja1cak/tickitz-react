
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cards from '../../component/cards'
import useApi from '../../helper/useApi'
import {useApiMulti} from '../../helper/useApi'

import Header from '../../component/header';
import Footer from '../../component/footer';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function DashboardAdmin() {
    const [title_movie, setTitleMovie] = useState('')    
    const [director_movie, setDirectorMovie] = useState('')    
    const [casts_movie, setCastsMovie] = useState([])    
    const [release_date_movie, setReleaseDateMovie] = useState('')    
    const [genreName, setGenreName] = useState([])
    const [synopsis_movie, setSynopsisMovie] = useState('')
    const [duration_movie, setDurationMovie] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [showImage, setShowImage] = useState()     
    const [genres, setGenres] = useState([])
    const [url_image_movie, setUrlImageMovie]=useState()

    const [status, setStatus] = useState()
    const [movies, setMovies] = useState([])
    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState('1')
    const [meta, setMeta] = useState([])
    
    const api = useApi()
    const apiMulti = useApiMulti()
    const navigate = useNavigate()

    const {data} = useSelector((s) => s.user )
    const role = data.role

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
            const {data} = await api({
                url: `/movie/show?page=${page}&limit=8&genre=${filter}&search=${search}` 
            })

    
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
            setMeta(data.meta)

    
        } catch (error) {
            console.log(error)
        }
      }

    const getGenres = async () => {
        try {
            const {data} = await api({
                url: `/genre/show`
            })
            setGenres(data.data)        
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
      }
    
      const addGenre = (v) =>{
        if(!genreName.includes((v.target.value))){
            setGenreName(arr => [...arr, (v.target.value)])
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
        setGenreName(
          genreName.filter( (item) => {
            return item !== name;
          })
        );

      }
      
    const deleteItem = (e) => {
        const name = e;
        console.log(e)
        setCastsMovie(
          casts_movie.filter( (item) => {
            return item !== name;
          })
        );

      };


    const createNewMovie = async (e) =>{
        try {
            e.preventDefault()
            
            const idGenre = genreName.map((v) => {
                return v.split(':')[0]
            })
            
            const formData = new FormData()
            formData.append('title_movie', title_movie)
            formData.append('genre', idGenre)
            formData.append('director_movie', director_movie)
            formData.append('casts_movie', casts_movie)
            formData.append('synopsis_movie', synopsis_movie)
            formData.append('release_date_movie', release_date_movie)
            formData.append('duration_movie', duration_movie)
            formData.append('image', url_image_movie)

            for (const value of formData.values()) {
                console.log(value);
              }
            const data = await apiMulti({
                url: `/movie/insert`,
                method: 'POST',
                data: formData
            })

            setStatus(data.data.status)

        } catch (error) {

            setStatus(error.response.status)
            console.log(error)

        }
    }


    useEffect(() =>{
        // createNewMovie()
        getGenres()
        getMovies()

        // getMoviesById()
       // console.log(casts_movie)
    },[filter, search, status, page])

    
    
    
    if(role !== 'admin'){
        return (
            <>
            <p>You are not an admin</p>
            {
                navigate('/')
            }
            </>


          )
    }else{
        return (
            <>
                <Header />
                <main className="bg-gray-100">
                    <p className='text-3xl mx-auto max-w-7xl px-4 sm:px-6 mb-4 pt-4  lg:px-8 block '>Form Movie</p>         

                    <div className='mx-auto max-w-7xl sm:px-6  lg:px-8 block z-50 '>
                        <div className='bg-white mx-auto max-w-7xl sm:px-6 py-4 lg:px-8  rounded-xl h-[1300px] lg:h-auto'>
                            <form className="mt-4 w-[100%]  max-w-7xl flex flex-col justify-center items-center lg:block  " method='POST' onSubmit={createNewMovie} encType="multipart/form-data">
                                <div className=' flex w-80 justify-center items-center lg:w-full gap-x-10 flex-col lg:flex-row '>
                                    <div>
                                        <div className='border h-96 w-72 relative group z-10'>
                                            
                                            <input
                                            type="file"
                                            id="file"  
                                            onChange={(e) => {setUrlImageMovie(e.target.files[0]); e.target.files[0] ? setShowImage(URL.createObjectURL(e.target.files[0])) : setShowImage()}}
                                            className='mt-5 ml-5 absolute h-80 w-64 cursor-pointer opacity-0'
                                            />
                                            <img src={showImage} className=' object-cover h-96 p-10' alt=""  />
                                            <p className=' -z-10 absolute top-44 left-24 text-center border border-primary bg-primary text-white p-2 rounded-lg font-semibold group-hover:block hidden'>Choose File</p>

                                        </div>                                        

                                    </div>
                                    <div className='flex flex-col w-full h-96 lg:flex-wrap gap-x-10 '>
                                    <div className='max-w-xs'>
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
                                    </div >
                                    <div className='max-w-xs'>
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
                                    <div className='max-w-xs'> 
                                    <label className="block mt-4 mb-2">Release Date Movie</label>
                                    <input
                                        className="h-14 border border-gray-300 w-full px-5"
                                        type="date"
                                        id="email"
                                        name="email"
                                        value={release_date_movie}
                                        onChange={e => setReleaseDateMovie(e.target.value)}
                                    />
                                    </div>
                                    
                                    <div className='max-w-xs'>
                                    <label className="block mt-4 mb-2">Genre</label>
                                    <div className=' flex justify-between'>
                                        <p className='border h-14 w-[300px] flex items-center'>
                                            
                                            {
                                                genreName.length != 0 ? genreName.map((e)=>{
                                                    return <p onClick={val=> deleteGenre(val.target.innerText)} className='h-5 text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1 text-center'>{e}</p>
                                                }) : <p className='text-gray-400 pl-5'>Select genre</p>
                                            }
                                        </p>

                                        <select onChange={addGenre} className="select select-ghost w-[50px] border border-gray-300 ml-4 inline">                          
                                            <option selected>+</option>
                                            {genres ? (genres.map((v) => {
                                                return <option>{[v.id_genre, ': ', v.name_genre]}</option>
                                            })) : (
                                                <option></option>
                                            )}
                                        </select>
                                    </div>

                                    
                                    </div>
                                    <div className='max-w-xs'>
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
                                    <div className='max-w-xs'>
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
                                        <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer hover:transition-opacity hover:opacity-80 active:opacity-50 active:transition-opacity' onClick={addCastsMovie}>+</p>
                                        </div>
                                        <p className='text-sm'>Cast Movies Added: </p>
                                        {
                                            casts_movie.map((e)=>{
                                                return <p onClick={val => deleteItem(val.target.innerText)} className=' inline text-sm bg-primary text-white px-2 rounded-lg cursor-pointer ml-1'>{e}</p>
                                            })
                                        }
                                    </div>
                                    <div className='block lg:hidden'>
                                    <label className="  mt-4 mb-2">Synopsis Movie</label>
                                    <textarea 
                                        className=' h-28 border w-full px-4'
                                        value={synopsis_movie}
                                        onChange={e => setSynopsisMovie(e.target.value)} 
                                        placeholder='Write synopsis movie'
                                    >
                                    </textarea>

                                    </div>
                                    <div className="blcok lg:hidden">
                                <div className='flex justify-end'>
                                <button className="btn bg-primary text-white" onClick={()=>window.my_modal_1.showModal()}>Submit</button>
                                <dialog id="my_modal_1" className="modal">
                                <form method="dialog" className="modal-box">
                                    <h3 className="font-bold text-lg">Status</h3>
                                    {
                                        status === undefined ? <p>Please Wait For Saving Data</p> : status === 201 ? <p>add movie success</p> : <p> add movie failed</p>
                                    }
                                    <div className="modal-action">
                                    <button className="btn" onClick={() => navigate(0)}>Close</button>
                                    </div>
                                </form>
                                </dialog>
                 
                                </div>
                                </div>


                                    </div>
                                </div>

                                <div className='hidden lg:block'>
                                    <label className=" block mt-4 mb-2">Synopsis Movie</label>
                                    <textarea 
                                        className=' h-28 border w-full px-4'
                                        value={synopsis_movie}
                                        onChange={e => setSynopsisMovie(e.target.value)} 
                                        placeholder='Write synopsis movie'
                                    >
                                    </textarea>

                                </div>

                                <div className="hidden lg:block">
                                <div className='flex justify-end'>
                                <button className="btn bg-primary text-white" onClick={()=>window.my_modal_2.showModal()}>Submit</button>
                                <dialog id="my_modal_2" className="modal">
                                <form method="dialog" className="modal-box">
                                    <h3 className="font-bold text-lg">Status</h3>
                                    {
                                        status === undefined ? <p>Please Wait For Saving Data</p> : status === 201 ? <p>add movie success</p> : <p> add movie failed</p>
                                    }
                                    <div className="modal-action">
                                    <button className="btn" onClick={() => navigate(0)}>Close</button>
                                    </div>
                                </form>
                                </dialog>
                 
                                </div>
                                </div>


                            </form>
                        </div>                            

                    </div>

                    <div>
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
                                movies != '' ? (
                                movies.map((v)=>{
                                    return <Cards name={v.title_movie} genre={v.genre} image={v.url_image_movie} id_movie={v.id_movie} />
                                    
                                })) : (
                                <h1 className='text-center text-black'>Data not found</h1>
                                )

                            }
                        </div>

                        </div>
                        <div className=' flex gap-x-4 justify-center mt-5'>
                        {
                            meta.prev === null ? '' : <button onClick={() => setPage(meta.prev)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Previous</button>

                        }
                        <button className="btn btn-sm btn-outline bg-primary border border-white w-24 text-white" >{meta.prev === null ? '1'  : meta.prev + 1}</button>
                        {
                            meta.next === null ? '' : <button onClick={() => setPage(meta.next)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Next</button>
                        }
                     </div>

                    </div>
                    </div>


                </main>


                <Footer />
            </>

          )
    }

}

export default DashboardAdmin