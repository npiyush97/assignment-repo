import { useEffect, useState } from "react";
import supabase from "../Database/supabase";

export default function FriendSuggestion({seed,handleSeed}:{seed:any,handleSeed:any}){
  const [suggestions, setsuggestions] = useState<any>([]);
  async function run() {
    let { data: suggestion, error: err } = await supabase
      .from("suggestions")
      .select();
    if (err) {
      throw Error(err.message);
    }
    let { data, error } = await supabase.from("friends").select();
    let friends: any[] = [];
    if (data) {
      for (let i of data) {
        friends.push(i.id);
      }
    }
    if (friends) {
      let filterSuggestion = suggestion?.filter(
        (suggest) => !friends?.includes(suggest.id)
      );
      setsuggestions(filterSuggestion);
    }
  }
  useEffect(() => {
    run();
  }, [seed]);
  async function handleaddFriend(id: number, name: string) {
    const { error } = await supabase.from("friends").insert({ id, name });
    handleSeed()
  }
  return (
    <div className="flex">
      <div
        className={`w-40 flex flex-col h-auto p-3 bg-gray-800 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Suggested friends</h2>
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
              {suggestions.length > 0 ? (
                suggestions.map(
                  ({ id, name }: { id: number; name: string }) => {
                    return (
                      <div className="flex flex-col justify-evenly p-2">
                        <li className="bg-white rounded" key={id}>
                          {name}
                        </li>
                        <button
                          onClick={(e: any) => handleaddFriend(id, name)}
                          className="mt-2 bg-black hover:bg-green-500 text-white rounded"
                        >
                          Add
                        </button>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="flex justify-center items-center h-auto bg-green-300">
                  <span>No Suggestions...</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
