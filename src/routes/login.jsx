import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "../App.css";


const Login = ({ user }) => {

  const navigate = useNavigate();
  const[error,setError]=useState("");
  const[btn,setBtn]=useState("LOGIN")

  const estiloTexto = {
    color: "white",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();


  const submit = handleSubmit(async (data) => {
    try {
      await axios
        .post("http://localhost:3001/login", {
          user: data.user,
          pass: data.password,
        })
        .then((response) => {
          if (response.status === 200) {
            setBtn("Cargando...")
            // var nameUSer=localStorage.getItem("user")
            user(data.user)
           
            setError("")
            setTimeout(() => {
             navigate("/dashboard")
           }, 2000);
          }
        });
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            setError("Password is wrong");
            break;
            case 400:
              setError("Data is wrong");
              break;
          case 500:
            setError("Error server, try more later");
            break;
        }
      } else {
        console.error("Error sending request:", error.message);
        setError("Error in server, try later");
      }
    }
  });

  return (
    <div className="all-container">
      <div className="container-form">
        <form action="">
          <h2>Welcome, enter yours data</h2>

          {error &&  <div className="errorCon"><span>{error}</span></div>}
         
          
          <TextField
            type="text"
            label="User"
            variant="outlined"
            sx={{ input: { color: estiloTexto } }}
            InputLabelProps={{ style: { color: "white" } }}
            {...register("user", {
              required: {
                value: true,
                message: "User is required",
              },
            })}
          />
          {errors.user && <span className="alert">{errors.user.message}</span>}

          <TextField
            type="password"
            label="Password"
            variant="outlined"
            sx={{ input: { color: estiloTexto } }}
            InputLabelProps={{ style: { color: "white" } }}
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          {errors.password && (
            <span className="alert">{errors.password.message}</span>
          )}

          <Button variant="contained" onClick={submit} className="btnLog" >
            {btn}
          </Button>
     
          
          <p>
            Don't have account?, crate a new account here.{" "}
            <Link to="/SignIn" style={{ color: "#FFF" }}>
              Create a new account
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
