import { useForm } from "react-hook-form";
import "./Login.css";
import { useUser } from "../../context/UserContex"; 

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const { login } = useUser();

  console.log(URL)
  const { register, handleSubmit } = useForm();

  async function onLogin(data) {
    
    login(data);
  }

  return (
    <div className="login-container">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <form className="login-form" onSubmit={handleSubmit(onLogin)}>
        <h1>Login</h1>
        <label>Correo electrónico</label>
        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="Correo electrónico"
        />

        <label>Contraseña</label>
        <input
          {...register("password", { required: true, maxLength: 20 })}
          type="password"
          placeholder="Contraseña"
        />

        <button type="submit" className="button">
          Ingresar
        </button>
      </form>
    </div>
  );
}
