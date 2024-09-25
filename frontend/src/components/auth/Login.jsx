import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log("Login Success");
        
          navigate("/home");
        } else {
          alert("Incorrect email or password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div  className=" flex-row"style={{ width: "100%", maxWidth: "1000px" ,marginLeft:"500px"}}>
        <div className="w-50 p-3 d-flex align-items-center justify-content-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZVHabplwcda2IOk5flvd7MZwpzzjdJXo6Yp08kW70AhL8VhgVZb72xg2vXM9FADY7Q&usqp=CAU" alt="Login Illustration" className="img-fluid rounded"  />
        </div>
        <div className="w-50 p-3" style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
          <h2 className="text-center">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input
                type="email"
                id="email"
                placeholder="Entrer votre Email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Mot de passe</strong></label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Entrer votre mot de passe"
                  className="form-control"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} position-absolute top-50 end-0 translate-middle-y`}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter </button>
          </form>
          <p className="mt-3 text-center">
            <span>Vous n'avez pas encore de compte </span>
            <Link to="/register" className="btn btn-link">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
