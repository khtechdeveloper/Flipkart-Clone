import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
const apiUrl = import.meta.env.VITE_API_URL;

function ReviewList() {
  let [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      url: apiUrl + "/admin/reviews",
      method: "get",
    })
      .then((result) => {
        if (result.data.success) {
          setReviews(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>User Name</th>
            <th>Book</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((rev) => (
            <tr key={rev._id}>
              <td>{rev.userEmail}</td>
              <td>{rev.userName}</td>
              <td>{rev.bookId?.bookTitle}</td>
              <td>{rev.comment}</td>
              <td>{rev.rating ?? "-"}</td>
              <td>{rev.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReviewList;