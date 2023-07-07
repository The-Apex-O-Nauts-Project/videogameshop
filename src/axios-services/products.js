const BASE_URL = `http://localhost:3000/api/`


//========GET ALL PRODUCTS=============
export const fetchAllProducts = async() =>{
    try{
        const response = await fetch(`${BASE_URL}/products`, {

            headers:{
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(err){
        console.error(err)
    }
}