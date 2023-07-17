const BASE_URL = `http://localhost:3000/api/`

//========CART AJAX REQUEST=============

//Add To Cart

export const getAddToCart = async (productName,
  productPrice,
  productDescription,
  quantity,
  cartUserId,
  productId)  => {
  try {
    const response = await fetch(`${BASE_URL}/carts/addtocart`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
        productname: productName,
        productdescription: productDescription,
        productprice: productPrice,
        quantity: 1,
        cartOwnerId: cartUserId,
        productId: productId

      })
    });
   
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};

//Get User and Cart
// export const fetchUsersCart = async (userId) =>{
//     try {
//         const response = await fetch(`${BASE_URL}userandcart/${userId}`, {
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify(userId)
//          })
//          const result = await response.json()
//          console.log(result)
//          return result
//     }catch(err){
//         console.error("Error fetching users cart", err)
//     }
// }
//Get Cart By User Id
export const fetchCartByUserId = async (id) => {
  console.log(id)
  try {
    const response = await fetch(`${BASE_URL}/carts/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};

export const destroyCart = async (id) => {
  console.log(token)
  try {
    const response = await fetch(`${BASE_URL}/carts/deletecart/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    //console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
};