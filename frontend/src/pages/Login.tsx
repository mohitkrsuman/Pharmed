import { useState } from "react"
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  return (
    <div className="login">
        <main className="heading">
         <h1>Login</h1>

         <div>
            <label htmlFor="">Gender</label>
            <select name="" value={gender} onChange={(e) => setGender(e.target.value)}>
               <option value="">Select Gender</option>
               <option value="male">Male</option>
               <option value="female">Female</option>
            </select>
         </div>
         <div>
            <label htmlFor="">Date of Birth</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
         </div>
        
         <div>
            <p className="heading">Already Signed in once</p>
            <button>
               <FcGoogle/><span>Sign in with Google</span>
            </button>
         </div>
        </main>
    </div>
  )
}

export default Login