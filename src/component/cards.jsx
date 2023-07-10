import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../helper/useApi'



function Cards({ name, image, genre, id_movie, onPage, hover}) {
    const navigate = useNavigate()
    const api = useApi()
    const [status, setStatus] = useState()
    const handleDeleteMovie = async () =>{
        try {
            const {data} = await api({
                url:`movie/delete/${id_movie}`,
                method:'DELETE'
            })
            console.log(data)
            setStatus(data.status)
            navigate(0)
        } catch (error) {
            
        }
    }

    useEffect(() =>{

    }, [status])

    return (
        <>

            {
                hover ? 
                <>
                <div className="block card w-56 bg-none hover:shadow-lg hover:bg-white 	my-2 group">
                    <figure className="px-5 py-10 rounded-md border border-white group-hover:border-none group-hover:pb-0">
                        <img className="rounded-md h-60" src={image} alt="poster" />
                    </figure>
                    <div class="card-body items-center text-center hidden group-hover:block ">
                        <h2 class="card-title text-sm line-clamp-1">{name}</h2>
                        <p className=" text-gray-400 text-sm line-clamp-1">{genre}</p>
                        {
                            onPage === 'detail' ? <button onClick={()=>navigate(`/detail/${id_movie}`)} class="btn btn-sm btn-outline btn-primary w-32"> Detail   </button>
                            :
                            <div>
                                <button onClick={()=>navigate(`/update/${id_movie}/1`)} class="btn btn-sm btn-outline btn-primary w-32 mb-2"> Update </button>
                                <button onClick={handleDeleteMovie} class="btn btn-sm btn-outline bg-red-500 w-32 text-white"> Delete </button>

                            </div>

                        }
                    </div> 
                </div>
                </> : 
                <>
                        <div className="card w-56 bg-base-100 card-bordered	my-2 group">
            <figure className="px-5 pt-10 rounded-md ">
                <img className="rounded-md h-60" src={image} alt="poster" />
            </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title text-sm line-clamp-1">{name}</h2>
                    <p className="text-gray-400 text-sm line-clamp-1">{genre}</p>
                    {
                        onPage === 'detail' ? <button onClick={()=>navigate(`/detail/${id_movie}`)} class="btn btn-sm btn-outline btn-primary w-32"> Detail   </button>
                        :
                        <div>
                            <button onClick={()=>navigate(`/update/${id_movie}`)} class="btn btn-sm btn-outline btn-primary w-32 mb-2"> Update </button>
                            <button onClick={handleDeleteMovie} class="btn btn-sm btn-outline bg-red-500 w-32 text-white"> Delete </button>

                        </div>

                    }
                </div> 
                </div>

               </>
            }



        </>

    )
}

export default Cards
