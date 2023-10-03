import { useState } from "react";
import supabase from "../Database/supabase";

const PostWidget = () => {
  const [upload, setupload] = useState(false);
  const [user, setUser] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleimageupload(event: any) {
    try {
      setupload(true);
      if (!event.target.files || event.target.files === 0) {
        throw new Error("You must select an image to upload");
      }
      let { data: currUser } = await supabase.auth.getUser();
      setUser(currUser?.user?.user_metadata.username);
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${currUser?.user?.id}.${Math.random()}.${fileExt}`;
      console.log(file, fileName);
      let { data, error: uploadError } = await supabase.storage
        .from("postimage")
        .upload(`${fileName}`, file);
      console.log(data, data?.path);
      let url = await supabase.storage.from("postimage").getPublicUrl(fileName);
      setImageUrl(url?.data.publicUrl);
      if (uploadError) {
        throw uploadError;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setupload(false);
    }
  }
  console.log(postMessage);
  async function publishPost() {
    const { error } = await supabase.from("posts").insert({
      text: postMessage,
      image_url: imageUrl || undefined,
      author: user,
    });
    console.log(error);
  }
  return (
    <form
      className="flex flex-col justify-items-center content-center"
      onSubmit={publishPost}
    >
      <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600"></div>
        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            id="editor"
            rows={8}
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
        <label
          className="block mt-2 ml-2 cursor-pointer mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          {upload ? "Uploading" : "Upload"} Pic
        </label>
        {imageUrl ? (
          <img
            className="h-20 w-20 rounded-md"
            src={imageUrl}
            alt="postimage"
          />
        ) : null}
        <input
          className="opacity-0"
          id="file_input"
          type="file"
          onChange={handleimageupload}
        />
      </div>
      <button
        type="submit"
        className="items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Publish post
      </button>
    </form>
  );
};
export default PostWidget;
