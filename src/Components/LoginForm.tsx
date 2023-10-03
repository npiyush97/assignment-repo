import { useState } from "react";
import supabase from "../Database/supabase";
import { Link, useNavigate } from "react-router-dom";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [useremail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  const [session, setSession] = useState(localStorage.getItem("session"));
  const navigate = useNavigate();
  async function handleSubmit(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: useremail,
      password: userpassword,
    });
    if (error) {
      throw Error(error.message);
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      let s = JSON.stringify(session);
      localStorage.setItem("session", s);
      navigate("/dashboard");
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={useremail}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={userpassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/register"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Loginform;
