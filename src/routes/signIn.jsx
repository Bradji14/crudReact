import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../App.css";

const SignIn = () => {
  const estiloTexto = {
    color: "white", // Cambia 'blue' al color que desees
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm();

  const submit = handleSubmit ((data) => {
    setTimeout(()=>{
      axios
      .post("http://localhost:3001/signin", {
        name: data.name,
        user: data.user,
        email: data.email,
        pass: data.password,
      })
      .then(() => {
        Swal.fire({
          title: "Register success!",
          position: 'top-end',
          icon: "success",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        });
        reset()
        localStorage.setItem("user",data.name)
      });
    },2000)
  });

  return (
    <div className="container-form">
      <form action="">
        <h2>Welcome, register you</h2>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          sx={{ input: { color: estiloTexto } }}
          InputLabelProps={{ style: { color: "white" } }}
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
        />
        {errors.name && <span className="alert">{errors.name.message}</span>}

        <TextField
          type="text"
          label="User"
          variant="outlined"
          sx={{ input: { color: estiloTexto } }}
          InputLabelProps={{ style: { color: "white" } }}
          {...register("user", {
            required: {
              value: true,
              message: "user is required",
            },
          })}
        />
        {errors.user && <span className="alert">{errors.user.message}</span>}

        <TextField
          type="text"
          label="E-mail"
          variant="outlined"
          sx={{ input: { color: estiloTexto } }}
          InputLabelProps={{ style: { color: "white" } }}
          {...register("email", {
            required: {
              value: true,
              message: "email  is required",
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "E-mail is not validate",
            },
          })}
        />
        {errors.email && <span className="alert">{errors.email.message}</span>}

        <TextField
          type="password"
          label="Password"
          variant="outlined"
          sx={{ input: { color: estiloTexto } }}
          InputLabelProps={{ style: { color: "white" } }}
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
            minLength: {
              value: 3,
              message: "Debe ser mayor a 8 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="alert">{errors.password.message}</span>
        )}

        <TextField
          type="password"
          label="Repeat Password"
          variant="outlined"
          sx={{ input: { color: estiloTexto } }}
          InputLabelProps={{ style: { color: "white" } }}
          {...register("repeatP", {
            required: {
              value: true,
              message: "repeat password  is required",
            },
            validate: (data) => {
              if (data === watch("password")) return true;
              else return "Passwords don't match";
            },
          })}
        />
        {errors.repeatP && (
          <span className="alert">{errors.repeatP.message}</span>
        )}

        <Button variant="contained" onClick={submit}>
          Create account
        </Button>
        <p>
          I have a account{" "}
          <Link to="/" style={{ color: "#FFF" }}>
            My account
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};
export default SignIn;
