import { useState } from "react";
import supabase from "../Database/supabase";
import ClosingAlert from "./Alert";

const Registerform = () => {
  const [username, setUsername] = useState("");
  const [useremail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  async function handleSubmit(e: any) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: useremail,
      password: userpassword,
    });
    if (!error) {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: username,
        },
      });
      console.log(data)
      console.log(error)  
      setAlert(!alert);
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
              required
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value)}
              value={useremail}
              placeholder="Enter your email"
              required
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
              value={userpassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div>{alert ? <ClosingAlert /> : null}</div>
    </div>
  );
};
export default Registerform;
