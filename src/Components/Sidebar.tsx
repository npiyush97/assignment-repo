import { useEffect, useState } from "react";
import supabase from "../Database/supabase";

export default function Sidebar({
  seed,
  handleSeed,
}: {
  seed: any;
  handleSeed: any;
}) {
  const [friends, setFriends] = useState<any>([]);
  async function fetchFriends() {
    const { data, error } = await supabase.from("friends").select();
    setFriends(data);
  }
  async function handleRemove(id:number) {
    const { error } = await supabase.from("friends").delete().eq("id",id);
    if (error) {
      throw Error(error.message);
    }
    handleSeed();
  }
  useEffect(() => {
    fetchFriends();
  }, [seed]);
  return (
    <div className="flex">
      <div
        className={`w-40 flex flex-col h-auto p-3 bg-gray-800 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">friends</h2>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm overflow-auto">
              {friends.length > 0 ? (
                friends.map(({ id, name }: { id: number; name: string }) => {
                  return (
                    <div className="flex flex-col justify-evenly p-2">
                      <li className="bg-white rounded" key={id}>
                        {name}
                      </li>
                      <button onClick={(e:any) => handleRemove(id)} className="mt-2 bg-black hover:bg-rose-500 text-white rounded">
                        Remove
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center h-auto bg-green-300">
                  <span>No Friends</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
