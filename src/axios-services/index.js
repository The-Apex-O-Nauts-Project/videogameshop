const BASE_URL = ``

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:
//========USER ENDPOINTS===========
//Register
export const register =async (user) =>{
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`,{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password
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
    const response = await fetch(`${BASE_URL}/users/login`, {
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


export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
