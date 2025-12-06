import axios from "axios"
import { useState, useEffect} from "react"
const apiUrl=import.meta.env.VITE_API_URL;
function TransactionList(){
    let [transactions, setTransaction]=useState([])

    useEffect(()=>{
        axios({
            url:apiUrl+'/admin/transactions',
            method:'get'
        }).then((result)=>{
            setTransaction(result.data.data)
        }).catch((err)=>{
            alert('err')
        })
    },[])
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Amount paid</th>
                        <th>Product</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction)=>
                            <tr>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.email}</td>
                                <td>{transaction.mobNo}</td>
                                <td>{transaction.totalPrice}</td>
                                <td>{
                                        transaction.products.map((product)=>
                                            product.bookTitle+ ""
                                        )
                                    }

                                </td>
                                <td>{transaction.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
export default TransactionList