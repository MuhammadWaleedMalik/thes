import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../../firebase";
import useGoogle from "../hooks/useGoogle";
import useLogin from "../hooks/useLogin";


export default function Login() {
  const { login } = useLogin();
  const { authenticateWithGoogle } = useGoogle();
const navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setError("Both fields are required");
    return;
  }

  try {
    // await login(email, password); // Use login function from AuthContext

    if (email === "admin@thesisai.net" && password === "@Abc123456") {
      localStorage.setItem("Admin", "Done");
      navigate('/admin')
    } else {
      const response = await login(email, password);
      // console.log(response)
      if(response != undefined ){
        // console.log(response.user.credits)
        localStorage.removeItem('credits')
        localStorage.removeItem('token')
        localStorage.setItem('credits', response.user.credits);
        localStorage.setItem("token", response.token);
        alert("Logged in successfully!");
        navigate('/ai-features')
      }
      else{
        setError('Internal Error Occured Try Again Later');}
    }
  } catch (error) {
    setError(error.message);
  }
};


  // Google Sign-In Handler
  const googleLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { displayName, email } = result.user;
       const respose = await authenticateWithGoogle(displayName, email);
      //  console.log(respose)
      alert("Signed in with Google successfully!");
      localStorage.setItem('credits', respose.user.credits);
      localStorage.setItem("token", respose.token);
      navigate('/ai-features')
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className=" p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {/* Google Sign-In Button */}
        <button
          onClick={googleLoginHandler}
          className="w-full flex items-center justify-center px-4 py-2 mt-4 border rounded  text-gray-700 shadow hover:bg-gray-200"
        >
          <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-900 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-900 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Sign-up Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
