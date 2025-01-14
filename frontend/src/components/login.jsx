import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
const [formData, setFormData] = useState({
  username:"",
  password:""
})


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const [isLoading, setIsLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState(null);
const [error, setError] = useState(null)
const handleSubmit = async (e) => {
  e.preventDefault();
      if(isLoading){
          return
      }

      setIsLoading(true);

      try{
        const response = await axios.post("http://127.0.0.1:8000/token/", formData)
        console.log("Success!", response.data)
        setSuccessMessage("Login Successful!")
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh)
        window.location.href = '/home';
      }
      catch(error){
          console.log("Error during Login!", error.response?.data);
          if(error.response && error.response.data){
              Object.keys(error.response.data).forEach(field => {
                  const errorMessages = error.response.data[field];
                  if(errorMessages && errorMessages.length > 0){
                      setError(errorMessages[0]);
                  }
              })
          }
      }
      finally{
          setIsLoading(false)
      }

};

  return (
    <div className="Auth-form-container">
      {error && <p style={{color:"red"}}>{error}</p>}
        { successMessage && <p style={{color:"green"}}>{successMessage}</p>}

      <form className="Auth-form">
        <div className="Auth-form-content">
          <h2 className="Auth-form-title">Sign In</h2>
          <div className="form-group mt-1">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control mt-1"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" disabled={isLoading} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
      
    </div>
  )
}

// return (
//     <div className="Auth-form-container">
//         <form className="Auth-form" onSubmit={submit}>
//             <div className="Auth-form-content">
//                 <h3 className="Auth-form-title">Sign In</h3>
//                 <div className="form-group mt-1">
//                     <label>Username</label>
//                     <input type="text" className="form-control mt-1" placeholder="Enter username" 
//                         value={username} onChange={e => setUsername(e.target.value)}/>
//                 </div>
//                 <div className="form-group mt-3">
//                     <label>Password</label>
//                     <input type="password" className="form-control mt-1" placeholder="Enter password" 
//                         value={password} onChange={e => setPassword(e.target.value)}/>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//             </div>
//         </form>
//     </div>
// )
// }
