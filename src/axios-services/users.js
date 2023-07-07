

const BASE_URL = `http://localhost:3000/api/`

//========USER ENDPOINTS===========
//Register
export const register =async (user) =>{
    try {
      const response = await fetch(
        `${BASE_URL}users/register`,{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
            email: user.email,
            isAdmin: user.isAdmin
          })
        }
        )
        const result = await response.json()
        console.log("REGISTER RESULTS", result)

        return result;
    } catch(err) {
      console.error(err)
    }
  }
//Login
export const login = async (user) => {
      
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: user.username,
          password: user.password
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
//get all users
export const getAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
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
  }
     