import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FriendSuggestion from "./Suggestion";
import UserLayout from "./UserLayout";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../Database/supabase";
import { createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const [session, setSession] = useState<any>();
  const [seed, setSeed] = useState<number>(0);
  function handleSeed() {
    setSeed(Math.random());
  }
  const navigate = useNavigate()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (session) {
    checkusername()
  }
  async function checkusername(){
    const { data, error } = await supabase.auth.getUser();
    if(data.user?.user_metadata.username === undefined){
      navigate('/addusername')
    }
  } 
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
      />
    );
  } else {
    console.log("logged in");
  }
  return (
    <Context.Provider value={session}>
      <Navbar />
      <div className="flex">
        <FriendSuggestion seed={seed} handleSeed={handleSeed} />
        <UserLayout seed={seed}/>
        <Sidebar seed={seed} handleSeed={handleSeed} />
      </div>
    </Context.Provider>
  );
};
export const Context = createContext(null);
export default MainDashboard;
