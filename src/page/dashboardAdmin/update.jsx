import React, {useState, useEffect} from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import { useParams, useNavigate } from 'react-router-dom'
import { useApiMulti } from '../../helper/useApi' 
import { useSelector } from 'react-redux'

function Update() {
    const [title_movie, setTitleMovie] = useState('')    
    const [director_movie, setDirectorMovie] = useState('')    
    const [casts_movie, setCastsMovie] = useState([])    
    const [release_date_movie, setReleaseDateMovie] = useState('')    
    const [genreName, setGenreName] = useState([])    
    const [synopsis_movie, setSynopsisMovie] = useState('')
    const [duration_movie, setDurationMovie] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [id_movie, setIdMovie] = useState('')
    const [showImage, setShowImage] = useState()     
    const [genres, setGenres] = useState([])
    const [url_image_movie, setUrlImageMovie]=useState()

    const navigate = useNavigate()
    const {data} = useSelector((s) => s.user )
    const role = data.role
    const apiMulti = useApiMulti()
    const [status, setStatus] = useState()
    const params = useParams()
    const [moviesById, setMoviesById] = useState([])

    
    const updateMovie = async (e) =>{
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
            console.log('id movie', id_movie)
            // const {data} = await axios.patch(`${process.env.REACT_APP_API_URL}/movie/update/${id_movie}`, formData)
            const {data} = await apiMulti({
                url: `/movie/update/${id_movie}`,
                method: "PATCH",
                data: formData
            })
            setStatus(data.status)
            console.log('status', status)
            console.log(data)
        } catch (error) {
            setStatus(404)
            console.log(error)
        }
    }

    const getMoviesById = async () =>{
        try {
            // const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie/show?id_movie=${params.idMovie}`)
            const {data} = await apiMulti({
                url:`/movie/show?id_movie=${params.idMovie}`
            })
            // const stringDate = new Date(data.data[0].release_date_movie)

            const newData = {
                ...data.data[0],
                casts_movie: data.data[0].casts_movie.join(', '),
                genre: data.data[0].genre.map((v) => {return v.value}).join(', ')
                // release_date_movie: stringDate.toDateString().split(' ').slice(1).join(' ')
            }
            setMoviesById(newData)
            setReleaseDateMovie(newData.release_date_movie.split('T').slice(0,1))
            setIdMovie(params.idMovie)
        } catch (error) {
            
        }
    }

    const getGenres = async () => {
        try {
            // const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/genre/show`)
            const {data} = await apiMulti({
                url: '/genre/show'
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


    useEffect(() =>{
        if(role !== 'admin'){
            navigate('/')
        }
        getMoviesById()
        getGenres()
    },[status])
    
    return (
        <>
            
            <Header />
            <main className=' bg-gray-100 py-10'>
            <p className='text-3xl mx-auto max-w-7xl px-4 sm:px-6 mb-4 pt-4  lg:px-8 relative '>Update Movie</p>         


            <div className='mx-auto max-w-7xl sm:px-6  lg:px-8 relative z-50'>
                <div className='bg-white mx-auto max-w-7xl sm:px-6 py-4 lg:px-8  rounded-xl h-[1400px] lg:h-auto'>
                    <form className="mt-4 w-[100%]  max-w-7xl flex flex-col justify-center items-center lg:block  " method='POST' onSubmit={updateMovie} encType="multipart/form-data">
                        <div className=' flex w-80 justify-center items-center lg:w-full gap-x-10 flex-col lg:flex-row'>
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
                                placeholder={moviesById.title_movie}
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
                                placeholder={moviesById.director_movie}
                            />
                            </div>
                            <div className='max-w-xs'> 
                            <label className="block mt-4 mb-2">Release Date Movie</label>
                            <input
                                className="h-14 border border-gray-300 w-full px-5"
                                type="date"
                                placeholder={moviesById.release_date_movie}
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
                                        }) : <p className='text-gray-400 pl-5'>{moviesById.genre}</p>
                                    }
                                </p>

                                <select onChange={addGenre} className="select select-ghost w-[70px] inline">                          
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
                                placeholder={moviesById.duration_movie}
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
                                    id="casts_movie"
                                    name="casts_movie"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    placeholder={moviesById.casts_movie}
                                />
                                <p className='  bg-primary text-white h-14 w-14 flex justify-center  items-center font-bold text-4xl pb-2 cursor-pointer' onClick={addCastsMovie}>+</p>
                                </div>
                                <p className='text-xs'>Cast Movies Added: </p>
                                {
                                    casts_movie.map((e)=>{
                                        return <p onClick={val => deleteItem(val.target.innerText)} className=' inline  bg-primary text-xs text-white px-2 rounded-lg cursor-pointer ml-1'>{e}</p>
                                    })
                                }
                            </div>
                            <div className='block lg:hidden'>
                            <label className="block mt-4 mb-2 ">Synopsis Movie</label>
                            <textarea 
                                className=' h-28 border w-full p-4'
                                value={synopsis_movie}
                                onChange={e => setSynopsisMovie(e.target.value)} 
                                placeholder={moviesById.synopsis_movie}
                            >
                            </textarea>

                            </div>

                            <div className=" block lg:hidden">
                            <div className='flex justify-between mt-5'>
                            <button className="btn bg-white text-primary border-primary w-20 " type='button' onClick={() => navigate('/admin')} >back</button>
                            <button className="btn bg-primary text-white w-20" type='submit' onClick={()=>window.my_modal_2.showModal()}>Submit</button>
                            <dialog id="my_modal_2" className="modal">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Status</h3>
                                {
                                    status === undefined ? <p>Please wait for updating data</p> : status == 200 ? <p>Update movie success</p> : <p> add movie failed</p>

                                }
                                <div className="modal-action">
                                <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                                </div>
                            </form>
                            </dialog>

                            </div>
                            </div>


                            </div>
                        </div>

                        <div className='hidden lg:block'>
                            <label className="block mt-4 mb-2 ">Synopsis Movie</label>
                            <textarea 
                                className=' h-28 border w-full p-4'
                                value={synopsis_movie}
                                onChange={e => setSynopsisMovie(e.target.value)} 
                                placeholder={moviesById.synopsis_movie}
                            >
                            </textarea>

                        </div>

                        <div className=" hidden lg:block">
                        <div className='flex justify-between mt-5'>
                        <button className="btn bg-white text-primary border-primary w-40" type='button' onClick={() => navigate('/admin')} >back</button>
                        <button className="btn bg-primary text-white w-40" type='submit' onClick={()=>window.my_modal_1.showModal()}>Submit</button>
                        <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Status</h3>
                            {
                                status === undefined ? <p>Please wait for updating data</p> : status == 200 ? <p>Update movie success</p> : <p> add movie failed</p>

                            }
                            <div className="modal-action">
                            <button className="btn" type='button' onClick={() => navigate(0)}>Close</button>
                            </div>
                        </form>
                        </dialog>

                        </div>
                        </div>


                    </form>

                </div>                            

            </div>
            </main>

            <Footer />
        </>
    )
}

export default Update