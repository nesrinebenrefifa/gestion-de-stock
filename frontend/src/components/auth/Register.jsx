import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/register', { name, email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate('/login');
        } else {
          alert("Registered successfully! Please Login to proceed.")
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
    >
   <div className="flex-row" style={{ width: "100%", maxWidth: "2000px" ,marginLeft:"500px"}}>
     <div className="w-50 p-3 d-flex align-items-center justify-content-center">
       <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZVHabplwcda2IOk5flvd7MZwpzzjdJXo6Yp08kW70AhL8VhgVZb72xg2vXM9FADY7Q&usqp=CAU" alt="Login Illustration" className="img-fluid rounded" />
     </div>
     <div className="w-50 p-3" style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
       <h2 className=" text-center">Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                <strong>Nom</strong>
              </label>
              <input 
                
                placeholder="Entrer votre Nom"
                className="form-control" 
                id="exampleInputName" 
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email </strong>
              </label>
              <input 
                type="email" 
                placeholder="Entrer votre Email"
                className="form-control" 
                id="exampleInputEmail1" 
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Mot de passe</strong>
              </label>
              <input 
                type="password" 
                placeholder="Entrer votre mot de passe"
                className="form-control" 
                id="exampleInputPassword1" 
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
          </form>

          <p className='mt-3 text-center'>
           Vous avez déjà un compte
            <Link to='/login' className="btn btn-link">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;
