import React from "react";
import { useNavigate } from "react-router-dom";

const Alert = ({ color }: { color: string }) => {
  const [showAlert, setShowAlert] = React.useState(true);
  const navigate = useNavigate()
  function handleClose(){
    setShowAlert(prev => !prev) 
    navigate('/login')
  }
  return (
    <>
      {showAlert ? (
        <div
          className={
            "mt-2 text-white px-6 py-4 border-0 rounded relative mb-4 bg-" +
            color +
            "-500"
          }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize"></b>Check your email for confirmation mail.</span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            
          >
            <span onClick={handleClose}>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default function ClosingAlert() {
  return (
    <>
      <Alert color="pink" />
    </>
  );
}
