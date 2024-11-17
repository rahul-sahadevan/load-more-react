import React, { useEffect, useState } from "react";
import axios from "axios";



const LoadMore = ()=>{

    const [product,setProduct]  = useState([])
    const[count,setCount] = useState(0)
    const [dissableBtn,setDissable] = useState(false)

let arr = new Array(5)

  arr.fill(0)

    async function fetchProduct(){

        try{

            const respose = await axios.get(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`)
            console.log(product)
            setProduct([...product,respose.data.products])

        }
        catch(error){

            console.log(error.message)
        }
    }
    


    useEffect(()=>{
        fetchProduct()
    },[count])

    useEffect(()=>{
        console.log(product.length)
        if(product && product.length === 11){
            setDissable(true)
        }

    },[product])


    return (
        <div className="major-div">
           {
            product.map((product,index)=>(

                    <div className="container">
                        {
                           
                            (
                                product.map((pro,index)=>(
                                    <div className="product">
                                        <img src={pro.thumbnail}></img>
                                    </div>
                                ))
                            )
                        }
                    </div>
            ))
        }
       <button disabled={dissableBtn} onClick={()=>setCount(count+1)}>Load More</button>
       {
        dissableBtn ? "No More Data" :  null
       }

        </div>
    )
}

export default LoadMore