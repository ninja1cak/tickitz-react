import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function Cards({ name, image, genre, id_movie, onPage}) {
    const navigate = useNavigate()
    const [status, setStatus] = useState()
    const handleDeleteMovie = async () =>{
        try {
            const {data} = await axios.delete(`http://localhost:8888/movie/delete/${id_movie}`)
            console.log(data)
            setStatus(data.status)
            navigate(0)
        } catch (error) {
            
        }
    }

    useEffect(() =>{

    }, [status])

    return (
        <div className="card w-56 bg-base-100 card-bordered	my-2">
            <figure className="px-5 pt-10 rounded-md">
                <img className="rounded-md h-60" src={image} alt="poster" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-sm line-clamp-1">{name}</h2>
                <p className="text-gray-400 text-sm line-clamp-1">{genre}</p>
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
    )
}

export default Cards
