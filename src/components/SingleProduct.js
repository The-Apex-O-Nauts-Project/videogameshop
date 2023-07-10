import React from "react"

function SingleProduct(props) {
const {navigate, singleProduct, setSingleProduct} = props    
   
return (
    <>
    <h2>{singleProduct.name}</h2>
    <p>{singleProduct.description}</p>
    <p>{singleProduct.price}</p>
    <p>{singleProduct.category}</p>
    </>

)
}
  
  
  export default SingleProduct;
  