import { useState } from "react";
import supabase from "../Database/supabase";
import { Navigate, useNavigate } from "react-router-dom";

function AddUsername() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
  async function handleusername(e: any) {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      data: { username },
    });
    // const id = data.user?.id;
    // const { data: d, error: er } = await supabase
    //   .from("user")
    //   .insert({ id, username });
    if (error) {
      throw Error(error.message);
    }
    navigate('/dashboard')
  }

  return (
    <div className="bg-indigo-500 w-full flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={(e) => handleusername(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddUsername;
