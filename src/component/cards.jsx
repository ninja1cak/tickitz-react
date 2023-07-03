import React from 'react'
import { useNavigate } from 'react-router-dom'


function Cards({ name, image, genre, id_movie}) {
    const navigate = useNavigate()

    return (
        <div className="card w-56 bg-base-100 card-bordered	my-2">
            <figure className="px-5 pt-10 rounded-md">
                <img className="rounded-md h-60" src={image} alt="poster" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-sm line-clamp-1">{name}</h2>
                <p className="text-gray-400 text-sm line-clamp-1">{genre}</p>
                <button onClick={()=>navigate(`/detail/${id_movie}`)} class="btn btn-sm btn-outline btn-primary w-32">
                    Detail
                </button>
            </div>
        </div>
    )
}

export default Cards
