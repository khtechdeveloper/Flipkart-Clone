import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
function PlaceList() {
    const navigate = useNavigate();
    let [places, setPlaces] = useState([])

    function goToAddPlacePage() {
        navigate('/add/place')
    }
    function goToDelete(id) {
        alert(id)
    }
    function goToEdit(id) {
        alert(id)
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/places/for/book/delivery',
            method: 'get'
        }).then((res) => {
            setPlaces(res.data.data)
        })
    }, [])
    return (
        <>
            <button className="btn btn-success ms-3 mt-3 float-end" onClick={goToAddPlacePage}>Add Place for Book Delivery +</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>PinCode</th>
                        <th>City</th>
                        <th>Is Available</th>
                        <th>Delivery Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        places.map((place) =>
                            <tr>
                                <td>{place.book.bookTitle}</td>
                                <td>{place.pinCode}</td>
                                <td>{place.city}</td>
                                <td>{place.isAvailable ? 'YES' : 'NO'}</td>
                                <td>{place.deliveryTime}</td>
                                <td>
                                    <i className='bi bi-trash' onClick={() => goToDelete(place._id)}></i>
                                    <i className='bi bi-pencil ms-2' onClick={() => goToEdit(place._id)}></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </>
    )
}
export default PlaceList