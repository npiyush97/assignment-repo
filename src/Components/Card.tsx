import { useEffect, useState } from "react";
import supabase from "../Database/supabase";

const Card = () => {
  const [posts, setPosts] = useState<any>([]);
  const [noPost, setNoPosts] = useState(false);
  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select();
    if (error) {
      throw Error(error.message);
    }
    console.log(data.length === 0)
    if (data.length === 0) {
      setNoPosts(true);
    }
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({
            text,
            image_url,
            author,
          }: {
            text: string;
            image_url: string;
            author: string;
          }) => {
            return (
              <div className=" rounded mt-2 overflow-hidden border w-full bg-white mx-3 md:mx-0 lg:mx-0">
                <div className="w-full flex justify-between p-3">
                  <div className="flex">
                    <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://robohash.org/${author}.png`}
                        alt="profilepic"
                      />
                    </div>
                    <span className="pt-1 ml-2 font-bold text-sm">
                      {author}
                    </span>
                  </div>
                  <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
                    <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
                  </span>
                </div>

                <div className="px-3 pb-2">
                  <div className="pt-1">
                    <div className="mb-2 text-sm">{text}</div>
                  </div>

                  {image_url ? (
                    <div className="mb-2">
                      <img src={image_url} alt="postimage" />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          }
        )
      ) : noPost ? (
        <div>No Posts</div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
